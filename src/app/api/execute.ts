import axios from "axios";
import { LANGUAGE_VERSIONS } from "@/constants_Misc/constants";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});


export const executeCode = async (language: string, sourceCode: string) => {
    const response = await API.post("/execute", {
      language: language,
      version: LANGUAGE_VERSIONS[language],
      files: [
        {
          content: sourceCode,
        },
      ],
    });
    
    return {
      output: response.data.run.output,
      stderr: response.data.run.stderr,
      stdout: response.data.run.stdout
    };
  };