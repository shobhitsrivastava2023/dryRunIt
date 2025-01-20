import React, { useState } from "react";
import { executeCode } from "../api/execute";

interface ConsoleLogProps {
  editorRef: React.MutableRefObject<any>;
  language: string;
}

const ConsoleLog: React.FC<ConsoleLogProps> = ({ editorRef, language }) => {
  const [output, setOutput] = useState<string[] | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState<string | null>(null);

  const runCode = async () => {
    if (!editorRef.current) {
      console.error("Editor is not ready");
      setError("Editor is not initialized.");
      return;
    }
  
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
  
    try {
      setLoading(true);
      setError(null);
      setOutput(null);
      console.log("Running code:", sourceCode);
  
      const result = await executeCode(language, sourceCode);
      
      if (result.stderr) {
        setError(result.stderr);
      } else if (result.stdout) {
        setOutput(result.stdout.split('\n'));
      } else if (result.output) {
        setOutput(result.output.split('\n'));
      } else {
        setError("No output received from execution.");
      }
    } catch (error) {
      console.error("Error executing code:", error);
      setError("Failed to connect to the API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 text-white p-4 rounded-lg">
      <button
        onClick={runCode}
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
      >
        {isLoading ? "Running..." : "Run Code"}
      </button>

      <div className="mt-4">
        {isLoading && <p className="text-yellow-300">Running your code...</p>}

        {isError && (
          <div className="text-red-500 mt-2">
            <p>
              <strong>Error:</strong>
            </p>
            <pre className="bg-red-800 p-2 rounded-md whitespace-pre-wrap">
              {isError}
            </pre>
          </div>
        )}

        {output && (
          <div className="mt-2 bg-gray-800 p-2 rounded-md max-h-60 overflow-y-auto">
            <p className="text-green-400">Output:</p>
            <pre className="whitespace-pre-wrap">{output.join("\n")}</pre>
          </div>
        )}

        {!isLoading && !isError && !output && (
          <p className="text-gray-400">Click "Run Code" to see the output here.</p>
        )}
      </div>
    </div>
  );
};

export default ConsoleLog;
