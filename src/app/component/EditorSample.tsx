"use client"

import * as monaco from 'monaco-editor';
import React, { useEffect, useRef } from 'react';

const EditorSample = () => {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  useEffect(() => {
    // Initialize editor
    monacoRef.current = monaco.editor.create(editorRef.current, {
      value: '',
      language: 'javascript',
      theme: 'vs-dark',
      minimap: { enabled: false }
    });

    // Create a variable declaration pattern for detection
    const variablePattern = /\b(?:var|let|const)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*[=;]/g;

    // Add change content listener
    const model = monacoRef.current.getModel();
    model.onDidChangeContent(() => {
      const content = model.getValue();
      const matches = [...content.matchAll(variablePattern)];
      
      if (matches.length > 0) {
        // Get the latest match (most recently added variable)
        const latestMatch = matches[matches.length - 1];
        const variableName = latestMatch[1];
        
        // Get the line number where the variable was declared
        const lines = content.slice(0, latestMatch.index).split('\n');
        const lineNumber = lines.length;
        
        console.log(`New variable detected: ${variableName} at line ${lineNumber}`);
        
        // You can add your custom logic here, such as:
        // - Adding decorations to highlight the variable
        // - Triggering a callback function
        // - Updating state in your React component
        addDecoration(lineNumber);
      }
    });

    // Function to add decoration (highlighting) to the variable declaration
    const addDecoration = (lineNumber) => {
      const decorations = [{
        range: new monaco.Range(lineNumber, 1, lineNumber, 1),
        options: {
          isWholeLine: true,
          className: 'variableDeclarationLine',
          glyphMarginClassName: 'variableGlyphMargin'
        }
      }];

      monacoRef.current.deltaDecorations([], decorations);
    };

    // Cleanup
    return () => {
      if (monacoRef.current) {
        monacoRef.current.dispose();
      }
    };
  }, []);

  return (
    <div>
      <div ref={editorRef} style={{ height: '500px', border: '1px solid gray' }} />
      <style>
        {`
          .variableDeclarationLine {
            background: rgba(14, 99, 156, 0.2);
          }
          .variableGlyphMargin {
            background: rgba(14, 99, 156, 0.5);
            border-radius: 50%;
            width: 8px;
            height: 8px;
            margin-left: 5px;
          }
        `}
      </style>
    </div>
  );
};

export default EditorSample;