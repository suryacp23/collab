import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { useRef } from "react";
import { MonacoBinding } from "y-monaco";

const EditorComponent = () => {
  const editorRef = useRef(null);

  const handleEditorMount = (editor, monaco) => {
    editorRef.current = editor; // Save the editor instance for binding

    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider(
      "ws://localhost:1234",
      "your-room-name",
      ydoc
    );
    const yText = ydoc.getText("monaco");
    const monacoBinding = new MonacoBinding(
      yText,
      editor.getModel(),
      new Set([editor]),
      provider.awareness
    );
  };
  return (
    <div className="container">
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        width="80vw"
        onMount={handleEditorMount}
      />
    </div>
  );
};

export default EditorComponent;
