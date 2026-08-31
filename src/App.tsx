import { DocxEditor } from "@docx-editor.dev/react";
import "@docx-editor.dev/core/styles/editor.css";

import { DOCX_BASE64 } from "./docx";

const bytes = Uint8Array.from(atob(DOCX_BASE64), (c) => c.charCodeAt(0));

/**
 * One page, no login: the official docx-editor.dev host rendering
 * layout-C-student.docx (the floating seal-line table repro). The document
 * ships as base64 text inside the bundle — decoded once at startup, handed
 * straight to the editor.
 */
export default function App() {
  return (
    <div style={{ height: "100dvh" }}>
      <DocxEditor document={bytes} />
    </div>
  );
}
