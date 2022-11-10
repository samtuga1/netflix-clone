import { useEffect, useState } from "react";
import { Movie } from "../typings";
import Image from "next/image";
import { baseUrl } from "../constants/movie";
import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/solid";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";

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
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);


  return (
    <div className="flex flex-col space-y-2 md:space-x-4 py-16 lg:justify-end lg:pb-10 lg:h-[65vh]">
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
      <p className=" line-clamp-5 max-w-xs text-xs text-shadow-md md:text-lg lg:text-2xl lg:max-w-2xl md:max-w-lg">
        {movie?.overview}
      </p>
      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" /> Play
        </button>
        <button className="bannerButton bg-[gray]/70" onClick={() => {
          setCurrentMovie(movie);
          setShowModal(true);
        }}>
          More Info <InformationCircleIcon className="h-5 w-5 md:h-5 md:w-5" />{" "}
        </button>
      </div>
    </div>
  );
}

export default Banner;
