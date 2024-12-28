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
import TagsSection from "./CurrentTaskComponents/TagsSection";
import CollaboratorSection from "./CurrentTaskComponents/CollaboratorSection";

import "react-quill/dist/quill.snow.css";
import "@toast-ui/editor/dist/toastui-editor.css";

export default function CurrentTask({ isDarkMode }) {
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
    collaborators,
    setCollaborators,
  } = useAppContext();
  const completedTasks = subtasks.filter((task) => task.completed).length;
  const totalTasks = subtasks.length;
  const completionPercentage = (completedTasks / totalTasks) * 100;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State to track editing mode
  const [newSubtaskName, setNewSubtaskName] = useState(""); // State to hold the new subtask name
  const [isAddSubTaskModalOpen, setIsAddSubTaskModalOpen] = useState(false);
  const [isEditTaskInfoModalOpen, setIsEditTaskInfoModalOpen] = useState(false);
  const [showCollabDropdown, setShowCollabDropdown] = useState(false);
  const [newCollabEmail, setNewCollabEmail] = useState("");
  const [conterbuterError, setConterbuterError] = useState("");

  // Toggle completion of a subtask
  const toggleCompletion = async (id) => {
    const taskToToggle = subtasks.find((task) => task.id === id);

    await TasksService.toggleSubTask(id, {
      completed: !taskToToggle.completed,
    });
    setSubtasks(
      subtasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = async (id) => {
    if (typeof id !== "number") {
      console.log("Delete Task");
      await TasksService.deleteTask(selectedTask.id);
      setSelectedTask(null);
      getUnCompletedTasks();
      getCompletedTasks();
      setIsModalOpen(false);
    } else {
      await TasksService.deleteTask(id);
      await getSubTasks(selectedTask.collaborative_id);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  const handleEditToggle = async () => {
    if (isEditing) {
      const content = editorRef.current.getInstance().getMarkdown();
      await TasksService.editDescription(selectedTask.collaborative_id, {
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
        parentId: selectedTask.collaborative_id,
      };
      await TasksService.addSubTask(newSubtask);
      await getSubTasks(selectedTask.collaborative_id);
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
    await TasksService.updateTask(selectedTask.collaborative_id, {
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

  const handleAddCollaborator = async () => {
    if (newCollabEmail.trim() === "") return;
    console.log(newCollabEmail);
    try {
      await TasksService.addCollaborator(selectedTask.id, newCollabEmail);
      setCollaborators([...collaborators, newCollabEmail]);
      setNewCollabEmail("");
      setShowCollabDropdown(false);
    } catch (err) {
      console.log(err.data.message);
      setConterbuterError(err.data.message);
    }
  };

  return (
    <div
      className={`overflow-y-scroll ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      } ${selectedTask ? "block" : "hidden"}
      ml:w-2/5 ${selectedTask ? "w-screen" : "hidden"} border-l ${
        isDarkMode ? "border-gray-700" : "border-gray-200"
      } h-screen`}
    >
      <TaskHeader
        title={selectedTask?.title}
        onEdit={handleEditTaskInfo}
        onDelete={handleDeleteTask}
        onAddCollaborator={handleAddCollaborator}
        isDarkMode={isDarkMode}
        handleAddCollaborator={handleAddCollaborator}
        newCollabEmail={newCollabEmail}
        setNewCollabEmail={setNewCollabEmail}
        showCollabDropdown={showCollabDropdown}
        setShowCollabDropdown={setShowCollabDropdown}
        conterbuterError={conterbuterError}
        setConterbuterError={setConterbuterError}
      />

      <TaskMetadata
        deadline={selectedTask?.due_date}
        priority={selectedTask?.priority}
        isDarkMode={isDarkMode}
      />

      <TaskDescription
        isEditing={isEditing}
        editorRef={editorRef}
        content={selectedTask?.description}
        onEditToggle={handleEditToggle}
        isDarkMode={isDarkMode}
      />
      <div className="flex justify-between items-center">
        <h1
          className={`text-2xl font-semibold mb-6 px-6 ${
            isDarkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          Subtasks
        </h1>
        <button
          className={`font-medium transition-colors duration-200 flex w-full justify-end px-6 mb-4 ${
            isDarkMode
              ? "text-blue-400 hover:text-blue-300"
              : "text-blue-500 hover:text-blue-600"
          }`}
          onClick={handleAddSubTask}
        >
          + Add Subtask
        </button>
      </div>

      {subtasks && subtasks.length > 0 && (
        <TaskProgress
          completionPercentage={completionPercentage}
          isDarkMode={isDarkMode}
        />
      )}

      <SubtaskList
        subtasks={subtasks}
        onToggleCompletion={toggleCompletion}
        onDeleteSubtask={confirmDelete}
        isDarkMode={isDarkMode}
      />
      <CollaboratorSection
        collaborators={collaborators}
        isDarkMode={isDarkMode}
      />

      <TagsSection isDarkMode={isDarkMode} />

      {/* Modals */}
      <DeleteModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        isDarkMode={isDarkMode}
      />

      <AddSubtaskModal
        isOpen={isAddSubTaskModalOpen}
        newSubtaskName={newSubtaskName}
        onNameChange={setNewSubtaskName}
        onConfirm={confirmAddSubTask}
        onCancel={cancelAddSubTask}
        isDarkMode={isDarkMode}
      />

      <EditTaskInfoModal
        isOpen={isEditTaskInfoModalOpen}
        task={selectedTask}
        onTaskChange={setSelectedTask}
        onConfirm={confirmEditTaskInfo}
        onCancel={cancelEditTaskInfo}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
