import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginRegisterService from ".././Service/Login-RegisterService";
import { useAppContext } from ".././contexts/AppContext";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { isDarkMode } = useAppContext();


  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    let name = `${firstName} ${secondName}`;
    const userData = { name, email, password };
    console.log("Signing up with:", userData);

    try {
      // Register the user
      const registerResponse = await LoginRegisterService.registerUser(
        userData
      );
      console.log("Registration successful:", registerResponse);

      // Login the user immediately after registration
      const loginResponse = await LoginRegisterService.loginUser({
        email,
        password,
      });
      const token = loginResponse.token;
      console.log("Login successful:", loginResponse);

      // Store the token in local storage
      localStorage.setItem("x-access-token", token);

      // Set success message and navigate to home page
      setSuccess("Signed u successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error during sign up :", error);
      setError("Failed to sign up. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`min-h-screen ${isDarkMode 
      ? "bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900" 
      : "bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100"}`}>
      <div className="flex flex-col items-center justify-center px-6 py-4 mx-auto min-h-screen">
        
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl"></div>
        </div>

        {/* Logo Section */}
        <div className="text-center mb-4">
          <h1 className={`text-4xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 
            bg-clip-text text-transparent animate-gradient-x tracking-tight`}>
            DoHub
          </h1>
          <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Organize your tasks, boost your productivity
          </p>
        </div>

        <div className={`w-full max-w-md p-6 rounded-2xl shadow-2xl backdrop-blur-sm
          ${isDarkMode 
            ? "bg-gray-800/50 border border-blue-700/50" 
            : "bg-white/70 border border-blue-200/50"}`}>
          
          <h1 className={`text-2xl font-bold mb-4 text-center bg-gradient-to-r 
            ${isDarkMode
              ? "from-blue-400 to-indigo-400"
              : "from-blue-600 to-indigo-600"} 
            bg-clip-text text-transparent`}>
            Create Account
          </h1>

          <form className="space-y-4" onSubmit={handleSignUp}>
            {error && <p className="text-red-400 text-center text-sm bg-red-500/10 py-2 rounded-lg">{error}</p>}
            {success && <p className="text-green-400 text-center text-sm bg-green-500/10 py-2 rounded-lg">{success}</p>}

            {/* First Name Input */}
            <div>
              <label className={`block mb-1 text-sm font-medium
                ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                className={`w-full px-4 py-2 rounded-xl transition-all duration-200 outline-none
                  ${isDarkMode
                    ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    : "bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"}`}
                required
              />
            </div>

            {/* Second Name Input - Similar structure */}
            <div>
              <label className={`block mb-1 text-sm font-medium
                ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
                Second Name
              </label>
              <input
                type="text"
                value={secondName}
                onChange={(e) => setSecondName(e.target.value)}
                placeholder="Doe"
                className={`w-full px-4 py-2 rounded-xl transition-all duration-200 outline-none
                  ${isDarkMode
                    ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    : "bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"}`}
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className={`block mb-1 text-sm font-medium
                ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.doe@example.com"
                className={`w-full px-4 py-2 rounded-xl transition-all duration-200 outline-none
                  ${isDarkMode
                    ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    : "bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"}`}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className={`block mb-1 text-sm font-medium
                ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`w-full px-4 py-2 rounded-xl transition-all duration-200 outline-none
                  ${isDarkMode
                    ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    : "bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"}`}
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className={`block mb-1 text-sm font-medium
                ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className={`w-full px-4 py-2 rounded-xl transition-all duration-200 outline-none
                  ${isDarkMode
                    ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    : "bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"}`}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-6 rounded-xl font-medium text-white transition-all duration-200
                bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600
                ${loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg hover:-translate-y-0.5"}`}>
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Sign up"
              )}
            </button>

            <p className={`text-sm text-center ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Already have an account?{" "}
              <a href="/login" className="font-medium text-blue-500 hover:text-indigo-500 transition-colors">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
