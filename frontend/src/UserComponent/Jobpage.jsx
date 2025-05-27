import { useState } from "react";
import JobCard from "./JobCard";
import Filter from "./Filter";
import JobList from "./JobList";

const JobBoard = () => {
    const [filters, setFilters] = useState({
        workMode: [],
        salary: [],
        education: [],
        experience: 0,
    });

    return (
        <div className="flex gap-6 p-6">
            <Filter filters={filters} setFilters={setFilters} />
            <JobCard filters={filters} />
            <JobList/>
        </div>
    );
};

export default JobBoard;
