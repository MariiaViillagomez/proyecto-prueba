import React, { useState } from "react";
import Link from "next/link";
import Page from "./ComponentsAdmin/Users/page";
import PageClients from "./ComponentsAdmin/Clients/page";
import PageEstadistClientes from "./ComponentsAdmin/EstadisClientes/page";
import PageEstadistVentas from "./ComponentsAdmin/EstadisVentas/page";
import PageProducts from "./ComponentsAdmin/Products/page";

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState(null);

  const handleClick = (section) => {
    setActiveSection(section);
  };

  return (
    <nav className="bg-gray-900 text-white w-64 h-full fixed left-0 top-0 bottom-0 z-10 shadow">
      <div className="flex items-center justify-center h-16 px-4">
        <span className="text-2xl font-semibold">Admin Panel</span>
      </div>
      <ul>
        <li className="px-6 py-4 hover:bg-gray-800 cursor-pointer transition-colors duration-300 ease-in-out" onClick={() => handleClick("usuarios")}>
          <span className="text-base tracking-wide font-semibold">Usuarios</span>
        </li>
        <li className="px-6 py-4 hover:bg-gray-800 cursor-pointer transition-colors duration-300 ease-in-out" onClick={() => handleClick("clientes")}>
          <span className="text-base tracking-wide font-semibold">Clientes</span>
        </li>
        <li className="px-6 py-4 hover:bg-gray-800 cursor-pointer transition-colors duration-300 ease-in-out" onClick={() => handleClick("productos")}>
          <span className="text-base tracking-wide font-semibold">Productos</span>
        </li>
        <li className="px-6 py-4 hover:bg-gray-800 cursor-pointer transition-colors duration-300 ease-in-out" onClick={() => handleClick("estadisticas_venta")}>
          <span className="text-base tracking-wide font-semibold">Estadísticas de venta</span>
        </li>
        <li className="px-6 py-4 hover:bg-gray-800 cursor-pointer transition-colors duration-300 ease-in-out" onClick={() => handleClick("estadisticas_clientes")}>
          <span className="text-base tracking-wide font-semibold">Estadísticas de clientes</span>
        </li>
      </ul>
      <div className="absolute bottom-0 left-0 right-0">
        <Link href="/" passHref>
          <button className="w-full bg-gray-800 py-3 text-center text-lg font-semibold hover:bg-gray-700 transition-colors duration-300 ease-in-out">
            Salir
          </button>
        </Link>
      </div>
      {activeSection === "usuarios" && <Page />}
      {activeSection === "clientes" && <PageClients />}
      {activeSection === "productos" && <PageProducts />}
      {activeSection === "estadisticas_venta" && <PageEstadistVentas />}
      {activeSection === "estadisticas_clientes" && <PageEstadistClientes />}
    </nav>
  );
};


export default Sidebar;








