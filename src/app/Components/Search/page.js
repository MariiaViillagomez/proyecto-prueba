'use client';

import React, { useState, useEffect } from 'react';
import firebaseApp from '../../Firebase-Conexion/credenciales';
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import '../Search/search.css';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const firestore = getFirestore(firebaseApp);
      const usersCollection = collection(firestore, 'usuarios');
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const handleSearch = () => {
    const filteredUsers = users.filter(user =>
      user.nombres.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = async () => {
    const firestore = getFirestore(firebaseApp);
    const userRef = doc(firestore, 'usuarios', editingUser.id);
    await updateDoc(userRef, editingUser);
  
    const updatedUsers = users.map(user =>
      user.id === editingUser.id ? editingUser : user
    );
    setUsers(updatedUsers);
  
    setEditingUser(null);
  };

  const handleDelete = async (id) => {
    const firestore = getFirestore(firebaseApp);
    const userRef = doc(firestore, 'usuarios', id);
    await deleteDoc(userRef);
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div className="Search-Container">
      <input
        type="text"
        className="Search-input"
        placeholder="Buscar"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>
        Buscar
      </button>
      <table className='table-container'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>P. Apellido</th>
            <th>S. Apellido</th>
            <th>Direccion</th>
            <th>Numero de Carnet</th>
            <th>Hora de entrada</th>
            <th>Hora de salida</th>
            <th>Inicio de contrato</th>
            <th>Fin de contrato</th>
            <th>Contraseña</th>
            <th>Email</th>
            <th>Rol de usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className='tbody-container'>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.nombres}</td>
              <td>{user.primer_apellido}</td>
              <td>{user.segundo_apellido}</td>
              <td>{user.direccion}</td>
              <td>{user.identidad}</td>
              <td>{user.hora_entrada}</td>
              <td>{user.hora_salida}</td>
              <td>{user.inicio_contrato}</td>
              <td>{user.fin_contrato}</td>
              <td>{user.password}</td>
              <td>{user.email}</td>
              <td>{user.rol_usuario}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Editar</button>
                <button onClick={() => handleDelete(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingUser && (
        // Para editar los campos
        <div>
          <input
            type="text"
            value={editingUser.nombres}
            onChange={(e) => setEditingUser({ ...editingUser, nombres: e.target.value })}
          />
          <input
            type="text"
            value={editingUser.primer_apellido}
            onChange={(e) => setEditingUser({ ...editingUser, primer_apellido: e.target.value })}
          />
          <input
            type="text"
            value={editingUser.segundo_apellido}
            onChange={(e) => setEditingUser({ ...editingUser, segundo_apellido: e.target.value })}
          />
          <input
            type="text"
            value={editingUser.direccion}
            onChange={(e) => setEditingUser({ ...editingUser, direccion: e.target.value })}
          />
          <input
            type="text"
            value={editingUser.identidad}
            onChange={(e) => setEditingUser({ ...editingUser, identidad: e.target.value })}
          />
          <input
            type="text"
            value={editingUser.hora_entrada}
            onChange={(e) => setEditingUser({ ...editingUser, hora_entrada: e.target.value })}
          />
          <input
            type="text"
            value={editingUser.hora_salida}
            onChange={(e) => setEditingUser({ ...editingUser, hora_salida: e.target.value })}
          />
          <input
            type="text"
            value={editingUser.inicio_contrato}
            onChange={(e) => setEditingUser({ ...editingUser, inicio_contrato: e.target.value })}
          />
          <input
            type="text"
            value={editingUser.fin_contrato}
            onChange={(e) => setEditingUser({ ...editingUser, fin_contrato: e.target.value })}
          />
          <input
            type="text"
            value={editingUser.password}
            onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
          />
          <input
            type="text"
            value={editingUser.email}
            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
          />
          <input
            type="text"
            value={editingUser.rol_usuario}
            onChange={(e) => setEditingUser({ ...editingUser, rol_usuario: e.target.value })}
          />
          <button onClick={handleSave}>Guardar</button>
        </div>
      )}
    </div>
  );
}

export default Search;
