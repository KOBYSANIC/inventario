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
  const [data, setData] = useState([]);

  useEffect(() => {
    const getResponse = async () => {
      const date = await getMenu();
      setData(date);
    };

    getResponse();
  }, []);
  return (
    <Routes>
      <Route index element={<Home />} />

      {/* rutas protegidas */}
      <Route
        path="/proveedores"
        element={
          <ProtectedRoute redirectTo="/">
            <SidebarWithHeader data={data}>
              <h1>Proveedores</h1>
            </SidebarWithHeader>
          </ProtectedRoute>
        }
      />
      <Route
        path="/compras"
        element={
          <ProtectedRoute redirectTo="/">
            <SidebarWithHeader data={data}>
              <h1>Compras</h1>
            </SidebarWithHeader>
          </ProtectedRoute>
        }
      />
      <Route
        path="/detalle_compra"
        element={
          <ProtectedRoute redirectTo="/">
            <SidebarWithHeader data={data}>
              <h1>Detalle Compra</h1>
            </SidebarWithHeader>
          </ProtectedRoute>
        }
      />
      <Route
        path="/Agregar_menu"
        element={
          <ProtectedRoute redirectTo="/">
            <SidebarWithHeader data={data}>
              <MenuForm />
            </SidebarWithHeader>
          </ProtectedRoute>
        }
      />
      <Route path="/account" element={<Account />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/post" element={<Post />} />
      </Route>
      <Route
        path="/inventario"
        element={
          <ProtectedRoute redirectTo="/">
            <SidebarWithHeader data={data}>
              <h1>Inventario</h1>
            </SidebarWithHeader>
          </ProtectedRoute>
        }
      />
      <Route
        path="/productos"
        element={
          <ProtectedRoute redirectTo="/">
            <SidebarWithHeader data={data}>
              <h1>Productos</h1>
            </SidebarWithHeader>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Rutas;
