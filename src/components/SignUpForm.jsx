import React from "react";

const SignUpForm = () => {
  return (
    <div className="w-full max-w-2xl rounded-lg bg-white p-8 text-gray-400 shadow-xl md:p-10">
      {" "}
      {/* Adjusted max width */}
      <form>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div>
            <h1>First Name</h1>
            <div className="mb-4">
              <input
                id="firstname"
                type="text"
                placeholder="first name"
                className="w-full rounded border border-gray-300 p-3"
              />
            </div>
          </div>
          <div>
            <h1>Last Name</h1>
            <div className="mb-4">
              <input
                id="lastname"
                type="text"
                placeholder="last name"
                className="w-full rounded border border-gray-300 p-3"
              />
            </div>
          </div>
        </div>
        <h1>Year</h1> {/* Corrected class attribute */}
        <div className="mb-4">
          <input
            id="year"
            type="text"
            placeholder="degree year"
            className="w-full rounded border border-gray-300 p-3"
          />
        </div>
        <h1>Email</h1> {/* Corrected class attribute */}
        <div className="mb-4">
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="w-full rounded border border-gray-300 p-3"
          />
        </div>
        <h1>Username</h1> {/* Corrected class attribute */}
        <div className="mb-4">
          <input
            id="username"
            type="text"
            placeholder="your Username"
            className="w-full rounded border border-gray-300 p-3"
          />
        </div>
        <h1 className="">Password</h1>
        <div className="mb-6">
          <input
            id="password"
            type="password"
            placeholder="Your Password"
            className="w-full rounded border border-gray-300 p-3"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="submit"
            className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
          >
            <span className="inline-flex text-sm md:text-base">Sign Up</span>
          </button>
          <a
            href="#"
            className="inline-flex text-sm text-blue-500 hover:underline"
          >
            Help? Contact support
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
