import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import("tailwindcss-animate");
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <>
    <App />
    <Toaster />
  </>,
);
