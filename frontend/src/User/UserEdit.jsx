import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserEdit() {
    const navigate = useNavigate();
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [userDetail, setUserDetail] = useState('');

    const handleUserChnage = () => {
        navigate('/user/setting/account');
    }

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    }

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    }

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-75 transition-opacity" />
                <section className="relative flex flex-col py-6 bg-white shadow-xl overflow-y-scroll max-w-lg w-full h-auto rounded-lg">
                    <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-2xl font-semibold">Basic details</p>
                            </div>
                            <button
                                onClick={() => navigate("/user/profile")}
                                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <span className="sr-only">Close panel</span>
                                <IoClose className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                    <div className="mt-6 relative flex-1 px-4 sm:px-6 items-center">
                        <div className="px-4">
                            <p className="font-medium ml-2 text-lg">Name</p>
                            <input
                                className="h-10 px-3 w-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-xl"
                                type="text"
                                placeholder="User name" />
                        </div>

                        <div className="flex justify-center mt-3 px-4">
                            <div className="my-2 w-full h-px bg-gray-400"></div>
                        </div>

                        <div className="mt-2 px-4">
                            <p className="font-medium ml-2 text-lg">Work status</p>
                            <p className="ml-2 mt-1 text-sm font-light text-gray-600">We will personalise your Naukri experience based on this</p>
                            <div className='flex mx-2 mt-1'>
                                <label className='block font-normal text-lg mr-12'>
                                    <input
                                        type="radio"
                                        name="workStatus"
                                        value="fresher"
                                        checked={selectedStatus === 'fresher'}
                                        onChange={handleStatusChange}
                                        className='mr-3' />
                                    Fresher
                                </label>
                                <label className='block font-normal text-lg'>
                                    <input
                                        type="radio"
                                        name="workStatus"
                                        value="experienced"
                                        checked={selectedStatus === 'experienced'}
                                        onChange={handleStatusChange}
                                        className='mr-3' />
                                    Experienced
                                </label>
                            </div>
                        </div>

                        <div className="mt-8 px-4">
                            <p className="font-medium ml-2 text-lg">Current location</p>
                            <p className="ml-2 mt-1 text-sm font-light text-gray-600">This helps us match you to relevant jobs</p>
                            <div className='flex mx-2 mt-1'>
                                <label className='block font-normal text-lg mr-12'>
                                    <input
                                        type="radio"
                                        name="workStatus"
                                        value="india"
                                        checked={selectedLocation === 'india'}
                                        onChange={handleLocationChange}
                                        className='mr-3' />
                                    India
                                </label>
                                <label className='block font-normal text-lg'>
                                    <input
                                        type="radio"
                                        name="workStatus"
                                        value="other"
                                        checked={selectedLocation === 'other'}
                                        onChange={handleLocationChange}
                                        className='mr-3' />
                                    Outside India
                                </label>
                            </div>

                            <input
                                className="h-10 w-1/2 mt-2 ml-2 px-3 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-xl"
                                type="text"
                                placeholder="City" />
                        </div>

                        <div className="flex justify-center mt-3 px-4">
                            <div className="my-2 w-full h-px bg-gray-400"></div>
                        </div>

                        <div className="px-4">
                            <p className="font-medium ml-2 text-lg">Mobile No</p>
                            <p className="ml-2 mt-1 text-sm font-light text-gray-600">Recruiters will contact you on this number</p>
                            <div className="flex">
                                <p className="ml-2 text-gray-500 font-normal text-sm">7984486136</p>
                                <button className="ml-2 text-blue-600 font-medium text-sm cursor-pointer" onClick={handleUserChnage}>Change mobile number</button>
                            </div>
                        </div>

                        <div className="px-4 mt-6">
                            <p className="font-medium ml-2 text-lg">Email address</p>
                            <p className="ml-2 mt-1 text-sm font-light text-gray-600">We will send relevant jobs and updates to this email</p>
                            <div className="flex">
                                <p className="ml-2 text-gray-500 font-normal text-sm">premshah809@gmail.com</p>
                                <button className="ml-2 text-blue-600 font-medium text-sm cursor-pointer" onClick={handleUserChnage}>Change Email</button>
                            </div>
                        </div>

                    </div>
                    <div className="flex justify-end px-8 mt-8">
                        <div>
                            <button
                                onClick={() => navigate("/user/profile")}
                                className="mx-6 py-1 hover:text-red-600">Cancel</button>
                        </div>
                        <div>
                            <button
                                onClick={() => navigate("/user/profile")}
                                className="bg-blue-500 rounded-2xl text-white px-5 py-1 hover:bg-blue-600">Save</button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default UserEdit;