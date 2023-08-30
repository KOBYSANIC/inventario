// components
import Signin from "../components/form/user/Signin";
import Signup from "../components/form/user/Signup";

// context
import { UserContext } from "../context/User";
import { InterfaceContext } from "../context/Interface";

// react
import { useContext } from "react";
import useTokenLocalStorage from "../hooks/user/useTokenLocalStorage ";
import { logoutUser } from "../services/user";

function Home() {
  const { user } = useContext(UserContext);

  const { showLogin } = useContext(InterfaceContext);

  if (!user) {
    return <>{showLogin ? <Signin /> : <Signup />}</>;
  }
  const { getToken } = useTokenLocalStorage("userToken");

  const handleFormSubmit = () => {
    const token = getToken();
    logoutUser(token);
  };
  return <div>Home - public
    <button onClick={handleFormSubmit}>Cerrar Sesión</button>
  </div>;
}

export default Home;
