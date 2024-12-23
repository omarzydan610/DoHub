import React, { useState, useRef } from "react";
import { useAppContext } from "../contexts/AppContext";
import TasksService from "../Service/TasksService";

import TaskHeader from "./CurrentTaskComponents/TaskHeader";
import TaskMetadata from "./CurrentTaskComponents/TaskMetadata";
import TaskDescription from "./CurrentTaskComponents/TaskDescription";
import TaskProgress from "./CurrentTaskComponents/TaskProgress";
import SubtaskList from "./CurrentTaskComponents/SubtaskList";
import DeleteModal from "./CurrentTaskComponents/DeleteModal";
import AddSubtaskModal from "./CurrentTaskComponents/AddSubtaskModal";
import EditTaskInfoModal from "./CurrentTaskComponents/EditTaskInfoModal";

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
    setSubtasks,
    getSubTasks,
  } = useAppContext();
  const completedTasks = subtasks.filter((task) => task.completed).length;
  const totalTasks = subtasks.length;
  const completionPercentage = (completedTasks / totalTasks) * 100;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State to track editing mode
  const [newSubtaskName, setNewSubtaskName] = useState(""); // State to hold the new subtask name
  const [isAddSubTaskModalOpen, setIsAddSubTaskModalOpen] = useState(false);
  const [isEditTaskInfoModalOpen, setIsEditTaskInfoModalOpen] = useState(false);

  // Toggle completion of a subtask
  const toggleCompletion = async (id) => {
    const taskToToggle = subtasks.find((task) => task.id === id);

    await TasksService.toggleTask(id, { completed: !taskToToggle.completed });
    setSubtasks(
      subtasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
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
      await TasksService.editDescription(selectedTask.id, {
        description: content,
      });
      if (selectedTask) {
        setSelectedTask({ ...selectedTask, description: content });
      }
    }
    await getCompletedTasks();
    await getUnCompletedTasks();
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
      await getSubTasks(selectedTask.id);
    }
    setIsAddSubTaskModalOpen(false);
  };

  const cancelAddSubTask = () => {
    setIsAddSubTaskModalOpen(false);
    setNewSubtaskName("");
  };
  const handleEditTaskInfo = () => {
    setIsEditTaskInfoModalOpen(true);
  };

  const confirmEditTaskInfo = async () => {
    await TasksService.updateTask(selectedTask.id, {
      title: selectedTask.title,
      due_date: selectedTask.due_date,
      priority: selectedTask.priority,
    });
    await getCompletedTasks();
    await getUnCompletedTasks();
    setIsEditTaskInfoModalOpen(false);
  };

  const cancelEditTaskInfo = () => {
    setIsEditTaskInfoModalOpen(false);
  };

  return (
    <div
      className={`bg-white shadow-lg ${selectedTask ? "block" : "hidden"}
      ml:w-2/5 ${
        selectedTask ? "w-screen" : "hidden"
      } bg-slate-50 border-l border-slate-200 h-screen`}
    >
      <TaskHeader
        title={selectedTask?.title}
        onEdit={handleEditTaskInfo}
        onDelete={handleDeleteTask}
      />

      <TaskMetadata
        deadline={selectedTask?.due_date}
        priority={selectedTask?.priority}
      />

      <TaskDescription
        isEditing={isEditing}
        editorRef={editorRef}
        content={selectedTask?.description}
        onEditToggle={handleEditToggle}
      />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold mb-6 px-6">Subtasks</h1>
        <button
          className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 flex w-full justify-end px-6 mb-4"
          onClick={handleAddSubTask}
        >
          + Add Subtask
        </button>
      </div>

      {subtasks && subtasks.length > 0 && (
        <TaskProgress completionPercentage={completionPercentage} />
      )}

      <SubtaskList subtasks={subtasks} onToggleCompletion={toggleCompletion} />

      {/* Modals */}
      <DeleteModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <AddSubtaskModal
        isOpen={isAddSubTaskModalOpen}
        newSubtaskName={newSubtaskName}
        onNameChange={setNewSubtaskName}
        onConfirm={confirmAddSubTask}
        onCancel={cancelAddSubTask}
      />

      <EditTaskInfoModal
        isOpen={isEditTaskInfoModalOpen}
        task={selectedTask}
        onTaskChange={setSelectedTask}
        onConfirm={confirmEditTaskInfo}
        onCancel={cancelEditTaskInfo}
      />
    </div>
  );
}
