import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";

import "./styles/index.css";
import "./styles/theme.css";
import "./styles/fonts.css";

import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
