import { Movie } from "../typings";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import Thumbnail from "./Thumbnail";
import { useRef, useState } from "react";

interface Props {
  title: string;
  // movie: Movie | DocumentData[]
  movies: Movie[];
}

function Row({ title, movies }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const handleClick = (direction: string) => {
    setIsScrolled(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
        rowRef.current.scrollTo({left: scrollTo, behavior: 'smooth'})
    }
  };
  return (
    <div className="h-40 space-x-0.5 md:space-x-2">
      <h1 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h1>
      <div className="group relative md:ml-2">
        <ChevronLeftIcon
          onClick={() => {
            handleClick("left");
          }}
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto cursor-pointer opacity-0 h-9 w-9 transition hover:scale-125 group-hover:opacity-100 ${!isScrolled && 'hidden'}`}
        />
        <div
          ref={rowRef}
          className="flex overflow-x-scroll scrollbar-hide items-center space-x-0.5 md:space-x-2.5 md:p-2 "
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <ChevronRightIcon
          onClick={() => {
            handleClick("right");
          }}
          className="absolute top-0 bottom-0 right-2 z-40 m-auto cursor-pointer opacity-0 h-9 w-9 transition hover:scale-125 group-hover:opacity-100 "
        />
      </div>
    </div>
  );
}

export default Row;
