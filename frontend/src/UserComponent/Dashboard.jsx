import React, { useState } from "react";

// import "./App.css";
import JobSearchBox from "./searchBox";

function DashBoard() {

    return (
        <>
            <div className="fixed w-full">
                <div className="relative">
                    <div className="absolute image-container lg:w-2/3 md:w-full ml-16 sm:ml-20 md:ml-20 lg:ml-20 mt-2 ">
                        <img src="/4158641.png" className="w-4/5 h-auto" />
                    </div>
                    <div className="absolute w-2/5 right-0 bg-gradient-to-br from-blue-900 via-blue-500 to-sky-300 max-h-screen h-fit py-10 sm:py-12 md:py-16 lg:py-20 lg:px-5 lg:mr-16 lg:mt-56 text-center rounded-xl">
                        <p className="font-bold text-2xl sm:text-3xl md:text-5xl text-white">Find your dream job Now,</p>
                        <p className="my-4 font-medium text-lg sm:text-xl text-white">throughout all over the world</p>
                        <JobSearchBox />
                    </div>
                </div>
            </div>
        </>

    )
}

export default DashBoard;