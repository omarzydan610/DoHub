const TasksRepository = require("../dataAccess/tasksDataAccess");
const jwt = require("jsonwebtoken");

class TaskController {
  static async createTask(req, res, next) {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    req.body.userId = userId;
    try {
      const newTask = await TasksRepository.createTask(req.body);
      console.log(newTask);
      res.status(201).json({
        status: "success",
        data: newTask,
      });
    } catch (error) {
      next(error);
    }
  }


  static async getTaskById(req, res, next) {
    try {
      const { taskId } = req.params;
      const task = await TasksRepository.getTaskById(taskId);
      res.status(200).json({
        status: "success",
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateTask(req, res, next) {
    try {
      const { taskId } = req.params;
      const updatedTask = await TasksRepository.updateTask(taskId, req.body);

      res.status(200).json({
        status: "success",
        data: updatedTask,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteTask(req, res, next) {
    try {
      const { taskId } = req.params;
      await TasksRepository.deleteTask(taskId);

      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCompletedTasks(req, res, next) {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    try {
      const tasks = await TasksRepository.getCompletedTasks(userId);

      res.status(200).json({
        status: "success",
        results: tasks.length,
        data: tasks,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUncompletedTasks(req, res, next) {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    try {
      const tasks = await TasksRepository.getUncompletedTasks(userId);

      res.status(200).json({
        status: "success",
        results: tasks.length,
        data: tasks,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTasksByPriority(req, res, next) {
    try {
      const { userId, priorityId } = req.params;
      const tasks = await TasksRepository.getTasksByPriority(
        userId,
        priorityId
      );

      res.status(200).json({
        status: "success",
        results: tasks.length,
        data: tasks,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTasksByTag(req, res, next) {
    try {
      const { userId, tagId } = req.params;
      const tasks = await TasksRepository.getTasksByTag(userId, tagId);

      res.status(200).json({
        status: "success",
        results: tasks.length,
        data: tasks,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TaskController;
