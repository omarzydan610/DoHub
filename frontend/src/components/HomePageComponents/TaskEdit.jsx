import React, { useState, useRef, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAppContext } from "../../contexts/AppContext";
import TasksService from "../../Service/TasksService";
import { Editor, Viewer } from "@toast-ui/react-editor";
import "react-quill/dist/quill.snow.css";
import "@toast-ui/editor/dist/toastui-editor.css";

export default function TaskEdit() {
  const editorRef = useRef();

  // Calculate completion percentage based on subtasks
  const {
    selectedTask,
    setSelectedTask,
    getUnCompletedTasks,
    getCompletedTasks,
    subtasks,
  } = useAppContext();
  const completedTasks = subtasks.filter((task) => task.completed).length;
  const totalTasks = subtasks.length;
  const completionPercentage = (completedTasks / totalTasks) * 100;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State to track editing mode
  const [newSubtaskName, setNewSubtaskName] = useState(""); // State to hold the new subtask name
  const [isAddSubTaskModalOpen, setIsAddSubTaskModalOpen] = useState(false);
  const [isRenameTaskModalOpen, setIsRenameTaskModalOpen] = useState(false); // State to track rename modal
  const [newTaskName, setNewTaskName] = useState(""); // State to hold the new task name

  // Toggle completion of a subtask
  const toggleCompletion = (id) => {
    // setSubtasks(
    //   subtasks.map((task) =>
    //     task.id === id ? { ...task, completed: !task.completed } : task
    //   )
    // );
  };

  const handleDeleteTask = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    console.log("Delete Task");
    await TasksService.deleteTask(selectedTask.id);
    setSelectedTask(null);
    getUnCompletedTasks();
    getCompletedTasks();
    setIsModalOpen(false);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  const handleEditToggle = async () => {
    if (isEditing) {
      const content = editorRef.current.getInstance().getMarkdown();
      if (selectedTask) {
        setSelectedTask({ ...selectedTask, description: content });
      }
    }
    // if (isEditing) {
    //   await TasksService.update(selectedTask.id);
    // }
    setIsEditing(!isEditing);
    console.log(selectedTask.description);
  };
  const handleAddSubTask = () => {
    setIsAddSubTaskModalOpen(true);
  };

  const confirmAddSubTask = async () => {
    if (newSubtaskName) {
      const newSubtask = {
        title: newSubtaskName,
        parentId: selectedTask.id,
      };
      await TasksService.addSubTask(newSubtask);
    }
    setIsAddSubTaskModalOpen(false);
  };

  const cancelAddSubTask = () => {
    setIsAddSubTaskModalOpen(false);
    setNewSubtaskName("");
  };
  const handleRenameTask = () => {
    setNewTaskName(selectedTask.title);
    setIsRenameTaskModalOpen(true);
  };

  const confirmRenameTask = async () => {
    if (newTaskName) {
      setSelectedTask({ ...selectedTask, title: newTaskName });
      // await TasksService.update(selectedTask.id, { title: newTaskName });
    }
    setIsRenameTaskModalOpen(false);
  };

  const cancelRenameTask = () => {
    setIsRenameTaskModalOpen(false);
    setNewTaskName("");
  };

  return (
    <div
      className={`bg-white rounded-none ${selectedTask ? "block" : "hidden"}
      ml:w-2/5 ${
        selectedTask ? "w-screen" : "hidden"
      } bg-gray-50 border-l border-gray-300 h-screen`}
    >
      <div className="flex justify-between items-center p-3 bg-blue-500 w-full mb-4">
        <h2 className="text-xl font-bold text-white">
          {selectedTask ? selectedTask.title : "Task"}
        </h2>
        <div className="flex space-x-3">
          <button
            className="text-white hover:text-blue-200"
            onClick={handleRenameTask}
          >
            <FaEdit />
          </button>
          <button
            className="text-white hover:text-red-200"
            onClick={handleDeleteTask}
          >
            <FaTrash />
          </button>
        </div>
      </div>
      <button
        onClick={handleEditToggle}
        className="text-blue-600 hover:underline flex w-full justify-end pr-4 mb-2"
      >
        {isEditing ? "Save" : "Edit Description"}
      </button>
      {/* Conditional rendering based on editing state */}
      {isEditing && (
        <div className="m-2">
          <Editor
            ref={editorRef}
            initialValue={
              selectedTask && selectedTask.description
                ? selectedTask.description
                : "No Description"
            }
            previewStyle="vertical"
            height="500px"
            width="300px"
            useCommandShortcut={true}
            initialEditType="markdown"
            readOnly={false} // Allow editing when in editing mode
          />
        </div>
      )}
      {!isEditing && (
        <div className="m-2">
          <Viewer
            ref={editorRef}
            initialValue={
              selectedTask && selectedTask.description
                ? selectedTask.description
                : "No Description"
            }
            previewStyle="vertical"
            height="500px"
            width="300px"
            useCommandShortcut={true}
            initialEditType="markdown"
            readOnly={false} // Allow editing when in editing mode
          />
        </div>
      )}

      {/* Add Subtask Button */}
      <button
        className="text-blue-600 hover:underline flex w-full justify-end pr-4 mb-2"
        onClick={handleAddSubTask}
      >
        + Add SubTask
      </button>

      {/* Progress Bar */}
      {subtasks && subtasks.length > 0 && (
        <>
          <div className="w-90 mx-2 bg-gray-200 rounded-full h-3 mb-2">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <p className="text-right mx-2 text-sm text-gray-600 mb-4">
            {completionPercentage.toFixed(0)}% Complete
          </p>
        </>
      )}

      {/* Subtasks */}
      <div className="mt-4 mx-2 space-y-2">
        {subtasks.map((task) =>
          task ? (
            <div
              key={task.id}
              className="flex items-center justify-between bg-blue-100 p-2 rounded-md"
            >
              <span>{task.title}</span>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompletion(task.id)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>
          ) : null
        )}
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg h-1/6 flex flex-col justify-center items-center">
            <h3 className="text-lg mb-4">
              Are you sure you want to delete this task?
            </h3>
            <div className="flex justify-around w-full">
              <button
                onClick={cancelDelete}
                className="text-white bg-gray-400 hover:bg-gray-500 rounded px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="text-white bg-red-500 hover:bg-red-600 rounded px-4 py-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for adding a new subtask */}
      {isAddSubTaskModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg flex flex-col justify-center items-center">
            <h3 className="text-lg mb-4">Enter the name of the new subtask:</h3>
            <input
              type="text"
              value={newSubtaskName}
              onChange={(e) => setNewSubtaskName(e.target.value)}
              className="border rounded p-2 mb-4"
            />
            <div className="flex justify-around w-full">
              <button
                onClick={cancelAddSubTask}
                className="text-white bg-gray-400 hover:bg-gray-500 rounded px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmAddSubTask}
                className="text-white bg-blue-500 hover:bg-blue-600 rounded px-4 py-2"
              >
                Add Subtask
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for renaming the task */}
      {isRenameTaskModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg flex flex-col justify-center items-center">
            <h3 className="text-lg mb-4">Enter the new name for the task:</h3>
            <input
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              className="border rounded p-2 mb-4"
            />
            <div className="flex justify-around w-full">
              <button
                onClick={cancelRenameTask}
                className="text-white bg-gray-400 hover:bg-gray-500 rounded px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmRenameTask}
                className="text-white bg-blue-500 hover:bg-blue-600 rounded px-4 py-2"
              >
                Rename Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
