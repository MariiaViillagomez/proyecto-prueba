// project-xander\src\app\Components\RegiUsers\page.js
'use client';
import React, { useState } from 'react';
import './style.css'; 
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseApp from '../../Firebase-Conexion/credenciales';
import '../Search/page' 

const firestore = getFirestore(firebaseApp);

function FormRegis() {
  const [registrationMessage, setRegistrationMessage] = useState(''); 
  const [users, setUsers] = useState([]);

  async function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nombres = formData.get('nombres');
    const email = formData.get('email');
    const password = formData.get('password');
    const primer_apellido = formData.get('primer_apellido');
    const segundo_apellido = formData.get('segundo_apellido');
    const direccion = formData.get('direccion');
    const identidad = formData.get('identidad');
    const hora_entrada = formData.get('hora_entrada');
    const hora_salida = formData.get('hora_salida');
    const inicio_contrato = formData.get('inicio_contrato');
    const fin_contrato = formData.get('fin_contrato');
    const rol_usuario = formData.get('rol_usuario');

    try {
      const docRef = await addDoc(collection(firestore, 'usuarios'), {
        nombres,
        email,
        password,
        primer_apellido,
        segundo_apellido,
        direccion,
        identidad,
        hora_entrada,
        hora_salida,
        inicio_contrato,
        fin_contrato,
        rol_usuario
      });
      console.log("Usuario registrado con ID: ", docRef.id);
      setRegistrationMessage('Usuario registrado correctamente');
     
      setUsers(prevUsers => [...prevUsers, { id: docRef.id, nombres, email, primer_apellido, segundo_apellido }]);
    } catch (e) {
      console.error("Error al agregar usuario: ", e);
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
              <label htmlFor="nombres" className="block font-bold mb-1 text-black">Nombres:</label>
              <input type="text" id="nombres" name="nombres" required className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black" />
            </div>
            <div>
              <label htmlFor="email" className="block font-bold mb-1 text-black">Email:</label>
              <input type="email" id="email" name="email" required className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black" />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="password" className="block font-bold mb-1 text-black">Contraseña:</label>
              <input type="password" id="password" name="password" required className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black" />
            </div>
            <div>
              <label htmlFor="primer_apellido" className="block font-bold mb-1 text-black">1er Apellido:</label>
              <input type="text" id="primer_apellido" name="primer_apellido" required className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black" />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="segundo_apellido" className="block font-bold mb-1 text-black">2do Apellido:</label>
              <input type="text" id="segundo_apellido" name="segundo_apellido" required className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black" />
            </div>
            <div>
              <label htmlFor="direccion" className="block font-bold mb-1 text-black">Dirección:</label>
              <input type="text" id="direccion" name="direccion" required className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black" />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="identidad" className="block font-bold mb-1 text-black">Nro-Identidad:</label>
              <input type="text" id="identidad" name="identidad" required className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black" />
            </div>
            <div>
              <label htmlFor="hora_entrada" className="block font-bold mb-1 text-black">Hora de Entrada:</label>
              <input type="time" id="hora_entrada" name="hora_entrada" required className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black" />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="hora_salida" className="block font-bold mb-1 text-black">Hora de Salida:</label>
              <input type="time" id="hora_salida" name="hora_salida" required className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black" />
            </div>
            <div>
              <label htmlFor="inicio_contrato" className="block font-bold mb-1 text-black">Inicio de Contrato:</label>
              <input type="date" id="inicio_contrato" name="inicio_contrato" required className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black" />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="fin_contrato" className="block font-bold mb-1 text-black">Fin de Contrato:</label>
              <input type="date" id="fin_contrato" name="fin_contrato" required className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black" />
            </div>
            <div>
              <label htmlFor="rol_usuario" className="block font-bold mb-1 text-black">Rol de Usuario:</label>
              <select id="rol_usuario" name="rol_usuario" required className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black">
                <option value="administrador">Administrador</option>
                <option value="usuario">Usuario</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <input type="submit" value="Registrar Usuario" className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 cursor-pointer" />
          </div>

          
        </form>
      </div>
    </div>

    
  );
}
  
export default FormRegis;
