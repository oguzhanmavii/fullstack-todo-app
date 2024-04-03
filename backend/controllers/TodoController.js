const { Todo } = require('../models');
const TodoController = {
  async getAll(req, res) {
    try {
      const todos = await Todo.findAll();
      res.json(todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
      res.status(500).json({ error: 'Error fetching todos' });
    }
  },
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const todo = await Todo.findByPk(id);
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(todo);
    } catch (error) {
      console.error('Error fetching todo:', error);
      res.status(500).json({ error: 'Error fetching todo' });
    }
  },
  async create(req, res) {
    try {
      const { title } = req.body;
      const newTodo = await Todo.create({ title });
      res.status(201).json(newTodo);
    } catch (error) {
      console.error('Error adding todo:', error);
      res.status(500).json({ error: 'Error adding todo' });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const todo = await Todo.findByPk(id);
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      todo.title = title;
      await todo.save();
      res.json(todo);
    } catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).json({ error: 'Error updating todo' });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const todo = await Todo.findByPk(id);
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      await todo.destroy();
      res.sendStatus(204);
    } catch (error) {
      console.error('Error deleting todo:', error);
      res.status(500).json({ error: 'Error deleting todo' });
    }
  },
};
module.exports = TodoController;

