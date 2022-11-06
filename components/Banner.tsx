import { useEffect, useState } from "react";
import { Movie } from "../typings";
import Image from "next/image";
import { baseUrl } from "../constants/movie";

interface Props {
  netflixOriginals: Movie[];
}

function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);
  useEffect(() => {
    const getMovie =
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)];
    setMovie(getMovie);
  }, []);

  return (
    <div className="flex flex-col space-y-2 md:space-x-4 py-16 lg:justify-end lg:pb-10 lg:h-[65vh]" >
      <div className="absolute top-0 -z-10 left-0 right-0 h-[95vh] w-screen">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          alt=""
          objectFit="cover"
          layout="fill"
        />
      </div>
      <h1 className="text-2xl md:text-4xl lg:text-7xl font-bold">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs md:text-lg lg:text-2xl lg:max-w-2xl md:max-w-lg">
        {movie?.overview}
      </p>
    </div>
  );
}

export default Banner;
