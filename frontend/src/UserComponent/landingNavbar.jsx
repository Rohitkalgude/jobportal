import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";


const LandingNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const [active, setActive] = useState('');
    const [ setJob] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

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

    return (
        <nav className="sticky top-0 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 -ml-10">
                        <img
                            className="h-14"
                            src="/Logo.png"></img>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center justify-center flex-1">
                        <div className="flex space-x-40 mr-10">
                            <div
                                onClick={() => {
                                    navigate("/alljobs")
                                    setActive('job')
                                    setJob(true)
                                    
                                }}
                                className={`font-semibold cursor-pointer hover:text-blue-600 ${active === 'job' ? 'text-blue-600' : 'text-gray-700'}`}>
                                <a>Job</a>
                            </div>
                            <a
                                onClick={() => {
                                    setActive('company')
                                    navigate("/CompanyData")
                                    
                                }}
                                className={`hover:text-blue-600 font-semibold cursor-pointer ${active === 'company' ? 'text-blue-600' : 'text-gray-700'}`}>
                                Company
                            </a>
                            <a
                                onClick={() => {
                                    setActive('aboutUs')
                                    navigate("/user/aboutus")
                                }}
                                className={`hover:text-blue-600 font-semibold cursor-pointer ${active === 'aboutUs' ? 'text-blue-600' : 'text-gray-700'}`}>
                                About Us
                            </a>
                        </div>
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
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                For Employer
                            </button>
                            <div className="relative">

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg">
                                        <ul className="py-2">
                                            <li
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                onClick={() => navigate("/employerLogin")}
                                            >
                                                Login
                                            </li>
                                            <li
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                onClick={() => navigate("/employerRegistration")}
                                            >
                                                Register
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
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
                        <a 
                        href="#" 
                        onClick={() => navigate("/user/job")}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Job</a>
                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Company</a>
                        <a href="#" 
                        onClick={() => navigate("/user/aboutus")}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">About Us</a>
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

export default LandingNavbar;

