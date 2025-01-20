import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { LANGUAGE_VERSIONS } from "@/constants_Misc/constants"
import { Languages } from "next/dist/lib/metadata/types/alternative-urls-types"

const languages = Object.entries(LANGUAGE_VERSIONS)

export function LanguageSelector( {language, onSelect} ) {



  return (
    <div className="p-4">
    <Select value={language} onValueChange={(value) => onSelect(value)}>
      <SelectTrigger   className="w-[180px] bg-white">
        <SelectValue  placeholder={language} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          {languages.map(([language, version]) => (
              <SelectItem key={language} value={language}>
                {language} - {version}
              </SelectItem>
            ))}
          
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
  )
}
