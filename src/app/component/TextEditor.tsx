"use client";

import React, { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { CODE_SNIPPETS } from "@/constants_Misc/constants";
import { LanguageSelector } from "./LanguageSelector";
import ConsoleLog from "./Console";
import { Button } from "@/components/ui/button";
import ShowVariable from "./showVariable";
const TextEditor = () => {
  const editorRef = useRef<any>();
  const [Contentvalue, setValue] = useState<string>("");
  const [language, setLanguage] = useState("javascript");
  const [variables, setVariables] = useState<string[]>([]); // To track detected variables

  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();

    // Detect variable declarations
    editor.onDidChangeModelContent(() => {
      const content = editor.getValue();
      detectVariables(content);
    });
  };

  const detectVariables = (content: string) => {
    // Regular expression to match JavaScript variable declarations (var, let, const)
    const variablePattern = /\b(?:var|let|const)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*[=;]/g;

    const detectedVariables: string[] = [];
    let match;
    while ((match = variablePattern.exec(content)) !== null) {
      detectedVariables.push(match[1]); // Extract variable name
    }

    setVariables([...new Set(detectedVariables)]); // Avoid duplicates
  };

  const onSelect = (language: string) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const showValue = () => {
    alert(editorRef.current?.getValue());
  };

  return (
    <div className="grid grid-flow-row grid-cols-2 gap-2">
      <div>


      <LanguageSelector language={language} onSelect={onSelect} />

      <Button onClick={showValue}>Get Value</Button>

      <Editor
        height="60vh"
        theme="vs-dark"
        width="100%"
        language={language}
        defaultValue="// some comment"
        value={Contentvalue}
        onChange={(newValue) => setValue(newValue || "")}
        onMount={onMount}
      />

      <div className="bg-slate-900 p-5 rounded-lg ml-2 mt-2 mr-3">
        <ConsoleLog editorRef={editorRef} language={language} />
      </div>
      </div>
      <div>
      <ShowVariable variables={variables} />

      </div>


      {/* Display detected variables */}

    </div>
  );
};

export default TextEditor;
