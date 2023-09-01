// libraries
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// pages
import Rutas from "./routers/Routes";

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
            <Toaster />
            {/* <Navbar /> */}
            <Rutas />
          </BrowserRouter>
        </InterfaceContextProvider>
      </UserContextProvider>
    </ChakraProvider>
  );
}

export default App;
