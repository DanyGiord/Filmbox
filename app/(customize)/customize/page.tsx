import CustomizeProfile from "./_components/customize-profile";

const CustomizePage = () => {
  return (
<<<<<<< HEAD
    <CustomizeProfile />
=======
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
>>>>>>> 19b4c1b337b69987fd70165f08d537f955209e00
  );
};

export default CustomizePage;
