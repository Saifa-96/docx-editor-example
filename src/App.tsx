import { DocxEditor } from "@docx-editor.dev/react";
import "@docx-editor.dev/core/styles/editor.css";
import { useEffect, useState } from "react";

// StackBlitz imports GitHub repos through jsDelivr, which 403s this binary
// and leaves a truncated copy on its virtual FS — so fetch the exact bytes
// from raw.githubusercontent.com instead (anonymous, CORS-enabled, live on main).
const DOCX_URL =
  "https://raw.githubusercontent.com/Saifa-96/docx-editor-example/main/layout-C-student.docx";

/**
 * One page, no login: the official docx-editor.dev host rendering
 * layout-C-student.docx (the floating seal-line table repro), fetched
 * straight from the repository file.
 */
export default function App() {
  const [bytes, setBytes] = useState<Uint8Array | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(DOCX_URL)
      .then((response) => {
        if (!response.ok) throw new Error(`failed to load the document (${response.status})`);
        return response.arrayBuffer();
      })
      .then((buffer) => {
        if (!cancelled) setBytes(new Uint8Array(buffer));
      })
      .catch((cause) => {
        if (!cancelled) setError(String(cause instanceof Error ? cause.message : cause));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return <pre style={{ padding: 16 }}>{error}</pre>;
  }
  if (!bytes) {
    return <pre style={{ padding: 16 }}>loading document…</pre>;
  }
  return (
    <div style={{ height: "100dvh" }}>
      <DocxEditor document={bytes} />
    </div>
  );
}
