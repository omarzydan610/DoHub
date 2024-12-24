import React, { useEffect, useRef } from "react";
import * as toastui from "@toast-ui/editor"; // Ensure toastui is installed
import "@toast-ui/editor/dist/toastui-editor.css"; // Default Toast UI styles
import "./toastui-custom-theme.css"; // Import your custom theme

const Viewer = ({ content, isDarkMode }) => {
  const viewerRef = useRef();

  useEffect(() => {
    let viewerInstance;

    if (viewerRef.current) {
      viewerInstance = toastui.Editor.factory({
        el: viewerRef.current,
        viewer: true,
        initialValue: content || "#### This task has no description\n***",
      });
    }

    if (viewerInstance) {
      viewerInstance.setMarkdown(
        content || "#### This task has no description\n***"
      );
    }

    return () => {
      if (viewerInstance) {
        viewerInstance.destroy();
      }
    };
  }, [content]);

  return (
    <div
      ref={viewerRef}
      className={`toastui-viewer ${
        isDarkMode ? "toastui-editor-dark-mode" : ""
      }`}
    />
  );
};

export default Viewer;
