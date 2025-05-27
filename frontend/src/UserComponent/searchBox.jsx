import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function JobSearchBox() {
  const [designation, setDesignation] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', { designation, city });
  };

  return (
    <div className="flex w-full flex-col mt-10 justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white w-4/5 p-6 rounded-xl shadow-md max-w-2xl">
        <h2 className="text-2xl text-blue-700 font-bold">Search for a job</h2>
        <div className='h-px w-7/12 bg-blue-400 mt-1 mb-6 mx-auto'></div>
        <div className="flex justify-center">
          <div>
            <label 
            htmlFor="designation" 
            className="block text-lg font-bold">
              Job Designation
            </label>
            <input
              type="text"
              id="designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="mt-1 py-3 px-4 w-full border-2 font-semibold bg-white border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter job designation"
              required
            />
          </div>
          <div className='w-px h-20 mx-5 bg-gray-600'></div>
          <div>
            <label 
            htmlFor="city" 
            className="block text-lg font-bold">
              Job City
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 py-3 px-4 w-full border-2 font-semibold bg-white border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Enter job city"
              required
            />
          </div>
        </div>
        <div className="flex w-full justify-between items-center mt-8 px-4">
          <button
            type="submit"
            onClick={() => navigate("/user/job")}
            className="w-4/5 mx-auto font-semibold px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-900 transition duration-200"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default JobSearchBox;
