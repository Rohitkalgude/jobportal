import React from "react";

const SchoolDetail = () => {
    const year_list = ['1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985',
        '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998',
        '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011',
        '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024',
        '2025']

    const medium_list = [
        "English",
        "Hindi",
        "Gujarati",
        "Marathi",
        "Tamil",
        "Telugu",
        "Kannada",
        "Malayalam",
        "Bengali",
        "Punjabi",
        "Odia",
        "Assamese",
        "Urdu"
    ];

    return (
        <>
            <div className="relative">

                <div className="mt-6 mx-12">
                    <label class="block text-sm font-medium text-gray-700">
                        Board
                        <span class="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Board"
                        className="mt-1 block w-full px-5 h-11 text-base bg-white border border-gray-500 focus:outline-none focus:border-blue-500 sm:text-sm rounded-xl" />
                </div>

                <div className="relative mt-6 mx-12">
                    <label
                        for="education"
                        class="block text-sm font-medium text-gray-700">Passing Year
                        <span class="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <select
                            id="education"
                            name="education"
                            class="mt-1 overflow-y-scroll z-10 block w-full h-11 px-5 text-base bg-white border border-gray-500 focus:border-blue-500 sm:text-sm rounded-xl">
                            <option disabled selected>
                                Select Year
                            </option>
                            {year_list.map(year => (
                                <option key={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="relative mt-6 mx-12">
                    <label
                        for="education"
                        class="block text-sm font-medium text-gray-700">School medium
                        <span class="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <select
                            id="education"
                            name="education"
                            class="mt-1 overflow-y-scroll z-10 block w-full h-11 px-5 text-base bg-white border border-gray-500 focus:border-blue-500 sm:text-sm rounded-xl">
                            <option disabled selected>
                                Select medium
                            </option>
                            {medium_list.map(medium => (
                                <option key={medium}>{medium}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-6 mx-12">
                    <label class="block text-sm font-medium text-gray-700">
                        Marks
                        <span class="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="% marks 100 maximum"
                        className="mt-1 block w-full px-5 h-11 text-base bg-white border border-gray-500 focus:outline-none focus:border-blue-500 sm:text-sm rounded-xl" />
                </div>

                <div className="mt-6 mx-12">
                    <label class="block text-sm font-medium text-gray-700">
                        English Marks
                        <span class="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Marsk (out of 100)"
                        className="mt-1 block w-full px-5 h-11 text-base bg-white border border-gray-500 focus:outline-none focus:border-blue-500 sm:text-sm rounded-xl" />
                </div>

                <div className="mt-6 mx-12">
                    <label class="block text-sm font-medium text-gray-700">
                        Math Marks
                        <span class="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Marsk (out of 100)"
                        className="mt-1 block w-full px-5 h-11 text-base bg-white border border-gray-500 focus:outline-none focus:border-blue-500 sm:text-sm rounded-xl" />
                </div>
            </div>

        </>
    )
}

export default SchoolDetail;