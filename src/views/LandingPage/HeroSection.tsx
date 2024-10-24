const HeroSection = () => {
  return (
    <section>
      <div className="lg:h-full md:h-full h-[70vh] lg:bg-transparent md:bg-transparent bg-[#11451E] flex items-center justify-center px-10 pt-5">
        <img
          src="./hero-image.svg"
          alt="background image"
          className="relative w-full  lg:block md:block hidden"
        />
        <div className="absolute inset-0 lg:block md:block hidden"></div>

        <div className="absolute text-center z-10 text-white max-w-4xl px-4 ">
          {/* Small Button at the top */}
          <div className="mb-4">
            <button className="bg-white text-green-700 font-medium py-2 px-4 rounded-full text-sm md:text-base">
              Empower Global Causes
            </button>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl md:text-3xl lg:text-6xl font-bold">
            CROWDFUNDING <span className="text-green-400">WORLDWIDE</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl mt-4 max-w-[600px] mx-auto text-center">
            Discover an easy and effective way to raise funds for personal
            initiatives, charitable projects, and friends in need.
          </p>

          {/* Search Input */}
          {/* <div className="mt-8 flex justify-center">
            <div className="flex items-center w-full max-w-lg bg-white rounded-full px-4 py-2 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <input
                type="text"
                placeholder="Search for a campaign"
                className="flex-grow px-4 py-2 outline-none text-gray-700"
              />
              <button className="bg-green-600 text-white py-2 px-4 rounded-full ml-2">
                Search
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
