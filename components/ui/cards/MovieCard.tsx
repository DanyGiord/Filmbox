import Image from "next/image";
import Movie from "@/public/assets/movie.png";

const MovieCard = () => {
  return (
    <div className="flex gap-11 pt-10">
      <div className="relative">
        <Image src={Movie} alt="Movie" width={182} height={252} />
        <div className="card_main w-full absolute inset-0 rounded-3xl">
          <p className="text-white font-normal text-md absolute bottom-4 right-0 left-0">
            Spider Man: No way home
          </p>
        </div>
      </div>
      <Image src={Movie} alt="Movie" width={200} height={290} />
      <Image src={Movie} alt="Movie" width={200} height={290} />
      <Image src={Movie} alt="Movie" width={200} height={290} />
    </div>
  );
};

export default MovieCard;
