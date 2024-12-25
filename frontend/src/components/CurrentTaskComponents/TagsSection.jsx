import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../contexts/AppContext";
import TagsService from "../../Service/TagsService";

export default function TagsSection({ isDarkMode }) {
  const { selectedTaskTags, selectedTask, userTags, getUserTags, getTaskTags } =
    useAppContext();

  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newTagName, setNewTagName] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);
  const [showTagList, setShowTagList] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (selectedTask?.id) {
      loadTags();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTask]);

  const loadTags = async () => {
    try {
      await getTaskTags(selectedTask.id);
      await getUserTags();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemoveTag = async (tagId) => {
    try {
      await TagsService.removeTagFromTask(selectedTask.id, tagId);
      await getTaskTags(selectedTask.id);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreateNewTag = async () => {
    try {
      if (newTagName.trim()) {
        // Check for duplicate tag names (case insensitive)
        const isDuplicate = userTags.some(
          (tag) => tag.name.toLowerCase() === newTagName.trim().toLowerCase()
        );

        if (isDuplicate) {
          setError("A tag with this name already exists");
          return;
        }

        await TagsService.addTag(newTagName);
        await getUserTags();
        setNewTagName("");
        setShowTagInput(false);
        setError(null); // Clear error on success
      }
    } catch (error) {
      setError("Error creating tag: " + error.message);
    }
  };

  const handleAddExistingTag = async (tagId) => {
    try {
      await TagsService.addTagToTask(selectedTask.id, tagId);
      await getTaskTags(selectedTask.id);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleShowTagList = () => {
    setShowTagList(!showTagList);
    // Wait for state update and DOM render
    setTimeout(() => {
      containerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 10);
  };

  const filteredTags = userTags.filter(
    (tag) =>
      tag.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedTaskTags?.find((t) => t.id === tag.id)
  );
  const handleShowTagInput = () => {
    setShowTagInput(!showTagInput);
    setTimeout(() => {
      containerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 10);
  };

  return (
    <div ref={containerRef}>
      <h1
        className={` pl-8 mt-6 text-2xl font-semibold mb-4 ${
          isDarkMode ? "text-gray-100" : "text-gray-800"
        }`}
      >
        Tags
      </h1>
      <div
        className={`p-4 -mt-2 mb-3 mx-6 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } rounded-xl shadow-lg transition-all duration-200`}
      >
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 rounded-lg font-medium">
            {error}
          </div>
        )}

        <div className="mb-6">
          <div className="flex flex-row flex-wrap gap-2">
            {selectedTaskTags?.length ? (
              selectedTaskTags.map((tag) => (
                <div
                  key={tag.id}
                  className={`inline-flex items-center ${
                    isDarkMode
                      ? "bg-blue-900/30 border-blue-700/50 text-blue-200"
                      : "bg-blue-50 border-blue-200 text-blue-700"
                  } border px-2 py-1 rounded-full text-sm font-medium`}
                >
                  {tag.name}
                  <button
                    onClick={() => handleRemoveTag(tag.id)}
                    className={`ml-2 px-1 rounded-full hover:bg-blue-400 hover:text-white transition-all duration-200 ${
                      isDarkMode ? "text-blue-300" : "text-blue-400"
                    }`}
                  >
                    ×
                  </button>
                </div>
              ))
            ) : (
              <div
                className={`text-sm italic ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                No tags added yet
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3">
            <button
              onClick={handleShowTagList}
              className={`text-sm xs:text-md px-3 py-1 rounded-lg font-medium transition-all duration-200 ${
                isDarkMode
                  ? "bg-blue-900/30 text-blue-200 hover:bg-blue-800/50"
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100"
              } flex-1`}
            >
              Add From my Tags
            </button>
            <button
              onClick={() => {
                setError(null);
                setShowTagInput(handleShowTagInput);
              }}
              className={`text-sm xs:text-md px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isDarkMode
                  ? "bg-emerald-900/30 text-emerald-200 hover:bg-emerald-800/50"
                  : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
              } flex-1`}
            >
              Create New Tag
            </button>
          </div>

          {showTagList && (
            <div
              className={`p-4 rounded-lg ${
                isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
              }`}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tags..."
                className={`w-full mb-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-100 placeholder-gray-400 border-gray-600"
                    : "bg-white text-gray-800 border-gray-200"
                } border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              <div className="max-h-48 overflow-y-auto custom-scrollbar">
                {filteredTags.length ? (
                  <div className="flex flex-row flex-wrap gap-2">
                    {filteredTags.map((tag) => (
                      <div
                        key={tag.id}
                        onClick={() => handleAddExistingTag(tag.id)}
                        className={`cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 ${
                          isDarkMode
                            ? "hover:bg-blue-900/30 text-gray-200"
                            : "hover:bg-blue-50 text-gray-700"
                        }`}
                      >
                        {tag.name}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    className={`text-center py-3 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    No matching tags found
                  </div>
                )}
              </div>
            </div>
          )}

          {showTagInput && (
            <div className="flex gap-2">
              <input
                type="text"
                value={newTagName}
                onChange={(e) => {
                  setNewTagName(e.target.value);
                  setError(null);
                }}
                placeholder="Enter new tag name"
                className={`flex-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-100 placeholder-gray-400 border-gray-600"
                    : "bg-white text-gray-800 border-gray-200"
                } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
              />
              <button
                onClick={handleCreateNewTag}
                disabled={!newTagName.trim()}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isDarkMode
                    ? "bg-emerald-600 hover:bg-emerald-500 text-white disabled:bg-gray-700 disabled:text-gray-500"
                    : "bg-emerald-500 hover:bg-emerald-600 text-white disabled:bg-gray-100 disabled:text-gray-400"
                } disabled:cursor-not-allowed`}
              >
                Create
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
