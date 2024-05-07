'use client';
import React, { useState } from "react";
import Link from "next/link";
import RegistClients from "./ComponentsUsers/RegistClients/page";
import RegistVentas from "./ComponentsUsers/RegistVentas/page";


const Sidebar = () => {
  const [activeSection, setActiveSection] = useState(null);

  const handleClick = (section) => {
    setActiveSection(section);
  };

  return (
    <nav className="bg-gray-900 text-white w-64 h-full fixed left-0 top-0 bottom-0 z-10 shadow">
      <div className="flex items-center justify-center h-16 px-4">
        <span className="text-2xl font-semibold">Users Panel</span>
      </div>
      <ul>
        <li className="px-6 py-4 hover:bg-gray-800 cursor-pointer transition-colors duration-300 ease-in-out" onClick={() => handleClick("usuarios")}>
          <span className="text-base tracking-wide font-semibold">Registrar Ventas</span>
        </li>
        <li className="px-6 py-4 hover:bg-gray-800 cursor-pointer transition-colors duration-300 ease-in-out" onClick={() => handleClick("clientes")}>
          <span className="text-base tracking-wide font-semibold">Registrar Cliente</span>
        </li>
      </ul>
      <div className="absolute bottom-0 left-0 right-0">
        <Link href="/" passHref>
          <button className="w-full bg-gray-800 py-3 text-center text-lg font-semibold hover:bg-gray-700 transition-colors duration-300 ease-in-out">
            Salir
          </button>
        </Link>
      </div>
      {activeSection === "clientes" && <RegistClients />}
      {activeSection === "usuarios" && <RegistVentas />}  
    </nav>
  );
};
export default Sidebar;







