"use client"

import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';


import Editor from '@monaco-editor/react';
import { CODE_SNIPPETS } from '@/constants_Misc/constants';
import {LanguageSelector}  from './LanguageSelector';
import ConsoleLog from './Console';



const TextEditor = () => {
    const editorRef = useRef()
    const [Contentvalue, setValue] = useState<string>("");
    const [language, setLanguage] = useState("javascript");

    const onMount = (editor : any) => { 
        editorRef.current = editor
        editor.focus();
    }

    const onSelect = (language) => { 
      setLanguage(language)
      setValue(CODE_SNIPPETS[language])
    }

  

  return (
    <div>

        <LanguageSelector language = {language} onSelect = {onSelect}/>
       

       
        <Editor height="60vh" theme='vs-dark' width= '100%'  language={language} defaultValue="// some comment" value = {Contentvalue} onChange={(newValue) => setValue(newValue || "")} 
        onMount={onMount}
        />
         

        <div  className=' bg-slate-900 p-5 width-[100%] rounded-lg ml-2 mt-2 mr-3' >
          <ConsoleLog editorRef ={editorRef} language = {language}/> 

        </div>
      
    </div>
  )
}

export default TextEditor
