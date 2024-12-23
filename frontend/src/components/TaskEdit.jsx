import React, { useState, useRef } from "react";
import { useAppContext } from "../contexts/AppContext";
import TasksService from "../Service/TasksService";

import TaskHeader from "./HomePageComponents/TaskEditComponents/TaskHeader";
import TaskMetadata from "./HomePageComponents/TaskEditComponents/TaskMetadata";
import TaskDescription from "./HomePageComponents/TaskEditComponents/TaskDescription";
import TaskProgress from "./HomePageComponents/TaskEditComponents/TaskProgress";
import SubtaskList from "./HomePageComponents/TaskEditComponents/SubtaskList";
import DeleteModal from "./HomePageComponents/TaskEditComponents/DeleteModal";
import AddSubtaskModal from "./HomePageComponents/TaskEditComponents/AddSubtaskModal";
import RenameTaskModal from "./HomePageComponents/TaskEditComponents/RenameTaskModal";

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
  const [isRenameTaskModalOpen, setIsRenameTaskModalOpen] = useState(false); // State to track rename modal
  const [newTaskName, setNewTaskName] = useState(""); // State to hold the new task name

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
      className={`bg-white shadow-lg ${selectedTask ? "block" : "hidden"}
      ml:w-2/5 ${
        selectedTask ? "w-screen" : "hidden"
      } bg-slate-50 border-l border-slate-200 h-screen`}
    >
      <TaskHeader
        title={selectedTask?.title}
        onRename={handleRenameTask}
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

      <button
        className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 flex w-full justify-end px-6 mb-4"
        onClick={handleAddSubTask}
      >
        + Add Subtask
      </button>

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

      <RenameTaskModal
        isOpen={isRenameTaskModalOpen}
        newTaskName={newTaskName}
        onNameChange={setNewTaskName}
        onConfirm={confirmRenameTask}
        onCancel={cancelRenameTask}
      />
    </div>
  );
}
