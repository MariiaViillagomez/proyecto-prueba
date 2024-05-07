'use client';
import React, { useState } from 'react';
import './style.css'; 
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseApp from '/src/app/Firebase-Conexion/credenciales';
import '../../../Products/Components/Search/page';

const firestore = getFirestore(firebaseApp);

function FormRegis() {
  const [registrationMessage, setRegistrationMessage] = useState(''); 
  const [users, setUsers] = useState([]);

  async function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nombre_producto = formData.get('nombre_producto');
    const precio_unitario = formData.get('precio_unitario');
    const cantidad_total = formData.get('cantidad_total');
    const fecha_ingreso = formData.get('fecha_ingreso');
    

    try {
      const docRef = await addDoc(collection(firestore, 'producto'), {
        nombre_producto,
        precio_unitario,
        cantidad_total,
        fecha_ingreso,
        
      });
      console.log("Producto registrado con ID: ", docRef.id);
      setRegistrationMessage('Producto registrado correctamente');
      setUsers(prevUsers => [...prevUsers, { id: docRef.id, nombre_producto, precio_unitario, cantidad_total, fecha_ingreso }]);
    } catch (e) {
      console.error("Error al registrar producto:", e);
    }
  }

  return (
    <div className="page-container">
      <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        {registrationMessage && (
          <div className="text-green-600">{registrationMessage}</div>
        )}
        <form onSubmit={submitHandler}>
          <div className="form-row">
            <div>
              <label htmlFor="nombre_producto" className="block font-bold mb-1 text-black">Nombre del Producto</label>
              <input type="text" id="nombre_producto" name="nombre_producto" required className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black" />
            </div>
            <div>
              <label htmlFor="precio_unitario" className="block font-bold mb-1 text-black">Precio Unitario</label>
              <input type="number" id="precio_unitario" name="precio_unitario" required className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black" />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="cantidad_total" className="block font-bold mb-1 text-black">Cantidad Total</label>
              <input type="number" id="cantidad_total" name="cantidad_total" required className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black" />
            </div>
            
          </div>
          
          <div className="form-row">
            <div>
              <label htmlFor="fecha_ingreso" className="block font-bold mb-1 text-black">Fecha de ingreso</label>
              <input type="date" id="fecha_ingreso" name="fecha_ingreso" required className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black" />
            </div>
          
          </div>
          <div className="mb-4">
            <input type="submit" value="Registrar Pruducto" className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 cursor-pointer" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormRegis;
