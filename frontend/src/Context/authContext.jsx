    import { createContext, useState } from "react";
    import axios from "axios";

    export const AuthContext = createContext();

    export const AuthProvider = ({ children }) => {
        const [user, setUser] = useState(null);

        const register = async (formData) => {
            try {
                const { data } = await axios.post("http://localhost:5000/api/auth/register", formData);
                setUser(data.user);
                localStorage.setItem("userToken", data.token);
            } catch (error) {
                console.error(error.response?.data?.message || "Registration failed");
            }
        };

        const login = async (formData) => {
            try {
                const { data } = await axios.post("http://localhost:5000/api/auth/login", formData);
                setUser(data.user);
                localStorage.setItem("userToken", data.token);
            } catch (error) {
                console.error(error.response?.data?.message || "Login failed");
            }
        };

        return (
            <AuthContext.Provider value={{ register, login, user }}>
                {children}
            </AuthContext.Provider>
        );
    };
