import { useContext } from "react";
import UserContext from "../Context/userContext";

const UniversityDetail = () => {
    const { qualification, setQualification } = useContext(UserContext);
    const course_list = ['B.Tech/B.E', 'B.Com', 'B.Sc', 'B.A', 'Diploma', 'B.Arch', 'BCA', 'LLB', 'MBBS', 
        'ITI Certification', 'Other']


    return (
        <>
            <div className="mt-6 mx-12">
                <label class="block text-sm font-medium text-gray-700">
                    University
                    <span class="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Enter University"
                    className="mt-1 block w-full h-11 px-5 text-base bg-white border border-gray-500 focus:outline-none focus:border-blue-500 sm:text-sm rounded-xl" />
            </div>

            <div className="mt-6 mx-12">
                <label
                    for="education"
                    class="block text-sm font-medium text-gray-700">Course
                    <span class="text-red-500">*</span>
                </label>
                <select
                    id="education"
                    name="education"
                    class="mt-1 block w-full h-11 px-5 text-base bg-white border border-gray-500 focus:border-blue-500 sm:text-sm rounded-xl">
                    <option disabled selected>Select course</option>
                    {course_list.map(course => (
                        <option>{course}</option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default UniversityDetail;