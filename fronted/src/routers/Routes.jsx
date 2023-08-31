// Libraries
import { Routes, Route, redirect } from "react-router-dom";

// components
import ProtectedRoute from "../components/routes/ProtectedRoute";
import SidebarWithHeader from "../components/sideBar/SideBar";

// pages
import Home from "../pages/Home";
import Post from "../pages/Post";
import Account from "../pages/Account";
import { useEffect, useState } from "react";
import { getMenu } from "../services/menu";
import MenuForm from "../components/form/menu/MenuForm";
// import Dashboard from "../pages/Dashboard";

function Rutas() {
  const [data, setData] = useState([])

  useEffect(() => {

    const getResponse = async () => {
      const date = await getMenu()
      setData(date)
    }

    getResponse()
  }, [])
  console.log(data)
  return (
    <Routes>
     <Route index element={<Home />} />
      <Route path="/inicio" element={<Home />} />
      <Route path="/inventario" element={<SidebarWithHeader data={data}><h1>Inventario</h1></SidebarWithHeader>} />
      <Route path="/productos" element={<SidebarWithHeader data={data}><h1>Productos</h1></SidebarWithHeader>} />
      <Route path="/proveedores" element={<SidebarWithHeader data={data}><h1>Proveedores</h1></SidebarWithHeader>} />
      <Route path="/compras" element={<SidebarWithHeader data={data}><h1>Compras</h1></SidebarWithHeader>} />
      <Route path="/detalle_compra" element={<SidebarWithHeader data={data}><h1>Detalle Compra</h1></SidebarWithHeader>} />
      <Route path="/Agregar_menu" element={<SidebarWithHeader data={data}><MenuForm/></SidebarWithHeader>} />
      <Route element={<ProtectedRoute />}>
        <Route path="/post" element={<Post />} />
       
      </Route>

      {/* <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            isAllowed={!!user && user.permissions.includes("admin")}
            redirectTo="/account"
          >
            <Dashboard />
          </ProtectedRoute>
        }
      /> */}
    </Routes>
  );
}

export default Rutas;
