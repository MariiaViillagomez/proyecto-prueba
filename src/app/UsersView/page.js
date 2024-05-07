'use client'

import React, { useState } from "react";
import Sidebar from "./Sidebar";

const UsersView= () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div>
            <div className="text-center text-2xl font-semibold py-4" style={{ marginTop: "1%", position: "absolute", top: 0, left: 80, right: 0 }}>
                Contenido del panel de usuario
            </div>
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
};

export default UsersView;
