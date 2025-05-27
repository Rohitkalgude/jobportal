import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";


const jobListings = [
    { id: 1, title: "MERN Stack Developer", skills: ["MERN", "React", "Node.js"] },
    { id: 2, title: "Java Developer", skills: ["Java", "Spring Boot"] },
    { id: 3, title: "Full Stack Developer", skills: ["Fullstack", "React", "Node.js", "MongoDB"] },
    { id: 4, title: "Node.js Developer", skills: ["Node.js", "Express", "MongoDB"] },
    { id: 5, title: "Frontend Developer", skills: ["React", "JavaScript", "CSS"] },
];


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();


    const handleEmployerRegistration = () => {
        navigate("employerRegistration")
    }

    const handleEmployerLogin = () => {
        navigate("employer/login")
    }

    const handleUserLogInRoute = () => {
        navigate("userLogin")
    }

    const handleUserRegisterRoute = () => {
        navigate("/userRegistration")
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement search functionality
        console.log('Searching for:', searchQuery);
    };



    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.length > 0) {
            const results = jobListings.filter(job =>
                job.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
            );
            setFilteredJobs(results);
        } else {
            setFilteredJobs([]);
        }
    };


    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <span className="text-xl font-bold">Logo</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center justify-center flex-1">
                        <div className="flex space-x-4 mr-10">
                            <a className="text-gray-700 hover:text-blue-600 font-semibold cursor-pointer ">Job</a>
                            <a className="text-gray-700 hover:text-blue-600 font-semibold cursor-pointer ">Company</a>
                            <a className="text-gray-700 hover:text-blue-600 font-semibold cursor-pointer ">About Us</a>
                        </div>
                        {/* Search Bar */}
                        {/* <form onSubmit={handleSearchSubmit} className="ml-4 flex-1 max-w-md">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search..."
                                    className="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
                                >
                                    <CiSearch className="w-5 h-5" />
                                </button>
                            </div>
                        </form> */}
                    </div>

                    {/* Login and Register Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            onClick={handleUserLogInRoute}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                            Login
                        </button>
                        <button
                            onClick={handleUserRegisterRoute}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Register
                        </button>
                        <p className='h-12 w-px bg-gray-400'></p>
                        <div>
                            <button
                                onClick={() => navigate("/employer/main")}
                                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                For Employer
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            {isMenuOpen ? (
                                <IoClose className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <TiThMenu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Job</a>
                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Company</a>
                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">About Us</a>
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        <div className="px-2 space-y-1">
                            <button className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                                Login
                            </button>
                            <button className="block w-full px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700">
                                Register
                            </button>
                        </div>
                        {/* Mobile Search Bar */}
                        <form onSubmit={handleSearchSubmit} className="px-2 mt-3">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search..."
                                    className="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
                                >
                                    <CiSearch className="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;


