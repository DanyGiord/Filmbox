'use client'

import DiscoverContext from "../../../_context/context"
import { useEffect, useState, useContext } from "react"

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


const ReleaseYear = () => {
    // @ts-ignore
    const { currentYear, setCurrentYear } = useContext(DiscoverContext);

    const [open, setOpen] = useState(false)
    const [years, setYears] = useState<number[]>([]);

    useEffect(() => {
        const yearsArray = Array.from({ length: 2023 - 1882 + 1 }, (_, index) => 2023 - index);
        setYears(yearsArray);
    }, []);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full capitalize justify-between bg-input_bg hover:bg-black_main text-white_text hover:text-white_text border-none"
                >
                    {currentYear
                        ? currentYear
                        : "Select year..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 border-none rounded-2xl">
                <Command className="bg-input_bg outline-[0px] h-[200px]">
                    <CommandInput placeholder="Search year..." className="h-9 text-white_second" />
                    <CommandEmpty>No year found.</CommandEmpty>
                    <CommandGroup>
                        {years.map((year: any) => (
                            <CommandItem
                                key={year}
                                value={String(year)}
                                onSelect={(currentValue) => {
                                    setCurrentYear(year)
                                    setOpen(false)
                                }}
                                className={cn(
                                    "text-gray",
                                    currentYear === year && "text-white_text"
                                )}
                            >
                                {year}
                                <Check
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        String(currentYear) === String(year) ? "opacity-100" : "opacity-0"
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

export default ReleaseYear;