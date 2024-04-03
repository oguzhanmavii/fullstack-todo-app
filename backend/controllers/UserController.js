const bcrypt = require('bcryptjs');
const { User } = require('../models'); // User modelini içe aktarın
const UserController = {
  async register(req, res) {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10); // Şifreyi hashle
      const newUser = await User.create({ username, password: hashedPassword });
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Error registering user' });
    }
  },
  async login(req, res) {
    try {
      const { username, password } = req.body;
      console.log('Giriş Bilgileri:', { username, password });
      const user = await User.findOne({ where: { username } });
      console.log('Kullanıcı Bulundu:', user);
      if (!user) {
        console.log('Kullanıcı Bulunamadı');
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('Parola Doğrulama Sonucu:', isPasswordValid);
      if (!isPasswordValid) {
        console.log('Parola Doğrulanamadı');
        return res.status(401).json({ error: 'Unauthorized' });
      }
      console.log('Kullanıcı Giriş Başarılı');
      res.json({ message: 'User logged in successfully' });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Error logging in' });
    }
  }
};
module.exports = UserController;
