const TasksRepository = require("../dataAccess/tasksDataAccess");
const jwt = require("jsonwebtoken");

class TaskController {
  static async createTask(req, res, next) {
    const token = req.headers["authorization"];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
      req.body.userId = userId;
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

  static async getCompletedTasks(req, res, next) {
    const token = req.headers["authorization"];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
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
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
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

  static async getSubTasks(req, res, next) {
    console.log("params", req.params);
    const token = req.headers["authorization"];
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      const { parentId } = req.params;
      console.log("parentId", parentId);

      const tasks = await TasksRepository.getSubTasks(parentId);
      res.status(200).json({
        status: "success",
        results: tasks.length,
        data: tasks,
      });
    } catch (error) {
      next(error);
    }
  }

  static async toggleCompleted(req, res, next) {
    const { taskId } = req.params;
    console.log(req.body);

    try {
      const updatedTask = await TasksRepository.toggleCompleted(
        taskId,
        req.body
      );
      console.log(updatedTask);

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

  static async editDescription(req, res, next) {
    const { taskId } = req.params;
    console.log("body", req.body);

    try {
      const editDescription = await TasksRepository.editDescription(
        taskId,
        req.body
      );

      res.status(200).json({
        status: "success",
        data: editDescription,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateTask(req, res, next) {
    const { taskId } = req.params;
    try {
      const updatedTask = await TasksRepository.updateTask(taskId, req.body);
      res.status(200).json({
        status: "success",
        data: updatedTask,
      });
    } catch (error) {
      next(error);
    }
  }

  // static async getTaskById(req, res, next) {
  //   try {
  //     const { taskId } = req.params;
  //     const task = await TasksRepository.getTaskById(taskId);
  //     res.status(200).json({
  //       status: "success",
  //       data: task,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async getTasksByTag(req, res, next) {
  //   try {
  //     const { userId, tagId } = req.params;
  //     const tasks = await TasksRepository.getTasksByTag(userId, tagId);

  //     res.status(200).json({
  //       status: "success",
  //       results: tasks.length,
  //       data: tasks,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

module.exports = TaskController;
