import { SearchIcon } from "@heroicons/react/outline";
import { BellIcon } from "@heroicons/react/outline";
import Link from "next/link";

function Header() {
  return (
    <header>
      {/* Left side of nav bar */}
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <ul className="hidden md:flex space-x-4">
          <li className="headerLink" >Home</li>
          <li className="headerLink" >Tv Shows</li>
          <li className="headerLink" >Movies</li>
          <li className="headerLink" >New & Popular</li>
          <li className="headerLink" >My list</li>
        </ul>
      </div>

      {/* Right side of navbar */}
      <div className="font-light text-sm flex space-x-4" >
        <SearchIcon className="hidden sm:inline h-6 w-6" />
        <p className="hidden lg:inline" >Kids</p>
        <BellIcon className="h-6 w-6"/>
        <Link href='/account'>
        <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
