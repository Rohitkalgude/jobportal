import {useState} from "react";
import UserContext from "./userContext";

export const UserProvider = ({children}) => {
    const [qualification, setQualification] = useState(null);
    const [isUniversity, setIsUniversity] = useState(true);
    const [selectedJob, setSelectedJob] = useState(null);
    const [imageURL, setImageURL] = useState("")

    return (
        <UserContext.Provider value={{qualification, setQualification, isUniversity, setIsUniversity, selectedJob, setSelectedJob, imageURL, setImageURL}}>
            {children}
        </UserContext.Provider>
    )
}