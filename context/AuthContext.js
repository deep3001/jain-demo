
// Import necessary libraries and dependencies
import React, { createContext, useContext, useState, useEffect } from "react";
import { API_ROUTES } from "@/components/Apis/apiRoutes";
import axios from "axios";
import { useRouter } from "next/router"; // Import the useRouter hook from Next.js

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setUser({ isAuthenticated: true });
    } else {
      if (router.asPath !== "/login" && router.asPath !== "/register") {
        console.log("User is not authenticated");
        router.push("/login");
      }
    }
  }, [router]);

  const login = async (payload) => {
    try {
     
      const URL = API_ROUTES.LOGIN;

      const response = await axios.post(URL, payload, {});
      if (response.status === 200) {

        const accessToken = response.data.token;

        localStorage.setItem("accessToken", accessToken);
        setUser({ isAuthenticated: true });
        if (router.asPath === "/login") {
          router.push("/"); 
        } else {
          router.reload(); // Reload the current page
        }

        return response;
      } else {
        throw new Error(`API request failed with status code ${response.status}`);
      }
    } catch (error) 
    {
      console.log("Error fetching data: ", error);
    }
  };

  const register = async (payload) => {
    try {
      const URL = API_ROUTES.REGISTER;

      const response = await axios.post(URL, payload, {});
      
      if (response.status === 200) {
        console.log("Registration successful");
        return response;
      } else {
        throw new Error(`API request failed with status code ${response.status}`);
      }
    } catch (error) {
      console.log("Error registering: ", error);
    }
  };

  // Log out the user
  const logout = () => {
    localStorage.removeItem("accessToken");
    router.push("/login");
    setUser({ isAuthenticated: false });

    if (router.asPath === "/dashboard") {
      router.push("/login"); 
    } else {
      router.reload(); // Reload the current page
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
