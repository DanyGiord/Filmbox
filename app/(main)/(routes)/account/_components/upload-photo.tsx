"use client"

import { useMutation } from "convex/react";
import { UploadFileResponse } from "@xixixao/uploadstuff/react";
import { UploadDropzone } from "./upload-dropzone";
import "@xixixao/uploadstuff/react/styles.css";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Edit, X } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
import AccountContext from "../_context/account-context";
import toast from "react-hot-toast";
import { ActionTooltip } from "@/components/action-tooltip";


const UploadPhoto = () => {
    // @ts-ignore
    const { imageUrl, setImageUrl, isUpdatingImage, setIsUpdatingImage } = useContext(AccountContext);
    const generateUploadUrl: any = useMutation(api.user.generateUploadUrl);
    const saveImageId = useMutation(api.user.saveImageId);
    const getImageUrl = useMutation(api.user.getImageUrl);
    // @ts-ignore
    const convexUserId: Id<"user"> = localStorage.getItem("convexUserId");
    const saveAfterUpload = async (uploaded: UploadFileResponse[]) => {
        await saveImageId({ id: convexUserId, uploaded: { imageId: (uploaded[0].response as any).storageId } });
        const imgUrl = getImageUrl({ id: convexUserId, imageId: (uploaded[0].response as any).storageId }).then(result => setImageUrl(result));
        setIsUpdatingImage(false);
        toast.success("You have updated your profile picture successfully", {
            style: {
                background: "#1a1a1a",
                color: "#fcfcfc",
                textAlign: "center"
            },
            position: "bottom-center",
            duration: 4000
        });
    };


    return (
        <div className="relative mb-2">
            {isUpdatingImage ? (
                <>
                    <div className="w-[204px] h-[204px]">
                        <UploadDropzone
                            uploadUrl={() => generateUploadUrl({ id: convexUserId })}
                            // @ts-ignore
                            fileTypes={["image/*"]}
                            uploadImmediately
                            onUploadComplete={saveAfterUpload}
                            onUploadError={(error: unknown) => {
                                // @ts-ignore
                                toast.error(error, {
                                    style: {
                                        background: "#1a1a1a",
                                        color: "#fcfcfc",
                                        textAlign: "center"
                                    },
                                    position: "bottom-center",
                                    duration: 4000
                                });
                            }}
                        />
                    </div>
                    <ActionTooltip side="right" align="center" label="Finish editing">
                        <div role="button" onClick={() => setIsUpdatingImage(false)} className="group grid place-items-center w-9 h-9 rounded-full border-2 border-black_main bg-input_bg absolute -bottom-1 -right-4 cursor-pointer transition-all">
                            <X className="w-4 h-4 text-gray group-hover:text-red" />
                        </div>
                    </ActionTooltip>
                </>
            ) : (
                <>
                    <Image
                        // @ts-ignore
                        src={imageUrl ? imageUrl : '/assets/dark-avatar.jpg'}
                        alt="Profile photo"
                        width={204}
                        height={204}
                        className="rounded-[30px] w-[204px] h-[204px] object-cover border-[3px] border-input_bg"
                    />
                    <ActionTooltip side="right" align="center" label="Update image">
                        <div role="button" onClick={() => setIsUpdatingImage(true)} className="group grid place-items-center w-9 h-9 rounded-full border-2 border-black_main bg-input_bg absolute -bottom-1 -right-4 cursor-pointer transition-all">
                            <Edit className="w-4 h-4 text-gray group-hover:text-white_text" />
                        </div>
                    </ActionTooltip>
                </>
            )}
        </div>

    );
}

export default UploadPhoto;