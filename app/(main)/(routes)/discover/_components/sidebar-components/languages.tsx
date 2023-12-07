import { ChevronsUpDown, Check } from "lucide-react"

import { cn } from "@/lib/utils"
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
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { fetchLanguages } from "@/tmdb-api/api";

interface LanguagesProps {
    setCurrentLanguage: Dispatch<SetStateAction<string>>;
}

const Languages = ({ setCurrentLanguage }: LanguagesProps) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("");
    const [languages, setLanguages] = useState<any[]>([]);

    useEffect(() => {
        const getLanguages = async () => {
            await fetchLanguages()
                .then((res) => setLanguages(res))
        }
        getLanguages();
    }, [])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full capitalize justify-between bg-input_bg hover:bg-black_main text-white_text hover:text-white_text border-none"
                >
                    {value
                        ? value
                        : "Select language..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 border-none rounded-2xl">
                <Command className="bg-input_bg outline-[0px]">
                    <CommandInput placeholder="Search language..." className="h-9 text-white_second" />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                        {languages.map((language) => (
                            <CommandItem
                                key={language.iso_639_1}
                                value={language.english_name}
                                onSelect={(currentValue) => {
                                    setValue(currentValue);
                                    setCurrentLanguage(language.iso_639_1)
                                    setOpen(false)
                                }}
                                className="text-white_text"
                            >
                                {language.english_name}
                                <Check
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        value === language.english_name ? "opacity-100" : "opacity-0"
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