import {
  PlusIcon,
  VolumeOffIcon,
  VolumeUpIcon,
  XIcon,
} from "@heroicons/react/solid";
import MuiModal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import { Element, Genre } from "../typings";
import ReactPlayer from "react-player/lazy";
import { FaPlay } from "react-icons/fa";
import { ThumbUpIcon } from "@heroicons/react/outline";

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState();
  const [genre, setGenre] = useState<Genre[]>([]);
  const [muted, setMuted] = useState<boolean>(false);

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenre(data.genres);
      }
    }
    fetchMovie();
  }, [movie]);

  return (
    <MuiModal
      className="fixed rounded-md !top-7 left-0 right-0 z-50 mx-auto max-w-3xl w-full overflow-hidden overflow-y-scroll scrollbar-hide"
      open={showModal}
      onClose={handleClose}
    >
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 bg-[#181818] !z-40 h-9 w-9 border-none hover:bg-[#181818]"
        >
          <XIcon className="h-6 w-6" />
        </button>
        <div className="pt-[56.25%] relative">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded px-8 text-xl font-bold text-black bg-white transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-7 w-7 text-black" />
                Play
              </button>
              <button className="modalButton">
                <PlusIcon className="h-7 w-7" />
              </button>
              <button className="modalButton">
                <ThumbUpIcon className="h-7 w-7" />
              </button>
            </div>
            <button
              className="modalButton"
              onClick={() => {
                setMuted(!muted);
              }}
            >
              {muted ? (
                <VolumeOffIcon className="h-6 w-6" />
              ) : (
                <VolumeUpIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8" >
          <div className="text-lg space-y-6" >
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie!.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex border items-center justify-center h-4 rounded border-white/40 text-xs px-1.5">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row" >
              <p className="w-5/6">{movie?.overview}</p>
              <div>
                <div className="gap-x-2 text-sm space-y-3" >
                  <span className="text-[grey]" >Genre: </span>
                  {genre
                    .map((gen) => {
                     return gen.name;
                    })
                    .join(", ")}
                </div>
                <div className="flex gap-x-2 text-sm space-y-3" >
                  <span className="text-[grey]" >Original Language:</span>
                  {movie?.original_language}
                </div>
                <div className="flex gap-x-2 text-sm space-y-3" >
                  <span className="text-[grey]" >Total Votes:</span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
}

export default Modal;
