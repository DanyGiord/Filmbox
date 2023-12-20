'use client'

import { useCallback, useState } from "react";
import type { Accept, FileWithPath } from "react-dropzone";
import { useDropzone } from "react-dropzone";
import { twMerge } from "tailwind-merge";
import { UploadFileResponse } from "@xixixao/uploadstuff/react";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { UploadSpinner } from "@xixixao/uploadstuff/react";

type UploadDropzoneState = {
    progress: number | null;
    isDragActive: boolean;
};

export function UploadDropzone(props: {
    uploadUrl: string | (() => Promise<string>);
    fileTypes?: Accept;
    multiple?: boolean;
    uploadImmediately?: boolean;
    onUploadProgress?: (progress: number) => void;
    onUploadBegin?: (fileName: string) => void;
    onUploadComplete?: (uploaded: UploadFileResponse[]) => Promise<void> | void;
    onUploadError?: (error: unknown) => void;
    subtitle?: string;
    content?: (state: UploadDropzoneState) => string;
    className?: (state: UploadDropzoneState) => string;
}) {
    const [files, setFiles] = useState<File[]>([]);

    const [uploadProgress, setUploadProgress] = useState(0);
    const { startUpload, isUploading } = useUploadFiles(props.uploadUrl, {
        onUploadComplete: async (res) => {
            setFiles([]);
            await props.onUploadComplete?.(res);
            setUploadProgress(0);
        },
        onUploadProgress: (p) => {
            setUploadProgress(p);
            props.onUploadProgress?.(p);
        },
        onUploadError: props.onUploadError,
        onUploadBegin: props.onUploadBegin,
    });

    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[]) => {
            setFiles(acceptedFiles);

            if (props.uploadImmediately === true) {
                void startUpload(acceptedFiles);
                return;
            }
        },
        [props, startUpload]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: props.fileTypes,
        disabled: false,
    });

    const onUploadClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        e.stopPropagation();
        if (files.length === 0) {
            return;
        }

        void startUpload(files);
    };

    const combinedState = {
        isDragActive,
        progress: isUploading ? uploadProgress : null,
    };

    return (
        <div
            className={
                props.className?.(combinedState) ??
                twMerge(
                    "flex flex-col items-center justify-center gap-y-6 rounded-[30px] border-2 border-dashed border-gray h-[204px] w-[204px] p-3 text-center",
                    isDragActive && "bg-blue-600/10",
                )
            }
            {...getRootProps()}
        >
            {props.content?.(combinedState) ?? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    className={twMerge(
                        "mx-auto block h-12 w-12 text-gray-400 dark:text-gray-300"
                    )}
                >
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765a4.5 4.5 0 0 1 8.302-3.046a3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            )}
            <label
                htmlFor="file-upload"
                className={twMerge(
                    "relative mt-4 flex w-64 cursor-pointer items-center justify-center text-sm font-semibold leading-6 text-gray-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-red/75",
                    "text-red/60"
                )}
            >
                Choose files or<br />drag & drop
                <input className="sr-only" {...getInputProps()} />
            </label>
            {props.subtitle !== undefined ? (
                <div
                    className={twMerge(
                        "m-0 h-[1.25rem] text-xs leading-5 text-gray-600 dark:text-gray-500"
                    )}
                >
                    {props.subtitle}
                </div>
            ) : null}
            {files.length > 0 ? (
                <button
                    className={twMerge(
                        "relative mt-4 flex h-10 w-36 items-center justify-center overflow-hidden rounded-md text-white after:transition-[width] after:duration-500",
                        isUploading
                            ? `before:absolute before:-z-20 before:w-full before:h-full before:bg-blue-400 ` +
                            `bg-blue-400 after:absolute after:-z-10 after:left-0 after:h-full after:bg-blue-600 ${progressWidths[uploadProgress]}`
                            : "bg-blue-600"
                    )}
                    onClick={onUploadClick}
                    disabled={isUploading}
                >
                    {isUploading ? (
                        <UploadSpinner />
                    ) : (
                        `Upload ${files.length} file${files.length === 1 ? "" : "s"}`
                    )}
                </button>
            ) : null}
        </div>
    );
}

const progressWidths: Record<number, string> = {
    0: "after:w-0",
    10: "after:w-[10%]",
    20: "after:w-[20%]",
    30: "after:w-[30%]",
    40: "after:w-[40%]",
    50: "after:w-[50%]",
    60: "after:w-[60%]",
    70: "after:w-[70%]",
    80: "after:w-[80%]",
    90: "after:w-[90%]",
    100: "after:w-[100%]",
};
