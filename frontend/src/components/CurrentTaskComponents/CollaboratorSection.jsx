const CollaboratorSection = ({ collaborators, isDarkMode }) => {
  return (
    <div className="px-5">
      <h1
        className={`text-2xl font-semibold mb-6 ${
          isDarkMode ? "text-gray-100" : "text-gray-900"
        }`}
      >
        Collaborators
      </h1>
      <div className="space-y-2">
        {collaborators.length > 0 &&
          collaborators?.map((email) => (
            <div
              key={email}
              className={`flex items-center p-2 rounded-lg
                ${isDarkMode ? "bg-gray-800" : "bg-gray-300/20"}`}
            >
              <div
                className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                {email}
              </div>
            </div>
          ))}
        {collaborators.length === 0 && (
          <div className="mb-5 text-gray-500">No collaborators</div>
        )}
      </div>
    </div>
  );
};
export default CollaboratorSection;
