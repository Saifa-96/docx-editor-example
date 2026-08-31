# docx-editor-example

One page rendering `layout-C-student(1).docx` in the official
[`@docx-editor.dev/react`](https://github.com/eigenpal/docx-editor) editor —
the floating seal-line table (`w:tblpPr`) repro for the layout issue.

## Run locally

1. Copy the document into this folder's root: `layout-C-student(1).docx`
   (the predev hook embeds it into `src/docx.ts` — no server, no login).
2. `npm install`
3. `npm run dev`

## Export to CodeSandbox

`npm run export:sandbox` — writes the sandbox define URL to
`codesandbox.url.txt`; open it in a browser (logged in) and save/fork.
