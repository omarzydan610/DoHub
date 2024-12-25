import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginRegisterService from "../Service/Login-RegisterService";
import { useAppContext } from ".././contexts/AppContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { isDarkMode } = useAppContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const credentials = { email, password };

    try {
      // Make the API call to log in the user
      const response = await LoginRegisterService.loginUser(credentials);

      // Check if the response has the token
      if (
        response &&
        response.message === "Login successful" &&
        response.token
      ) {
        const token = response.token;
        console.log("done");
        // Store the token in local storage
        localStorage.setItem("x-access-token", token);
        // Set success message
        setSuccess("Logged in successfully!");

        // Redirect to the home page after successful login
        navigate("/");
      } else {
        // Handle case when no token is returned
        setError("Failed to log in. Please check your email and password.");
      }
    } catch (error) {
      setError("Failed to log in. Please check your email and password.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className={`min-h-screen ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900"
          : "bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100"
      }`}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl"></div>
        </div>

        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 
            bg-clip-text text-transparent animate-gradient-x tracking-tight`}>
            DoHub
          </h1>
          <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Organize your tasks, boost your productivity
          </p>
        </div>

        <div
          className={`w-full max-w-md p-8 rounded-2xl shadow-2xl backdrop-blur-sm
          ${
            isDarkMode
              ? "bg-gray-800/50 border border-blue-700/50"
              : "bg-white/70 border border-blue-200/50"
          }`}
        >
          <h1
            className={`text-2xl font-bold mb-6 text-center bg-gradient-to-r 
            ${
              isDarkMode
                ? "from-blue-400 to-indigo-400"
                : "from-blue-600 to-indigo-600"
            } 
            bg-clip-text text-transparent`}
          >
            Welcome Back!
          </h1>

          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <p className="text-red-400 text-center text-sm bg-red-500/10 py-2 rounded-lg">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-400 text-center text-sm bg-green-500/10 py-2 rounded-lg">
                {success}
              </p>
            )}

            <div>
              <label
                htmlFor="email"
                className={`block mb-2 text-sm font-medium
                ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl transition-all duration-200 outline-none
                  ${
                    isDarkMode
                      ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      : "bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  }`}
                placeholder="name@company.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className={`block mb-2 text-sm font-medium
                ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-xl transition-all duration-200 outline-none
                  ${
                    isDarkMode
                      ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      : "bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  }`}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-6 rounded-xl font-medium text-white transition-all duration-200
                bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600
                ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:shadow-lg hover:-translate-y-0.5"
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>

            <p
              className={`text-sm text-center ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Don't have an account yet?{" "}
              <a
                href="/register"
                className="font-medium text-blue-500 hover:text-indigo-500 transition-colors"
              >
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
