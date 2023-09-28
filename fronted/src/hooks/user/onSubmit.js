// stilos
//import "../../components/form/user/Signup.css";
// context
import { UserContext } from "../../context/User";

// hooks
import useTokenLocalStorage from "./useTokenLocalStorage ";

// react
import { useState, useContext } from "react";

const upper = (string) => {
  try {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } catch {
    return string;
  }
};

const useSubmitForm = (submitFunction) => {
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  const { setToken, removeToken } = useTokenLocalStorage("userToken");

  const onSubmit = async (data, action) => {
    try {
      const response = await submitFunction(data);

      if (action == "login") {
        setToken(response.token);
        setUser(response.user);
        localStorage.setItem(
          "userName",
          upper(response.user.first_name) + " " + upper(response.user.last_name)
        );
        localStorage.setItem("roleUser", upper(response.user_role));
      } else if (action == "create") {
        setToken(response.token);
        setUser(response.user);
        localStorage.setItem(
          "userName",
          upper(response.user.first_name) + " " + upper(response.user.last_name)
        );
        localStorage.setItem("roleUser", upper(response.user_role));
      } else if (action == "logout") {
        removeToken();
        setUser(null);
        localStorage.setItem("userName", "");
        localStorage.setItem("roleUser", "");
      }
      setError(null);
    } catch (e) {
      setError(e);
      localStorage.setItem("userName", "");
      localStorage.setItem("roleUser", "");
      console.log(e);
    }
  };

  return { error, onSubmit };
};

export default useSubmitForm;
