import MovieCard from "@/components/cards/MovieCard";
import { Input } from "@/components/ui/input";
import * as Icons from "@/public/assets/icons/Icons";
import { UserButton } from "@clerk/nextjs";

const CustomizePage = () => {
  return (
    <div className="bg-black_main w-full h-screen">
      <UserButton afterSignOutUrl="/sign-in"/>
      <div className="flex flex-col justify-center items-center text-center pt-10">
        <h1 className="text-white text-4xl font-bold">
          Select your favorite movies
        </h1>
        <p className="text-gray text-lg mt-4">Choose 3 favorite movies</p>
        <div className="w-80 mt-4">
          <Input placeholder="Find a movie" iconSrc={Icons.Search} />
        </div>
        <div className="w-2/4">
          <MovieCard />
        </div>
        {/* ovde ide component movie cards */}
      </div>
    </div>
  );
};

export default CustomizePage;
