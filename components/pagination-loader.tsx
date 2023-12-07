import { cn } from "@/lib/utils";

interface PaginationLoaderProps {
  paginationLoader: Boolean;
}

const circles = [1, 2, 3]

const PaginationLoader = ({ paginationLoader }: PaginationLoaderProps) => {
  return (
    <div
      className={cn(
        "opacity-0 flex flex-row transition-opacity duration-300 ease-in h-[10px] mt-3 gap-x-2.5",
        paginationLoader && 'opacity-100'
      )}
    >
      {circles.map(circle => (
        <div key={circle} className="bg-white h-[12.5px] w-[12.5px] rounded-full origin-[50%] krug"></div>
      ))}
    </div>
  );
}

export default PaginationLoader;