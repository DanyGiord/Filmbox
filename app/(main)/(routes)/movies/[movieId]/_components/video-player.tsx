import { MessageSquare, Mic, MoreHorizontal, SmilePlus, Users, Video } from "lucide-react";

interface VideoPlayerProps {
    movie: any
}

const VideoPlayer = ({
    movie
}: VideoPlayerProps) => {
    return (
        <div className="flex justify-end">
            <div className="flex flex-col">
                <div className="rounded-t-[28px] py-3 px-7 bg-input_bg flex">
                    <div className="flex items-center gap-x-4 px-4 border-r-2 border-gray_secondary">
                        <div className="group cursor-pointer w-12 h-12 rounded-full bg-gray_secondary grid place-items-center">
                            <MoreHorizontal className="h-5 w-5 text-gray_third group-hover:text-white_second transition-all" />
                        </div>
                        <div className="group cursor-pointer w-12 h-12 rounded-full bg-gray_secondary grid place-items-center">
                            <SmilePlus className="h-5 w-5 text-gray_third group-hover:text-white_second transition-all" />
                        </div>
                        <div className="group cursor-pointer w-12 h-12 rounded-full bg-gray_secondary grid place-items-center">
                            <Users className="h-5 w-5 text-gray_third group-hover:text-white_second transition-all" />
                        </div>
                        <div className="group cursor-pointer w-12 h-12 rounded-full bg-gray_secondary grid place-items-center">
                            <MessageSquare className="h-5 w-5 text-gray_third group-hover:text-white_second transition-all" />
                        </div>
                    </div>
                    <div className="flex items-center gap-x-4 px-4 border-r-2 border-gray_secondary">
                        <div className="group cursor-pointer w-12 h-12 rounded-full bg-gray_secondary grid place-items-center">
                            <Video className="h-5 w-5 text-gray_third group-hover:text-white_second transition-all" />
                        </div>
                        <div className="group cursor-pointer w-12 h-12 rounded-full bg-gray_secondary grid place-items-center">
                            <Mic className="h-5 w-5 text-gray_third group-hover:text-white_second transition-all" />
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-x-2 w-full px-3">
                        <button className="-skew-x-[15deg] rounded-xl text-white bg-[#a00000] py-1 px-6">
                            <span className="skew-x-[15deg] text-sm">Leave</span>
                        </button>
                        <button className="-skew-x-[15deg] rounded-xl text-white bg-gray_secondary py-1 px-3">
                            <span className="skew-x-[15deg] text-sm whitespace-nowrap">Leave and end</span>
                        </button>
                    </div>
                </div>
                <iframe
                    title="video"
                    id="ytplayer"
                    // @ts-ignore
                    type="text/html"
                    width="740"
                    height="405"
                    src={`https://moviesapi.club/movie/${movie.movie.id}`}
                    frameBorder="0"
                    style={{ borderRadius: "0 0 28px 28px" }}
                    className="w-full"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}

export default VideoPlayer;