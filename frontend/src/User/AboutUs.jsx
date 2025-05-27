import { FaUsers, FaBriefcase, FaGlobe } from 'react-icons/fa';

const AboutUs = () => {

    return (
        <>
            <div className="fixed w-full     bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen text-gray-900">
                <div className="container mx-auto py-16 px-6">
                    <h1 className="text-4xl font-bold text-center mb-12  underline">About Us</h1>
                    <p className="text-center text-lg mb-10 max-w-3xl mx-auto">
                        Welcome to JobPortal, your trusted platform to find your dream job and connect with top companies around the globe. Our mission is to bridge the gap between job seekers and employers by providing a seamless, efficient, and user-friendly job searching experience.
                    </p>
                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-[1.02] duration-300">
                            <FaUsers className="text-6xl mx-auto mb-4 text-blue-700" />
                            <h2 className="text-2xl font-semibold mb-4 text-blue-900">Our Community</h2>
                            <p className="text-gray-700">
                                We are proud to have a diverse and growing community of job seekers and employers, working together to create better career opportunities.
                            </p>
                        </div>
                        <div className="text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-[1.02] duration-300">
                            <FaBriefcase className="text-6xl mx-auto mb-4 text-blue-700" />
                            <h2 className="text-2xl font-semibold mb-4 text-blue-900">Our Services</h2>
                            <p className="text-gray-700">
                                From job postings to career counseling, we offer a range of services to help you find the perfect job or the ideal candidate.
                            </p>
                        </div>
                        <div className="text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-[1.02] duration-300">
                            <FaGlobe className="text-6xl mx-auto mb-4 text-blue-700" />
                            <h2 className="text-2xl font-semibold mb-4 text-blue-900">Our Vision</h2>
                            <p className="text-gray-700">
                                Our vision is to create a world where everyone has access to meaningful employment opportunities, regardless of location or background.
                            </p>
                        </div>
                    </div>
                    <div className="text-center mt-16">
                        <h3 className="text-xl font-medium text-blue-900">Join Us in Shaping the Future of Work</h3>
                        <p className="mt-4 text-gray-700">
                            Whether you're looking for your next career move or your next great hire, JobPortal is here to help.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUs;