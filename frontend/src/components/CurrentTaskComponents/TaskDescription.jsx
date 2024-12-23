import React from "react";
import { Editor } from "@toast-ui/react-editor";
import Viewer from "./Viewer";

export default function TaskDescription({
  isEditing,
  editorRef,
  content,
  onEditToggle,
}) {
  return (
    <div className="px-6 mb-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold mb-6">Description</h1>
        <button
          onClick={onEditToggle}
          className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 flex w-full justify-end mb-4"
        >
          {isEditing ? "Save Changes" : "Edit Description"}
        </button>
      </div>
      {isEditing ? (
        <div className="rounded-lg overflow-hidden shadow-md">
          <Editor
            ref={editorRef}
            initialValue={content || "#### This task has no description\n***"}
            previewStyle="vertical"
            height="500px"
            width="300px"
            useCommandShortcut={true}
            initialEditType="markdown"
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg p-4 shadow-md">
          <Viewer
            content={content || "#### This task has no description\n***"}
          />
        </div>
      )}
    </div>
  );
}
