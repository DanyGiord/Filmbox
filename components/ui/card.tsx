import Image from "next/image";

const TMDB_API_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG_W_500;

interface CardProps {
    id: number;
    poster_path: string;
    title: string;
}

const Card = ({ id, poster_path, title }: CardProps) => {
    return (
        <div
            key={id}
            className="flex justify-center px-2 py-2 relative items-center"
        >
            <div className="relative rounded-2xl">
                <Image
                    src={TMDB_API_IMG + poster_path}
                    alt={title}
                    width={192}
                    height={252}
                    className="rounded-2xl"
                />
                <div className="absolute inset-0 w-48 h-full flex flex-col justify-end p-2 rounded-2xl card_main">
                    <p className="text-white font-normal text-sm absolute bottom-4 right-0 left-0 hover:cursor-default text-center">
                        {title}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Card