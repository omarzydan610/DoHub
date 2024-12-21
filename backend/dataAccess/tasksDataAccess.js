const pool = require("../config/databaseManager");
const { AppError } = require("../middlewares/errorHandler");

class TasksRepository {
  static async createTask(taskData) {
    const { title, description, userId, dueDate, parentId, priorityId, tagId } =
      taskData;
    console.log(taskData);
    try {
      const [result] = await pool.execute(
        `INSERT INTO tasks 
    (title, description, user_id, due_date, parent_id, priority_id, tag_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          title ?? null,
          description ?? null,
          userId ?? null,
          dueDate ?? null,
          parentId ?? null,
          priorityId ?? null,
          tagId ?? null,
        ]
      );

      const [newTask] = await pool.execute("SELECT * FROM tasks WHERE id = ?", [
        result.insertId,
      ]);

      return newTask[0];
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  static async getAllTasks(userId) {
    try {
      const [tasks] = await pool.execute(
        "SELECT * FROM tasks WHERE user_id = ?",
        [userId]
      );

      return tasks;
    } catch (error) {
      throw new AppError(error.message, 404);
    }
  }

  static async getTaskById(taskId) {
    try {
      const [tasks] = await pool.execute("SELECT * FROM tasks WHERE id = ?", [
        taskId,
      ]);

      if (tasks.length === 0) {
        throw new AppError("No task found with that ID", 404);
      }

      return tasks[0];
    } catch (error) {
      throw error instanceof AppError
        ? error
        : new AppError(error.message, 404);
    }
  }

  static async updateTask(taskId, taskData) {
    const existingTask = await TasksRepository.getTaskById(taskId);
    taskData = { ...existingTask, ...taskData };
    const {
      title = null,
      description = null,
      completed = null,
      dueDate = null,
      priorityId = null,
      tagId = null,
    } = taskData;

    try {
      console.log(taskData);
      const [result] = await pool.execute(
        `UPDATE tasks 
        SET title = ?, description = ?, completed = ?, 
        due_date = ?, priority_id = ?, tag_id = ?
        WHERE id = ?`,
        [title, description, completed, dueDate, priorityId, tagId, taskId]
      );

      if (result.affectedRows === 0) {
        throw new AppError("No task found with that ID", 404);
      }

      const [updatedTask] = await pool.execute(
        "SELECT * FROM tasks WHERE id = ?",
        [taskId]
      );

      return updatedTask[0];
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  static async toggleCompleted(taskId, taskData) {
    const { completed } = taskData;
    try {
      console.log(taskData);
      const [result] = await pool.execute(
        `UPDATE tasks 
        SET completed = ?
        WHERE id = ?`,
        [completed, taskId]
      );

      if (result.affectedRows === 0) {
        throw new AppError("No task found with that ID", 404);
      }

      const [updatedTask] = await pool.execute(
        "SELECT * FROM tasks WHERE id = ?",
        [taskId]
      );

      return updatedTask[0];
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  static async deleteTask(taskId) {
    try {
      const [result] = await pool.execute("DELETE FROM tasks WHERE id = ?", [
        taskId,
      ]);

      if (result.affectedRows === 0) {
        throw new AppError("No task found with that ID", 404);
      }

      return null;
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  static async getCompletedTasks(userId) {
    try {
      const [tasks] = await pool.execute(
        "SELECT * FROM tasks WHERE user_id = ? AND completed = TRUE ORDER BY due_date ASC",
        [userId]
      );

      return tasks;
    } catch (error) {
      throw new AppError(error.message, 404);
    }
  }

  static async getUncompletedTasks(userId) {
    try {
      const [tasks] = await pool.execute(
        "SELECT * FROM tasks WHERE user_id = ? AND completed = FALSE ORDER BY due_date ASC",
        [userId]
      );

      return tasks;
    } catch (error) {
      throw new AppError(error.message, 404);
    }
  }

  static async getTasksByPriority(userId, priorityId) {
    try {
      const [tasks] = await pool.execute(
        "SELECT * FROM tasks WHERE user_id = ? AND priority_id = ?",
        [userId, priorityId]
      );

      return tasks;
    } catch (error) {
      throw new AppError(error.message, 404);
    }
  }

  static async getTasksByTag(userId, tagId) {
    try {
      const [tasks] = await pool.execute(
        "SELECT * FROM tasks WHERE user_id = ? AND tag_id = ?",
        [userId, tagId]
      );

      return tasks;
    } catch (error) {
      throw new AppError(error.message, 404);
    }
  }
}

module.exports = TasksRepository;
