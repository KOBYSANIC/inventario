// libraries
import { BrowserRouter } from "react-router-dom";

// pages
import Rutas from "./routers/Routes";
import Navbar from "./components/navBar/NavBar";

// context
import { UserContextProvider } from "./context/User";
import { InterfaceContextProvider } from "./context/Interface";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <UserContextProvider>
        <InterfaceContextProvider>
          <BrowserRouter>
            {/* <Navbar /> */}
            <Rutas />
          </BrowserRouter>
        </InterfaceContextProvider>
      </UserContextProvider>
    </ChakraProvider>
  );
}

export default App;
