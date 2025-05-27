import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { EmployerContext } from "../Context/EmployerContextProvider";

const JobDescriptionEditor = () => {
    const { candidateReuirements, updateCandidateRequirements } = useContext(EmployerContext);
    const JobDescription = candidateReuirements

    const updateCandidateRequirement = (field, value) => {
        updateCandidateRequirements(field, value)
    }

    return (
        <div className="max-w-3xl mt-6">
            <label className="text-lg font-semibold">Job Description</label>
            <p className="text-sm text-gray-500">
                Describe the responsibilities of this job and other specific requirements here.
            </p>

            {/* Rich Text Editor */}
            <div className="mt-2">
                <ReactQuill
                    // value={JobDescription}
                    onChange={(value) => updateCandidateRequirement("JobDescription", value)}
                    modules={{
                        toolbar: [
                            ["bold", "italic", "underline"], // Bold, Italic, Underline
                            [{ list: "ordered" }, { list: "bullet" }], // Numbering, Bullets
                        ],
                    }}
                    placeholder="Enter the job description, including the main responsibilities and tasks..."
                    className="bg-white h-36"
                />
            </div>
        </div>
    );
};

export default JobDescriptionEditor;
