// LOGINN

'use client';


import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from './Firebase-Conexion/credenciales';


const auth = getAuth();

function LoginForm() {
  const [error, setError] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    const { email, password } = e.target.elements;

    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      
      window.location.href = '/BackLogin';
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Contraseña" required />
        <button type="submit">Iniciar Sesión</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default LoginForm;
