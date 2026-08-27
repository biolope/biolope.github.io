import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../styles/global.css";
import ImprintPage from "./ImprintPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ImprintPage />
  </StrictMode>,
);
