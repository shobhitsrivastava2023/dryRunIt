import { Button } from "@/components/ui/button";
import Image from "next/image";
import TextEditor from "./component/TextEditor";

export default function Home() {
  return (
   <div className="grid grid-flow-row grid-cols-2 gap-2">
   
   
   <div className="rounded-lg">
   <TextEditor />
   </div>
    
    <Button className="w-[50%]"> Click me man  </Button>
   </div>
  );
}
