import { useContext, useEffect } from "react";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosinstance";
import { UserContext } from "../context/User_Context";
import { useNavigate } from "react-router-dom";

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return;

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        //function to fetch user info from backend.
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

        if (isMounted && response.data) {
          updateUser(response.data);
        }
      } catch (error) {
        console.error("failed to fetch user info:", error);
        if (isMounted) {
          clearUser();
          navigate("/login");
        }
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [user, updateUser, clearUser, navigate]);
};

/* why hook :-
    1. Separation of Concerns
The hook encapsulates the logic of authentication and user data fetching.
Your component (Home) stays clean and focused on UI rendering and routing.

    2. Reusability
The hook can be reused across multiple components that need user authentication info.

*/