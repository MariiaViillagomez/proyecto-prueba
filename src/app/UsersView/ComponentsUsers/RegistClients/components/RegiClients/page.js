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
    const nombres = formData.get('nombres');
    const email = formData.get('email');
    const primer_apellido = formData.get('primer_apellido');
    const segundo_apellido = formData.get('segundo_apellido');
    const direccion = formData.get('direccion');
    const identidad = formData.get('identidad');
    const inicio_inscripcion = formData.get('inicio_inscripcion');
    const fin_inscripcion = formData.get('fin_inscripcion');

    try {
      const docRef = await addDoc(collection(firestore, 'cliente'), {
        nombres,
        email,
        primer_apellido,
        segundo_apellido,
        direccion,
        identidad,
        inicio_inscripcion,
        fin_inscripcion
      });
      console.log("Cliente registrado con ID: ", docRef.id);
      setRegistrationMessage('Cliente registrado correctamente');
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
              <label htmlFor="nombre" className="block font-bold mb-1 text-black">Nombres:</label>
              <input type="text" id="nombres" name="nombres" required className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black" />
            </div>
            <div>
              <label htmlFor="email" className="block font-bold mb-1 text-black">Email:</label>
              <input type="email" id="email" name="email" required className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black" />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="primer_apellido" className="block font-bold mb-1 text-black">1er Apellido:</label>
              <input type="text" id="primer_apellido" name="primer_apellido" required className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black" />
            </div>
            <div>
              <label htmlFor="segundo_apellido" className="block font-bold mb-1 text-black">2do Apellido:</label>
              <input type="text" id="segundo_apellido" name="segundo_apellido" required className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black" />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="direccion" className="block font-bold mb-1 text-black">Dirección:</label>
              <input type="text" id="direccion" name="direccion" required className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black" />
            </div>
            <div>
              <label htmlFor="identidad" className="block font-bold mb-1 text-black">Nro-Identidad:</label>
              <input type="text" id="identidad" name="identidad" required className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black" />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="inicio_inscripcion" className="block font-bold mb-1 text-black">Inicio de Inscripción:</label>
              <input type="date" id="inicio_inscripcion" name="inicio_inscripcion" required className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black" />
            </div>
            <div>
              <label htmlFor="fin_inscripcion" className="block font-bold mb-1 text-black">Fin de Inscripción:</label>
              <input type="date" id="fin_inscripcion" name="fin_inscripcion" required className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black" />
            </div>
          </div>
          <div className="mb-4">
            <input type="submit" value="Registrar Cliente" className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 cursor-pointer" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormRegis;
