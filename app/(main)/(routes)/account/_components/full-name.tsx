'use client'

import { useContext, useState } from "react";
import AccountContext from "../_context/account-context";
import { Check, Edit, X } from "lucide-react";
import { ActionTooltip } from "@/components/action-tooltip";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import toast from "react-hot-toast";

const FullName = () => {
    // @ts-ignore
    const { fullName, setFullName, isUpdatingName, setIsUpdatingName } = useContext(AccountContext)

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const setName = useMutation(api.user.setName);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const convexUserId = localStorage.getItem("convexUserId");
        // @ts-ignore
        const promise = setName({ id: convexUserId, firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1), lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1) })
            .then(() => {
                setFullName(`${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${lastName.charAt(0).toUpperCase() + lastName.slice(1)}`)
                setIsUpdatingName(false);
                setFirstName("");
                setLastName("");
                toast.success("Name sucessfully updated",
                    {
                        style: {
                            background: "#1a1a1a",
                            color: "#fcfcfc",
                            textAlign: "center",
                        },
                        position: "bottom-center",
                        duration: 4000,
                    }
                );
            })
    }

    return (
        <>
            {isUpdatingName ? (
                <form onSubmit={(e) => handleSubmit(e)} className="flex items-center gap-x-3 translate-x-7">
                    <Input
                        value={firstName}
                        placeholder="First name"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Input
                        value={lastName}
                        placeholder="Last name"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    {firstName.length > 0 && lastName.length > 0 ? (
                        <ActionTooltip side="right" align="center" label="Save">
                            <button
                                type="submit"
                                className="group grid place-items-center w-9 h-9 rounded-full bg-input_bg cursor-pointer transition-all">
                                <Check className="w-4 h-4 text-gray group-hover:text-[#4bb543] group-hover:w-[18px] group-hover:h-[18px] transition-all" />
                            </button>
                        </ActionTooltip>
                    ) : (
                        <ActionTooltip side="right" align="center" label="Finish editing">
                            <div role="button" onClick={() => setIsUpdatingName(false)} className="group grid place-items-center w-9 h-9 rounded-full bg-input_bg cursor-pointer transition-all">
                                <X className="w-4 h-4 text-gray group-hover:text-red group-hover:w-[18px] group-hover:h-[18px] transition-all" />
                            </div>
                        </ActionTooltip>
                    )}
                </form>
            ) : (
                <div className="flex gap-x-3 items-center">
                    <h1 className="font-bold text-center text-4xl leading-[45px] text-white_text mb-1">
                        {fullName}
                    </h1>
                    <ActionTooltip side="right" align="center" label="Edit name">
                        <div role="button" onClick={() => setIsUpdatingName(true)} className="group grid place-items-center w-9 h-9 rounded-full bg-input_bg cursor-pointer transition-all">
                            <Edit className="w-4 h-4 text-gray group-hover:text-white_text group-hover:w-[18px] group-hover:h-[18px] transition-all" />
                        </div>
                    </ActionTooltip>
                </div>
            )}
        </>
    );
}

export default FullName;