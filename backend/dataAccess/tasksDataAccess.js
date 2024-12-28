const pool = require("../config/databaseManager");
const { AppError } = require("../middlewares/errorHandler");
const { sendEvent } = require("../services/sseService");

class TasksRepository {
  static async createTask(taskData) {
    sendEvent("task", taskData);
    const {
      title,
      description,
      userId,
      dueDate,
      completed,
      parentId,
      priority,
      CollaborativeId,
    } = taskData;
    console.log(taskData);
    try {
      await pool.execute(
        `INSERT INTO tasks 
      (title, description,completed, user_id, due_date, parent_id, priority,collaborative_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          title ?? null,
          description ?? null,
          completed ?? false,
          userId ?? null,
          dueDate ?? null,
          parentId ?? null,
          priority ?? 0,
          CollaborativeId ?? new Date().getTime(),
        ]
      );

      sendEvent("task", taskData);
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  static async getAllTasks(userId) {
    try {
      const [tasks] = await pool.execute(
        "SELECT * FROM tasks WHERE user_id = ? AND parent_id IS NULL ORDER BY due_date ASC",
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

  static async editDescription(collaborative_id, newDescription) {
    const { description = null } = newDescription;
    console.log("new", description);

    try {
      const [result] = await pool.execute(
        `UPDATE tasks 
        SET  description = ?
        WHERE collaborative_id = ?`,
        [description, collaborative_id]
      );

      if (result.affectedRows === 0) {
        throw new AppError("No task found with that ID", 404);
      }

      sendEvent("task", newDescription);
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  static async updateTask(collaborative_id, taskData) {
    console.log("data", taskData);

    const { title = null, due_date = null, priority = null } = taskData;

    try {
      const [result] = await pool.execute(
        `UPDATE tasks 
        SET title = ?, due_date = ?, priority = ?
        WHERE collaborative_id = ?`,
        [title, due_date, priority, collaborative_id]
      );

      if (result.affectedRows === 0) {
        throw new AppError("No task found with that ID", 404);
      }
      sendEvent("task", taskData);
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  static async toggleCompleted(collaborative_id, taskData) {
    const { completed } = taskData;
    try {
      console.log(taskData);
      const [result] = await pool.execute(
        `UPDATE tasks 
        SET completed = ?
        WHERE collaborative_id = ?`,
        [completed, collaborative_id]
      );

      if (result.affectedRows === 0) {
        throw new AppError("No task found with that ID", 404);
      }
      sendEvent("task", taskData);
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  static async toggleSubtaskCompleted(taskId, taskData) {
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
      sendEvent("task", taskData);
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  static async deleteTask(taskId) {
    try {
      let [result] = await pool.execute(
        "DELETE FROM tasks WHERE parent_id = ? ",
        [taskId]
      );
      [result] = await pool.execute(
        "DELETE FROM task_tags WHERE task_id = ? ",
        [taskId]
      );
      [result] = await pool.execute("DELETE FROM tasks WHERE id = ? ", [
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
        "SELECT * FROM tasks WHERE user_id = ? AND completed = TRUE AND parent_id IS NULL ORDER BY due_date ASC",
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
        "SELECT * FROM tasks WHERE user_id = ? AND completed = FALSE AND parent_id IS NULL ORDER BY due_date ASC",
        [userId]
      );
      return tasks;
    } catch (error) {
      throw new AppError(error.message, 404);
    }
  }

  static async getSubTasks(parentId) {
    try {
      const [tasks] = await pool.execute(
        "SELECT * FROM tasks WHERE parent_id =?",
        [parentId]
      );
      return tasks;
    } catch (error) {
      throw new AppError(error.message, 404);
    }
  }

  static async createTag(tagName, userId) {
    try {
      const [result] = await pool.execute(
        "INSERT INTO tags (name, user_id) VALUES (?, ?)",
        [tagName, userId]
      );
      return result;
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  static async deleteTag(tagId) {
    try {
      let [result] = await pool.execute(
        "DELETE FROM task_tags WHERE tag_id = ? ",
        [tagId]
      );
      [result] = await pool.execute("DELETE FROM tags WHERE id = ?", [tagId]);
      return result;
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  static async getUserTags(userId) {
    try {
      const [result] = await pool.execute(
        "SELECT * FROM tags WHERE user_id = ?",
        [userId]
      );
      return result;
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  static async getTagsByTaskId(taskId) {
    try {
      const [tagsResult] = await pool.execute(
        "SELECT tag_id FROM task_tags WHERE task_id = ?",
        [taskId]
      );

      if (tagsResult.length === 0) {
        return [];
      }

      const tagIds = tagsResult.map((row) => row.tag_id);
      const [tags] = await pool.execute(
        `SELECT * FROM tags WHERE id IN (${tagIds.map(() => "?").join(",")})`,
        tagIds
      );
      return tags;
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  static async getTasksByTagId(tagId) {
    try {
      const [tasksResult] = await pool.execute(
        "SELECT task_id FROM task_tags WHERE tag_id = ?",
        [tagId]
      );

      if (tasksResult.length === 0) {
        return [];
      }

      const taskIds = tasksResult.map((row) => row.task_id);
      const [tasks] = await pool.execute(
        `SELECT * FROM tasks WHERE id IN (${taskIds.map(() => "?").join(",")})`,
        taskIds
      );
      return tasks;
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  static async addTagToTask(taskId, tagId) {
    try {
      const [result] = await pool.execute(
        "INSERT INTO task_tags (task_id, tag_id) VALUES (?, ?)",
        [taskId, tagId]
      );
      return result;
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  static async removeTagFromTask(taskId, tagId) {
    try {
      const [result] = await pool.execute(
        "DELETE FROM task_tags WHERE task_id = ? AND tag_id = ?",
        [taskId, tagId]
      );
      sendEvent("task", { taskId, tagId });
      return result;
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  static async addCollaborate(taskId, CollaborateEmail) {
    const [user] = await pool.execute("SELECT * FROM users WHERE email = ?", [
      CollaborateEmail,
    ]);
    console.log("user", user);
    if (user.length === 0) {
      throw new AppError("user not found", 404);
    }
    let userid = user[0].id;
    console.log(userid);
    let task = await this.getTaskById(taskId);
    let newtask = {
      title: task.title,
      description: task.description,
      completed: task.completed,
      userId: userid,
      dueDate: task.due_date,
      priority: task.priority,
      CollaborativeId: task.collaborative_id,
    };
    console.log("task", task.user_id);
    task.id = null;
    task.user_id = 2;
    await this.createTask(newtask);
  }
  static async getCollaborators(taskId, userId) {
    const [task] = await pool.execute("SELECT * FROM tasks WHERE id = ?", [
      taskId,
    ]);
    const collaborative_id = task[0].collaborative_id;
    console.log(collaborative_id, " ", userId);
    const [collaborators] = await pool.execute(
      "SELECT * FROM tasks WHERE collaborative_id = ? AND NOT user_id = ?",
      [collaborative_id, userId]
    );
    console.log(collaborators);
    const userIds = collaborators.map((collaborator) => collaborator.user_id);

    console.log(userIds);
    const [users] = await pool.execute(
      `SELECT * FROM users WHERE id IN (${userIds.map(() => "?").join(",")})`,
      userIds
    );

    const emails = users.map((users) => users.email);

    return emails;
  }
}

module.exports = TasksRepository;
