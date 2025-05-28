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





// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { CiSearch } from "react-icons/ci";
// import { TiThMenu } from "react-icons/ti";
// import { IoClose } from "react-icons/io5";

// const LandingNavbar = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const [active, setActive] = useState('');
//     const navigate = useNavigate();

//     const handleSearchSubmit = (e) => {
//         e.preventDefault();
//         console.log('Searching:', searchQuery);
//     };

//     return (
//         <nav className="sticky top-0 z-50 bg-white shadow-sm border-b">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex items-center justify-between h-16">
//                     {/* Logo */}
//                     <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
//                         <img src="/Logo.png" alt="Logo" className="h-10 w-auto" />
//                     </div>

//                     {/* Search Bar - Desktop Only */}
//                     <form
//                         onSubmit={handleSearchSubmit}
//                         className="hidden md:flex items-center flex-1 max-w-md mx-6"
//                     >
//                         <div className="relative w-full">
//                             <input
//                                 type="text"
//                                 placeholder="Search jobs, companies..."
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 className="w-full border border-gray-300 rounded-full px-4 py-2 pr-10 text-sm focus:outline-none focus:border-blue-500"
//                             />
//                             <button
//                                 type="submit"
//                                 className="absolute right-3 top-2.5 text-gray-600 hover:text-blue-600"
//                             >
//                                 <CiSearch className="h-5 w-5" />
//                             </button>
//                         </div>
//                     </form>

//                     {/* Desktop Nav Items */}
//                     <div className="hidden md:flex items-center space-x-6">
//                         {[
//                             { label: 'Jobs', path: '/alljobs', key: 'job' },
//                             { label: 'Companies', path: '/CompanyData', key: 'company' },
//                             { label: 'About Us', path: '/user/aboutus', key: 'aboutUs' },
//                         ].map(item => (
//                             <span
//                                 key={item.key}
//                                 onClick={() => {
//                                     setActive(item.key);
//                                     navigate(item.path);
//                                 }}
//                                 className={`text-sm font-medium cursor-pointer transition duration-200 ${active === item.key ? 'text-blue-600' : 'text-gray-700 hover:text-blue-500'}`}>
//                                 {item.label}
//                             </span>
//                         ))}

//                         {/* For Employer */}
//                         <div className="relative">
//                             <button
//                                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                                 className="text-sm font-medium text-gray-700 hover:text-blue-600"
//                             >
//                                 For Employers
//                             </button>
//                             {dropdownOpen && (
//                                 <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-md border z-20">
//                                     <ul>
//                                         <li
//                                             onClick={() => navigate('/employerLogin')}
//                                             className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
//                                         >
//                                             Employer Login
//                                         </li>
//                                         <li
//                                             onClick={() => navigate('/employerRegistration')}
//                                             className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
//                                         >
//                                             Employer Register
//                                         </li>
//                                     </ul>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Auth Buttons */}
//                         <button
//                             onClick={() => navigate('/userLogin')}
//                             className="text-sm text-gray-600 hover:text-blue-600"
//                         >
//                             Login
//                         </button>
//                         <button
//                             onClick={() => navigate('/userRegistration')}
//                             className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition"
//                         >
//                             Register
//                         </button>
//                     </div>

//                     {/* Mobile Menu Button */}
//                     <div className="md:hidden">
//                         <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
//                             {isMenuOpen ? (
//                                 <IoClose className="text-2xl text-gray-700" />
//                             ) : (
//                                 <TiThMenu className="text-2xl text-gray-700" />
//                             )}
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Mobile Menu */}
//             {isMenuOpen && (
//                 <div className="md:hidden bg-white border-t">
//                     <div className="flex flex-col p-4 space-y-2">
//                         <form onSubmit={handleSearchSubmit}>
//                             <div className="relative mb-3">
//                                 <input
//                                     type="text"
//                                     placeholder="Search jobs, companies..."
//                                     value={searchQuery}
//                                     onChange={(e) => setSearchQuery(e.target.value)}
//                                     className="w-full border border-gray-300 rounded-full px-4 py-2 pr-10 text-sm focus:outline-none focus:border-blue-500"
//                                 />
//                                 <button type="submit" className="absolute right-3 top-2.5 text-gray-600 hover:text-blue-600">
//                                     <CiSearch className="h-5 w-5" />
//                                 </button>
//                             </div>
//                         </form>

//                         {[
//                             { label: 'Jobs', path: '/alljobs' },
//                             { label: 'Companies', path: '/CompanyData' },
//                             { label: 'About Us', path: '/user/aboutus' },
//                         ].map((item, index) => (
//                             <button
//                                 key={index}
//                                 onClick={() => navigate(item.path)}
//                                 className="text-left text-gray-700 hover:text-blue-600"
//                             >
//                                 {item.label}
//                             </button>
//                         ))}

//                         {/* For Employer */}
//                         <div>
//                             <button
//                                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                                 className="text-left text-gray-700 hover:text-blue-600"
//                             >
//                                 For Employers
//                             </button>
//                             {dropdownOpen && (
//                                 <div className="mt-2 border rounded-md">
//                                     <button
//                                         onClick={() => navigate('/employerLogin')}
//                                         className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                                     >
//                                         Employer Login
//                                     </button>
//                                     <button
//                                         onClick={() => navigate('/employerRegistration')}
//                                         className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                                     >
//                                         Employer Register
//                                     </button>
//                                 </div>
//                             )}
//                         </div>

//                         <button
//                             onClick={() => navigate('/userLogin')}
//                             className="text-left text-gray-700 hover:text-blue-600 mt-2"
//                         >
//                             Login
//                         </button>
//                         <button
//                             onClick={() => navigate('/userRegistration')}
//                             className="bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 mt-2"
//                         >
//                             Register
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </nav>
//     );
// };

// export default LandingNavbar;
