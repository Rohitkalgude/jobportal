import { Outlet } from "react-router-dom";
// import { IoMdArrowRoundBack } from "react-icons/io";

const JobPost = () => {
    
    return (
        <>
            <div className="fixed w-screen h-screen overflow-y-scroll max-h-[calc(100vh)] pb-20 bg-gradient-to-r from-blue-100 to-purple-100">
                <Outlet />
            </div>
        </>
    )

}

export default JobPost;