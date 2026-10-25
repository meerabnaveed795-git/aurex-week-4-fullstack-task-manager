
const mongoose = require("mongoose");
const Task = require("../models/Task");

const ALLOWED_FIELDS = ["title", "description", "completed", "priority"];

const pickAllowed = (body) => {
  const data = {};
  const source = body || {};

  ALLOWED_FIELDS.forEach((field) => {
    if (source[field] !== undefined) {
      data[field] = source[field];
    }
  });

  return data;
};

const isValidId = (id) => mongoose.isValidObjectId(id);

// CREATE: POST /api/tasks
const createTask = async (req, res, next) => {
  try {
    const data = pickAllowed(req.body);

    const task = await Task.create({
      ...data,
      user: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// READ ALL: GET /api/tasks
const getTasks = async (req, res, next) => {
  try {
    const filter = { user: req.user._id };

    if (req.query.completed !== undefined) {
      if (!["true", "false"].includes(req.query.completed)) {
        return res.status(400).json({
          message: "completed must be true or false",
        });
      }

      filter.completed = req.query.completed === "true";
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// READ ONE: GET /api/tasks/:id
const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const task = await Task.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// UPDATE: PUT /api/tasks/:id
const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const updates = pickAllowed(req.body);

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "Send at least one field to update",
      });
    }

    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user._id },
      updates,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// DELETE: DELETE /api/tasks/:id
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const task = await Task.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task deleted successfully",
      id: task._id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
