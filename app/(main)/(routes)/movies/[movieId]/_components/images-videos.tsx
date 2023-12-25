import Image from "next/image";

const TMDB_API_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG_W_500;

interface ImagesVideosProps {
    movieImages: any[]
}

const ImagesVideos = ({
    movieImages
}: ImagesVideosProps) => {
    return (
        <div className="space-y-7">
            <div className="flex justify-around">
                <span className="text-lg text-white_text">Photos</span>
                <span className="text-lg text-gray">Videos</span>
            </div>
            <div className="w-[323px] h-[490px] mt-auto grid grid-cols-2 grid-rows-3 gap-3">
                <div className="w-full col-span-2 rounded-2xl overflow-hidden">
                    <Image
                        src={`${TMDB_API_IMG}${{ ...movieImages[5] }.file_path}`}
                        alt="slika"
                        width={368}
                        height={176}
                        className="object-cover h-full w-full"
                    />
                </div>
                <div className="w-full col-span-1 rounded-2xl bg-slate-300 overflow-hidden">
                    <Image
                        src={`${TMDB_API_IMG}${{ ...movieImages[8] }.file_path}`}
                        alt="slika"
                        width={152}
                        height={152}
                        className="object-cover h-full w-full"
                    />
                </div>
                <div className="w-full row-span-2 rounded-2xl bg-slate-300 overflow-hidden">
                    <Image
                        src={`${TMDB_API_IMG}${{ ...movieImages[7] }.file_path}`}
                        alt="slika"
                        width={152}
                        height={336}
                        className="object-cover h-full w-full"
                    />
                </div>
                <div className="w-full col-span-1 rounded-2xl bg-slate-300 overflow-hidden">
                    <Image
                        src={`${TMDB_API_IMG}${{ ...movieImages[3] }.file_path}`}
                        alt="slika"
                        width={152}
                        height={152}
                        className="object-cover h-full w-full"
                    />
                </div>
            </div>
        </div>
    );
}

export default ImagesVideos;