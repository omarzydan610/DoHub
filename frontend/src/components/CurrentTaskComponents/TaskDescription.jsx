import React from "react";
import { Editor } from "@toast-ui/react-editor";
import Viewer from "./Viewer";
import "./toastui-custom-theme.css"; // Import custom CSS

export default function TaskDescription({
  isEditing,
  editorRef,
  content,
  onEditToggle,
  isDarkMode,
}) {
  return (
    <div className="px-6 mb-6">
      <div className="flex justify-between items-center">
        <h1
          className={`text-2xl font-semibold mb-6 ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Description
        </h1>
        <button
          onClick={onEditToggle}
          className={`font-medium transition-colors duration-200 flex w-full justify-end mb-4 ${
            isDarkMode
              ? "text-blue-400 hover:text-blue-300"
              : "text-blue-600 hover:text-blue-800"
          }`}
        >
          {isEditing ? "Save Changes" : "Edit Description"}
        </button>
      </div>
      {isEditing ? (
        <div
          className={`rounded-lg overflow-hidden shadow-md ${
            isDarkMode ? "toastui-editor-dark-mode" : ""
          }`}
        >
          <Editor
            ref={editorRef}
            initialValue={content || "#### This task has no description\n***"}
            previewStyle="vertical"
            height="500px"
            useCommandShortcut={true}
            initialEditType="markdown"
            theme={isDarkMode ? "dark" : "light"}
            className={isDarkMode ? "toastui-editor-dark-mode" : ""}
          />
        </div>
      ) : (
        <div
          className={`rounded-lg p-4 shadow-md ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <Viewer
            content={content || "#### This task has no description\n***"}
            isDarkMode={isDarkMode}
          />
        </div>
      )}
    </div>
  );
}
