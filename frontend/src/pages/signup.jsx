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

  const inputClasses = `w-full rounded-lg p-2.5 ${
    isDarkMode
      ? "bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
      : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600"
  }`;

  const labelClasses = `block mb-2 text-sm font-medium ${
    isDarkMode ? "text-white" : "text-gray-900"
  }`;

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
              Create your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSignUp}>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              <div>
                <label htmlFor="firstName" className={labelClasses}>
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={inputClasses}
                  placeholder="Enter Your First Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="secondName" className={labelClasses}>
                  Second Name
                </label>
                <input
                  type="text"
                  name="secondName"
                  id="secondName"
                  value={secondName}
                  onChange={(e) => setSecondName(e.target.value)}
                  className={inputClasses}
                  placeholder="Enter Your Second Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className={labelClasses}>
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClasses}
                  placeholder="name@mail.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className={labelClasses}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputClasses}
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className={labelClasses}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputClasses}
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
                {loading ? "Signing up..." : "Sign up"}
              </button>
              <p
                className={`text-sm font-light ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
