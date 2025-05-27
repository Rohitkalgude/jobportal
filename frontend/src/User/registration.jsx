import { GoDotFill } from "react-icons/go";
import RegistrationForm from "../UserComponent/RegistrationForm";

function Registration() {

  let quotes = [
    "Build your profile and let recruiters find you",
    "Get job postings delivered right to your email",
    "Find your job and grow your career",
  ];


  return (
    <>
      <div className="max-sm:h-full sm:h-full md:h-full lg:h-screen overflow-y-scroll bg-gradient-to-r from-blue-100 to-purple-100">

        <div className="md:flex lg:flex px-20 ml-10">
          {/* Card */}
          {/* <div className="h-fit w-2/3 sm:w-2/3 md:w-1/3 lg:w-72 bg-white mt-16 mx-auto sm:mx-auto md:mx-28 lg:mx-44 ml-10 rounded-lg border-gray-200 border-2 shadow-lg shadow-gray-600">
            <div className="flex justify-center p-2 bg-gradient-to-t from-ebg to-purple-700">
              <img src="/Untitled.png" className="h-32 sm:h-48 md:h-36 lg:h-40" alt="Profile Image" />
            </div>
            <p className="text-lg sm:text-lg lg:text-xl text-center font-semibold mt-2">On Registration, you can</p>
            <div className="ml-4 mr-2">
              <ul className="mt-3">
                {quotes.map((quote, index) => (
                  <li key={index} className="text-sm sm:text-base lg:text-lg font-light">
                    <GoDotFill className="inline text-black" /> {quote}
                  </li>
                ))}
              </ul>
            </div>
          </div> */}

          {/* Registration Form */}
          <RegistrationForm />
        </div>
      </div>
    </>
  );
}

export default Registration;
