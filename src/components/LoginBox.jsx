function LoginBox() {
  return (
    <div className="max-w-2xl rounded-lg bg-white p-10 text-gray-400 shadow-xl">
      {" "}
      {/* Adjusted max width */}
      <form>
        <h1>Email</h1> {/* Corrected class attribute */}
        <div className="mb-4">
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="w-full rounded border border-gray-300 p-3"
          />
        </div>
        <h1 className="mt-10">Password</h1>
        <div className="mb-6">
          <input
            id="password"
            type="password"
            placeholder="Your Password"
            className="w-full rounded border border-gray-300 p-3"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
          >
            Login
          </button>
          <a href="#" className="pl-20 text-sm text-blue-500 hover:underline">
            Don’t have an account? Sign up
          </a>
        </div>
      </form>
    </div>
  );
}

export default LoginBox;
