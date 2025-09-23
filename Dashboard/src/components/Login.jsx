import { useState } from "react";

const Login = ({ onLoginSuccess }) => {   // ✅ receive here
  const [formData, setFormData] = useState({
    verificationId: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
    console.log("onLoginSuccess function:", onLoginSuccess);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Full API response:", data);

      if (response.ok) {
        alert("✅ Login successful!");
        console.log("User Data:", data.user);
        onLoginSuccess(data.user); // ✅ navigate to dashboard
      } else {
        alert("❌ " + (data.message || data.error || "Login failed"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Something went wrong!");
    }
  };
  

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/login_background.png"
          alt="Digital network background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/80 to-blue-950/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-lg rounded-2xl shadow-lg p-8">
          {/* Brand Area */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-white mb-2">
              Welcome to SafeSphere
            </h1>
            <p className="text-slate-400">Secure access to your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="verificationId"
                className="block text-sm font-medium text-slate-300 mb-1"
              >
                Verification ID
              </label>
              <input
                type="text"
                id="verificationId"
                name="verificationId"
                value={formData.verificationId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-slate-800/70 text-white placeholder-slate-400 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your verification ID"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-slate-800/70 text-white placeholder-slate-400 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-all duration-200"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-slate-500 text-sm">
              Need help?{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
