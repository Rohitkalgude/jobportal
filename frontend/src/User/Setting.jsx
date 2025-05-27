import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function Setting() {

    const navigate = useNavigate();
    const [active, setActive] = useState('account');

    const handleClick = (item) => {
        setActive(item);
        navigate(item);
    };

    // useEffect(() => {
    //     handleClick('account')
    //     console.log("Done")
    // }, <Outlet />)
    return (
        <>
            <div className="pt-20 bg-gradient-to-r from-blue-100 to-purple-100">

            </div>
            <div className="relative flex justify-center w-full h-screen bg-gray-100">
                <div className="absolute  w-3/5 -top-16">
                    <p className="mx-2 my-1 text-2xl font-semibold">Settings</p>
                    <div className="h-20 border border-gray-300 bg-white rounded-lg">
                        <div className="flex items-center h-full px-10">
                            <div className="text-gray-500">
                                Lets you easily control the communication you receive through our application, change
                                your associated email or mobile number, deactivate your account and
                                manage the job recommendations by specifying your desired career profile.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex h-3/5 w-3/5 mt-20 justify-center">
                    <div className="flex w-full">
                        {/* sidebar */}
                        <div className="h-fit w-1/3 rounded-xl border border-gray-400 shadow-lg shadow-gray-400 bg-white">
                            <div
                                onClick={() => handleClick('account')}
                                className={`pt-4 pb-4 pl-10 cursor-pointer rounded-t-xl ${active === 'account' ? 'bg-blue-500 text-white' : 'bg-white text-gray-400'}  text-gray-600`}>
                                <p>Account</p>
                            </div>
                            <div
                                onClick={() => handleClick('preference')}
                                className={`pt-4 pb-4 mt-2 pl-10 cursor-pointer ${active === 'preference' ? 'bg-blue-500 text-white' : 'bg-white text-gray-400'}  text-gray-600`}>
                                <p>Job Preferences</p>
                            </div>
                            <div
                                onClick={() => handleClick('blockCompany')}
                                className={`pt-4 pb-4 mt-2 pl-10 cursor-pointer rounded-b-xl ${active === 'blockCompany' ? 'bg-blue-500 text-white' : 'bg-white text-gray-400'}  text-gray-600`}>
                                <p>Block Companies</p>
                            </div>
                        </div>

                        {/* setting menu */}
                        <div className="w-full h-fit ml-10 rounded-xl shadow-lg shadow-gray-400 bg-blue-100">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Setting