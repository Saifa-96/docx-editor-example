import { DocxEditor } from "@docx-editor.dev/react";
import "@docx-editor.dev/core/styles/editor.css";

import { DOCX_BASE64 } from "./docx";

const bytes = Uint8Array.from(atob(DOCX_BASE64), (c) => c.charCodeAt(0));

/**
 * One page, no login: the official docx-editor.dev host rendering the
 * layout-C-student document (the floating seal-line table repro).
 */
export default function App() {
  return (
    <div style={{ height: "100dvh" }}>
      <DocxEditor document={bytes} />
    </div>
  );
}
