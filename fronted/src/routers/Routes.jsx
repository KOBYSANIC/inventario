// Libraries
import { Routes, Route } from "react-router-dom";

// components
import ProtectedRoute from "../components/routes/ProtectedRoute";
import SidebarWithHeader from "../components/sideBar/SideBar";

// pages
import Home from "../pages/Home";
import Post from "../pages/Post";
import Account from "../pages/Account";
import MenuForm from "../components/form/menu/MenuForm";
import CompraForm from "../components/form/compra/CompraForm";
// import Dashboard from "../pages/Dashboard";

function Rutas() {
  return (
    <Routes>
      <Route index element={<Home />} />

      {/* rutas protegidas */}
      <Route
        path="/proveedores"
        element={
          <ProtectedRoute redirectTo="/">
            <SidebarWithHeader>
              <h1>Proveedores</h1>
            </SidebarWithHeader>
          </ProtectedRoute>
        }
      />
      <Route
        path="/compras"
        element={
          <SidebarWithHeader>
            <CompraForm />
          </SidebarWithHeader>
        }
      />
      <Route
        path="/detalle_compra"
        element={
          <ProtectedRoute redirectTo="/">
            <SidebarWithHeader>
              <h1>Detalle Compra</h1>
            </SidebarWithHeader>
          </ProtectedRoute>
        }
      />
      <Route
        path="/Agregar_menu"
        element={
          <SidebarWithHeader>
            <MenuForm />
          </SidebarWithHeader>
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
            <SidebarWithHeader>
              <h1>Inventario</h1>
            </SidebarWithHeader>
          </ProtectedRoute>
        }
      />
      <Route
        path="/productos"
        element={
          <ProtectedRoute redirectTo="/">
            <SidebarWithHeader>
              <h1>Productos</h1>
            </SidebarWithHeader>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Rutas;
