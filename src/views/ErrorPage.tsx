import Error from "../assets/error.svg";

const ErrorPage = () => {
  return (
    <div>
      <div className="flex justify-center items-center h-[80vh] flex-col mb-2">
        <img src={Error} alt="" />
        <h1 className="font-bold text-3xl mt-4">Something went wrong.</h1>
        <p className="font-bold text-xl mt-2">
          Sorry, we can’t find the page you’re looking for.
        </p>
        <button className="border-2 border-[#28A745] px-10 py-4 mt-4 bg-[#28A745] text-[#ffff] rounded-2xl">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
