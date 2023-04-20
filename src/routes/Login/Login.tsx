import React, { useState } from "react";

function Login() {
  const [userLoginInfo, setUserLoginInfo] = useState({
    email: "",
    password: "",
  });
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUserLoginInfo((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <main className="flex flex-1 flex-col justify-center items-center">
      <div className="max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Sign In to your account
        </h1>
        <form className="text-lg">
          <div className="border-2 border-gray-400 rounded overflow-hidden mb-6">
            <input
              type="email"
              name="email"
              className="p-2 border-b-2 border-gray-400 w-full"
              placeholder="Email Address"
              value={userLoginInfo.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              className="p-2 w-full"
              min={6}
              placeholder="Password"
              value={userLoginInfo.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 text-white p-2 rounded w-full text-center"
          >
            Log In
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
