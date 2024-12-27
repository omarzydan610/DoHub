const pool = require("../config/databaseManager");
const { AppError } = require("../middlewares/errorHandler");
const { sendEvent } = require("../services/sseService");

class TasksRepository {
    static async createTask(taskData) {
        sendEvent("task", taskData);
        const { title, description, userId, dueDate, parentId, priority } =
            taskData;
        console.log(taskData);
        try {
            const [result] = await pool.execute(
                `INSERT INTO tasks 
    (title, description, user_id, due_date, parent_id, priority)
    VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    title ?? null,
                    description ?? null,
                    userId ?? null,
                    dueDate ?? null,
                    parentId ?? null,
                    priority ?? 0,
                ]
            );

            const [newTask] = await pool.execute(
                "SELECT * FROM tasks WHERE id = ?",
                [result.insertId]
            );
            sendEvent("task", taskData);
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
            const [tasks] = await pool.execute(
                "SELECT * FROM tasks WHERE id = ?",
                [taskId]
            );

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

    static async editDescription(taskId, newDescription) {
        const { description = null } = newDescription;
        console.log("new", description);

        try {
            const [result] = await pool.execute(
                `UPDATE tasks 
        SET  description = ?
        WHERE id = ?`,
                [description, taskId]
            );

            if (result.affectedRows === 0) {
                throw new AppError("No task found with that ID", 404);
            }

            const [updatedTask] = await pool.execute(
                "SELECT * FROM tasks WHERE id = ?",
                [taskId]
            );
            sendEvent("task", newDescription);
            return updatedTask[0];
        } catch (error) {
            throw new AppError(error.message, 400);
        }
    }

    static async updateTask(taskId, taskData) {
        console.log("data", taskData);
        const existingTask = await TasksRepository.getTaskById(taskId);
        taskData = { ...existingTask, ...taskData };
        const { title = null, due_date = null, priority = null } = taskData;

        try {
            console.log(taskData);
            const [result] = await pool.execute(
                `UPDATE tasks 
        SET title = ?, due_date = ?, priority = ?
        WHERE id = ?`,
                [title, due_date, priority, taskId]
            );

            if (result.affectedRows === 0) {
                throw new AppError("No task found with that ID", 404);
            }
            sendEvent("task", taskData);

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
            sendEvent("task", taskData);
            return updatedTask[0];
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
            [result] = await pool.execute("DELETE FROM tags WHERE id = ?", [
                tagId,
            ]);
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
                `SELECT * FROM tags WHERE id IN (${tagIds
                    .map(() => "?")
                    .join(",")})`,
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
                `SELECT * FROM tasks WHERE id IN (${taskIds
                    .map(() => "?")
                    .join(",")})`,
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
}

module.exports = TasksRepository;
