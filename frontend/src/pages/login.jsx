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
      className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
        <div
          className={`w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 
          ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
        >
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              className={`text-xl font-bold leading-tight tracking-tight md:text-2xl
              ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}

              <div>
                <label
                  htmlFor="email"
                  className={`block mb-2 text-sm font-medium
                  ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full rounded-lg p-2.5
                    ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600"
                    }`}
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className={`block mb-2 text-sm font-medium
                  ${isDarkMode ? "text-white" : "text-gray-900"}`}
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
                  className={`w-full rounded-lg p-2.5
                    ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600"
                    }`}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center
                  ${loading ? "opacity-70 cursor-not-allowed" : ""}
                  ${
                    isDarkMode
                      ? "bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                      : "bg-primary-600 hover:bg-primary-700 focus:ring-primary-300"
                  }`}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

              <p
                className={`text-sm font-light ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Don't have an account yet?{" "}
                <a
                  href="/register"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
