// import Link from "next/link"
// import Image from "next/image"
// import { button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
import { FaBriefcase, FaBuilding, FaAward, FaChartLine, FaStar, FaSearch } from "react-icons/fa"
import LandingNavbar from "./UserComponent/landingNavbar"
import { useNavigate } from "react-router-dom"

export default function JobPortalLanding() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-sky-50 to-white">
            {/* Header */}
            {/* <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-sm"> */}
                <LandingNavbar />
            {/* </header> */}

            {/* Hero Section */}
            <section className="w-full px-20 py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                    Your Dream Career Is Just One Click Away
                                </h1>
                                <p className="max-w-[600px] text-white/80 md:text-xl">
                                    Connect with thousands of employers and find the perfect job that matches your skills, experience, and
                                    aspirations.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <div className="relative w-full max-w-sm">
                                    <FaSearch className="absolute left-2.5 top-3.5 h-4 w-4 text-blue-900/50" />
                                    <input
                                        type="search"
                                        placeholder="Search jobs, keywords, companies..."
                                        className="w-full h-11 bg-white pl-9 text-blue-900 border-0 focus-visible:ring-2 focus-visible:ring-blue-400"
                                    />
                                </div>
                                <button onClick={() => navigate("/alljobs")} className="bg-white text-blue-800 hover:bg-sky-600 hover:text-white px-4">Search Jobs</button>
                            </div>
                            <p className="text-sm text-white/70">Trusted by over 10,000+ job seekers and 500+ top companies</p>
                        </div>
                        <div className="flex items-center">
                            <img
                                src="/landingPoster.avif?height=400&width=400"
                                width={600}
                                height={600}
                                alt="Job seekers finding opportunities"
                                className="rounded-lg object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="flex justify-center w-full py-12 bg-white">
                <div className="container px-4 md:px-6">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <div className="flex flex-col items-center justify-center p-4 text-center">
                            <span className="text-3xl font-bold text-primary">10K+</span>
                            <span className="text-sm text-muted-foreground">Active Jobs</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 text-center">
                            <span className="text-3xl font-bold text-primary">5M+</span>
                            <span className="text-sm text-muted-foreground">Job Seekers</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 text-center">
                            <span className="text-3xl font-bold text-primary">2K+</span>
                            <span className="text-sm text-muted-foreground">Companies</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 text-center">
                            <span className="text-3xl font-bold text-primary">95%</span>
                            <span className="text-sm text-muted-foreground">Success Rate</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="flex justify-center w-full py-12 md:py-24 bg-sky-50">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-800">Why Choose Us</div>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-navy-900">
                                The Smarter Way to Find Your Next Job
                            </h2>
                            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                                Our intelligent matching system connects you with the perfect opportunities that align with your career
                                goals.
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
                        <div className="flex flex-col items-center space-y-4 rounded-lg border border-blue-100 bg-white p-6 text-center shadow-sm">
                            <div className="rounded-full bg-blue-100 p-3">
                                <FaChartLine className="h-6 w-6 text-blue-700" />
                            </div>
                            <h3 className="text-xl font-bold text-navy-900">Smart Job Matching</h3>
                            <p className="text-muted-foreground">
                                Our AI-powered algorithm matches your profile with the most relevant job opportunities.
                            </p>
                        </div>
                        <div className="flex flex-col items-center space-y-4 rounded-lg border border-blue-100 bg-white p-6 text-center shadow-sm">
                            <div className="rounded-full bg-blue-100 p-3">
                                <FaBuilding className="h-6 w-6 text-blue-700" />
                            </div>
                            <h3 className="text-xl font-bold text-navy-900">Premium Employers</h3>
                            <p className="text-muted-foreground">
                                Connect with top-tier companies looking for talented professionals like you.
                            </p>
                        </div>
                        <div className="flex flex-col items-center space-y-4 rounded-lg border border-blue-100 bg-white p-6 text-center shadow-sm">
                            <div className="rounded-full bg-blue-100 p-3">
                                <FaAward className="h-6 w-6 text-blue-700" />
                            </div>
                            <h3 className="text-xl font-bold text-navy-900">Career Growth</h3>
                            <p className="text-muted-foreground">
                                Access resources, coaching, and tools to help you advance in your professional journey.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="flex justify-center w-full py-12 md:py-24 bg-white">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-navy-900">
                                Success Stories from Our Community
                            </h2>
                            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                                Hear from job seekers who found their dream careers through our platform.
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
                        <div className="flex flex-col justify-between rounded-xl bg-sky-50 p-6 shadow-sm">
                            <div className="space-y-2">
                                <div className="flex space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className="h-5 w-5 fill-current text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground">
                                    "After months of searching, I found my dream job in just two weeks using JobMatch. The personalized
                                    recommendations were spot on!"
                                </p>
                            </div>
                            <div className="mt-6 flex items-center space-x-3">
                                <div className="h-10 w-10 rounded-full bg-blue-200" />
                                <div>
                                    <p className="text-sm font-medium">Sarah Johnson</p>
                                    <p className="text-xs text-muted-foreground">Software Engineer</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between rounded-xl bg-sky-50 p-6 shadow-sm">
                            <div className="space-y-2">
                                <div className="flex space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className="h-5 w-5 fill-current text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground">
                                    "As a hiring manager, JobMatch has transformed our recruitment process. We've found exceptional talent
                                    that perfectly fits our company culture."
                                </p>
                            </div>
                            <div className="mt-6 flex items-center space-x-3">
                                <div className="h-10 w-10 rounded-full bg-blue-200" />
                                <div>
                                    <p className="text-sm font-medium">Michael Chen</p>
                                    <p className="text-xs text-muted-foreground">HR Director</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="flex justify-center w-full py-12 md:py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                Your Path to Career Success
                            </h2>
                            <p className="max-w-[700px] text-white/80 md:text-xl/relaxed">
                                Three simple steps to find your perfect job match.
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-800 text-xl font-bold">
                                1
                            </div>
                            <h3 className="text-xl font-bold">Create Your Profile</h3>
                            <p className="text-white/80">
                                Build your professional profile highlighting your skills, experience, and career goals.
                            </p>
                        </div>
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-800 text-xl font-bold">
                                2
                            </div>
                            <h3 className="text-xl font-bold">Discover Opportunities</h3>
                            <p className="text-white/80">Browse personalized job recommendations tailored to your unique profile.</p>
                        </div>
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-800 text-xl font-bold">
                                3
                            </div>
                            <h3 className="text-xl font-bold">Apply & Connect</h3>
                            <p className="text-white/80">
                                Apply with one click and connect directly with hiring managers and recruiters.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="flex justify-center w-full py-12 md:py-24 bg-white">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-navy-900">
                                Ready to Transform Your Career Journey?
                            </h2>
                            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                                Join thousands of professionals who have already found their dream jobs.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <button 
                            onClick={() => navigate("/userRegistration")}
                            className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-6 text-lg">
                                Create Free Account
                            </button>
                            <button 
                            onClick={() => navigate("/employerRegistration")}
                             className="border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-6 text-lg">
                                For Employers
                            </button>
                        </div>
                        <p className="text-sm text-muted-foreground">No credit card required. Get started in minutes.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="flex justify-center w-full py-6 bg-navy-900 text-white">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <FaBriefcase className="h-6 w-6" />
                                <span className="text-xl font-bold">Hirebridge</span>
                            </div>
                            <p className="text-sm text-white/70">
                                Connecting talent with opportunity. Your career journey starts here.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">For Job Seekers</h3>
                            <ul className="space-y-2 text-sm text-white/70">
                                <li>
                                    <p href="#" className="hover:text-white">
                                        Browse Jobs
                                    </p>
                                </li>
                                <li>
                                    <p href="#" className="hover:text-white">
                                        Career Resources
                                    </p>
                                </li>
                                <li>
                                    <p href="#" className="hover:text-white">
                                        Resume Builder
                                    </p>
                                </li>
                                <li>
                                    <p href="#" className="hover:text-white">
                                        Salary Calculator
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">For Employers</h3>
                            <ul className="space-y-2 text-sm text-white/70">
                                <li>
                                    <p href="#" className="hover:text-white">
                                        Post a Job
                                    </p>
                                </li>
                                <li>
                                    <p href="#" className="hover:text-white">
                                        Talent Search
                                    </p>
                                </li>
                                <li>
                                    <p href="#" className="hover:text-white">
                                        Recruitment Solutions
                                    </p>
                                </li>
                                <li>
                                    <p href="#" className="hover:text-white">
                                        Pricing
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Company</h3>
                            <ul className="space-y-2 text-sm text-white/70">
                                <li>
                                    <p href="#" className="hover:text-white">
                                        About Us
                                    </p>
                                </li>
                                <li>
                                    <p href="#" className="hover:text-white">
                                        Contact
                                    </p>
                                </li>
                                <li>
                                    <p href="#" className="hover:text-white">
                                        Privacy Policy
                                    </p>
                                </li>
                                <li>
                                    <p href="#" className="hover:text-white">
                                        Terms of Service
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-white/70">
                        <p>© {new Date().getFullYear()} JobMatch. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

