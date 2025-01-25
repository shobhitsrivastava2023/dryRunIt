import { Button } from "@/components/ui/button";
import Image from "next/image";
import TextEditor from "./component/TextEditor";

import VariableDetective from "./component/variableDetective";
export default function Home() {
  return (
   <div>


   <div className="rounded-lg">
   <TextEditor />
   </div>
   </div>
  );
}
