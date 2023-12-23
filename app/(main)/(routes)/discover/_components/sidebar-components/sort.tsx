'use client'

import DiscoverContext from "../../../_context/context"
import { useContext } from "react"

import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const Sort = () => {
    // @ts-ignore
    const { selectedSort, setSelectedSort } = useContext(DiscoverContext);

    const sortBy = [
        {
            value: 'popularity',
            id: "r1",
            label: "Popularity"
        },
        {
            value: 'revenue',
            id: "r2",
            label: "Revenue"
        },
        {
            value: 'primary_release_date',
            id: "r3",
            label: "Release date"
        },
        {
            value: 'vote_average',
            id: "r4",
            label: "Vote average"
        },
        {
            value: 'vote_count',
            id: "r5",
            label: "Vote count"
        },
    ]
    return (
        <>
            {sortBy.map(sort => (
                <div key={sort.value} className="flex items-center space-x-2">
                    <RadioGroupItem onClick={() => {
                        selectedSort === sort.value
                            ? setSelectedSort("")
                            : setSelectedSort(sort.value)
                            // @ts-ignore
                    }} checked={selectedSort === sort.value} name={sort.id} value={sort.value} id={sort.id} className={cn(
                        "sort-radio border-2 border-gray text-red transition-all",
                        selectedSort === sort.value && "border-red"
                    )}
                    />
                    <Label onClick={() => {
                        selectedSort === sort.value
                            ? setSelectedSort("")
                            : setSelectedSort(sort.value)
                    }} htmlFor={sort.id} className={cn(
                        "text-gray transition-all",
                        selectedSort === sort.value && "text-white_text"
                    )}>{sort.label}</Label>
                </div>
            ))}
        </>
    );
}

export default Sort;