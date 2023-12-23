'use client'

import DiscoverContext from "../../../_context/context";
import { useContext, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { ChevronsUpDown, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const Languages = () => {
    // @ts-ignore
    const { currentLanguage, setCurrentLanguage, languages } = useContext(DiscoverContext);

    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full capitalize justify-between bg-input_bg hover:bg-black_main text-white_text hover:text-white_text border-none"
                >
                    {currentLanguage
                        ? languages.find((language: any) => language.iso_639_1 === currentLanguage)?.english_name
                        : "Select language..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 border-none rounded-2xl">
                <Command className="bg-input_bg outline-[0px] h-[200px]">
                    <CommandInput placeholder="Search language..." className="h-9 text-white_second" />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                        {languages.map((language: any) => (
                            <CommandItem
                                key={language.iso_639_1}
                                value={language.english_name}
                                onSelect={(currentValue) => {
                                    setCurrentLanguage(language.iso_639_1 == 'xx' ? '' : language.iso_639_1)
                                    setOpen(false)
                                }}
                                className={cn(
                                    "text-gray",
                                    languages.find((language: any) => language.iso_639_1 === currentLanguage)?.english_name === language.english_name && "text-white_text"
                                )}
                            >
                                {language.english_name}
                                <Check
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        languages.find((language: any) => language.iso_639_1 === currentLanguage)?.english_name === language.english_name ? "opacity-100" : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default Languages;