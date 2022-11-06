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
        <ul className="hidden md:flex space-x-4" >
          <li className="headerLink" >Home</li>
          <li className="headerLink" >Tv Shows</li>
          <li className="headerLink" >Movies</li>
          <li className="headerLink" >New & Popular</li>
          <li className="headerLink" >My list</li>
        </ul>
      </div>

      {/* Right side of navbar */}
      <div></div>
    </header>
  );
}

export default Header;
