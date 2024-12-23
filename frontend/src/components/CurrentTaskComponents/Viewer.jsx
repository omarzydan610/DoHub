import React, { useEffect, useRef } from "react";
import * as toastui from "@toast-ui/editor"; // Ensure toastui is installed
import "@toast-ui/editor/dist/toastui-editor.css"; // Import the necessary styles

const Viewer = ({ content }) => {
  const viewerRef = useRef();

  useEffect(() => {
    let viewerInstance;

    // Initialize the viewer when the component mounts
    if (viewerRef.current) {
      viewerInstance = toastui.Editor.factory({
        el: viewerRef.current,
        viewer: true,
        initialValue: content || "#### This task has no description\n***",
      });
    }

    // Update the content dynamically when `content` changes
    if (viewerInstance) {
      viewerInstance.setMarkdown(
        content || "#### This task has no description\n***"
      );
    }

    // Cleanup the instance when the component unmounts
    return () => {
      if (viewerInstance) {
        viewerInstance.destroy();
      }
    };
  }, [content]); // Re-run if `content` changes

  return <div ref={viewerRef} className="toastui-viewer" />;
};

export default Viewer;
