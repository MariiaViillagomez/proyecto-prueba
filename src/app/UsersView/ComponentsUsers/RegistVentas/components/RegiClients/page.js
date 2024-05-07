'use client';
import React, { useState } from 'react';
import './style.css'; 
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseApp from '/src/app/Firebase-Conexion/credenciales';
import '../Search/page';

const firestore = getFirestore(firebaseApp);

function FormRegis() {
  const [registrationMessage, setRegistrationMessage] = useState(''); 
  const [users, setUsers] = useState([]);

  async function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nombre_del_producto = formData.get('nombre_del_producto');
    const precio = formData.get('precio');
    const cantidad = formData.get('cantidad');
    

    try {
      const docRef = await addDoc(collection(firestore, 'ventaproducto'), {
        nombres_del_producto,
        precio,
        cantidad,
        
      });
      console.log("Producto registrado con ID: ", docRef.id);
      setRegistrationMessage('Producto vendido correctamente');
      setUsers(prevUsers => [...prevUsers, { id: docRef.id, nombre, email, primer_apellido, segundo_apellido }]);
    } catch (e) {
      console.error("Error al registrar cliente:", e);
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
              <label htmlFor="nombre_del_producto" className="block font-bold mb-1 text-black">Nombres del producto</label>
              <input type="text" id="nombre_del_producto" name="nombre_del_producto" required className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black" />
            </div>
            <div>
              <label htmlFor="precio" className="block font-bold mb-1 text-black">Precio:</label>
              <input type="number" id="precio" name="precio" required className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black" />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="cantidad" className="block font-bold mb-1 text-black">cantidad</label>
              <input type="number" id="cantidad" name="cantidad" required className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black" />
            </div>
            
          </div>
          
          
          <div className="mb-4">
            <input type="submit" value="Registrar venta" className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 cursor-pointer" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormRegis;
