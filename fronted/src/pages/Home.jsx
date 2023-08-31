// components
import Signin from "../components/form/user/Signin";
import Signup from "../components/form/user/Signup";

// context
import { UserContext } from "../context/User";
import { InterfaceContext } from "../context/Interface";

// react
import { useContext, useEffect, useState } from "react";
import useTokenLocalStorage from "../hooks/user/useTokenLocalStorage ";
import { logoutUser } from "../services/user";
import SidebarWithHeader from "../components/sideBar/SideBar";
import { getMenu } from "../services/menu";

function Home() {
  const { user } = useContext(UserContext);

  const { showLogin } = useContext(InterfaceContext);

  if (!user) {
    return <>{showLogin ? <Signin /> : <Signup />}</>;
  }
  const { getToken } = useTokenLocalStorage("userToken");

 
  const [data, setData] = useState([])

  useEffect(() => {

    const getResponse = async () => {
      const date = await getMenu()
      setData(date)
    }

    getResponse()
  }, [])
  
  return (<SidebarWithHeader data={data}/>)
}

export default Home;
