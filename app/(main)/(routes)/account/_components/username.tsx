import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import AccountContext from "../_context/account-context";
import { Button } from "@/components/ui/button";
import { Check, Edit, Plus, X } from "lucide-react";
import { ActionTooltip } from "@/components/action-tooltip";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import toast from "react-hot-toast";

const Username = () => {
    // @ts-ignore
    const { username, setUsername, isUpdatingUsername, setIsUpdatingUsername } = useContext(AccountContext)
    const setApiUsername = useMutation(api.user.setUsername);

    const [inputUsername, setInputUsername] = useState("")

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const convexUserId = localStorage.getItem("convexUserId");

        // @ts-ignore
        const promise = setApiUsername({ id: convexUserId, username: inputUsername.toLowerCase() })
            .then(() => {
                setUsername(inputUsername);
                setIsUpdatingUsername(false);
                setInputUsername("");
                toast.success("Username sucessfully updated",
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
            {isUpdatingUsername ? (
                <form onSubmit={(e) => handleSubmit(e)} className="flex items-center gap-x-3 translate-x-7">
                    <Input
                        value={inputUsername}
                        placeholder="Username"
                        onChange={(e) => setInputUsername(e.target.value)}
                    />
                    {inputUsername.length > 0 ? (
                        <ActionTooltip side="right" align="center" label="Save">
                            <button
                                type="submit"
                                className="group grid place-items-center w-9 h-9 rounded-full bg-input_bg cursor-pointer transition-all">
                                <Check className="w-4 h-4 text-gray group-hover:text-[#4bb543]" />
                            </button>
                        </ActionTooltip>
                    ) : (
                        <ActionTooltip side="right" align="center" label="Finish editing">
                            <div role="button" onClick={() => setIsUpdatingUsername(false)} className="group grid place-items-center w-9 h-9 rounded-full bg-input_bg cursor-pointer transition-all">
                                <X className="w-4 h-4 text-gray group-hover:text-red" />
                            </div>
                        </ActionTooltip>
                    )}
                </form>
            ) : (
                <>
                    {username.length > 0 ? (
                        <div className="flex items-center gap-x-3 translate-x-4">
                            <span className="text-lg leading-6 text-gray text-center">
                                @{username}
                            </span>
                            <ActionTooltip side="right" align="center" label="Edit username">
                                <div role="button" onClick={() => setIsUpdatingUsername(true)} className="group grid place-items-center w-9 h-9 rounded-full bg-input_bg cursor-pointer transition-all">
                                    <Edit className="w-4 h-4 text-gray group-hover:text-white_text" />
                                </div>
                            </ActionTooltip>
                        </div>
                    ) : (
                        <Button onClick={() => setIsUpdatingUsername(true)} className="flex items-center justify-between px-8 py-6 rounded-2xl">
                            Add username<Plus className="ml-5 w-5 h-5" />
                        </Button>
                    )}
                </>
            )}
        </>
    );
}

export default Username;