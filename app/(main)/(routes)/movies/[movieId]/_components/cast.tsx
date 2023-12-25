import Image from "next/image";

const TMDB_API_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG_W_500;

interface CastProps {
    actors: any[]
}

const Cast = ({
    actors
}: CastProps) => {
    return (
        <div className="min-w-[323px] px-7 py-5 flex flex-col gap-y-4 rounded-[28px] bg-input_bg">
            <h2 className="text-lg text-white_text">Top cast</h2>
            <div className="flex flex-col gap-y-4">
                {actors.map((actor: any) => (
                    <div className="flex gap-x-4 items-center">
                        <Image
                            src={`${TMDB_API_IMG}${actor.profile_path}`}
                            alt="actor"
                            width={56}
                            height={56}
                            className="rounded-full w-14 h-14 object-cover"
                        />
                        <div className="flex flex-col gap-y-2 py-1">
                            <span className="text-base text-gray">{actor.name}</span>
                            <span className="text-base text-white_text">{actor.character}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cast;