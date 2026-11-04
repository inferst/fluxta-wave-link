import { ActionEditorProvider } from "@fluxta/sdk/ui";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ActionEditor } from "./ActionEditor";

export function mountAction(
  operation: "set-volume" | "adjust-volume" | "set-mute",
) {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ActionEditorProvider>
        <ActionEditor operation={operation} />
      </ActionEditorProvider>
    </StrictMode>,
  );
}
