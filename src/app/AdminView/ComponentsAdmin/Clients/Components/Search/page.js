'use client';

import React, { useState, useEffect } from 'react';
import firebaseApp from '/src/app/Firebase-Conexion/credenciales';
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import '../Search/search.css';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const firestore = getFirestore(firebaseApp);
      const usersCollection = collection(firestore, 'cliente');
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const handleSearch = () => {
    const filteredUsers = users.filter(user =>
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = async () => {
    const firestore = getFirestore(firebaseApp);
    const userRef = doc(firestore, 'cliente', editingUser.id);
    await updateDoc(userRef, editingUser);
  
    const updatedUsers = users.map(user =>
      user.id === editingUser.id ? editingUser : user
    );
    setUsers(updatedUsers);
  
    setEditingUser(null);
  };

  const handleDelete = async (id) => {
    const firestore = getFirestore(firebaseApp);
    const userRef = doc(firestore, 'cliente', id);
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
            <th>Primer Apellido</th>
            <th>Segundo Apellido</th>
            <th>Direccion</th>
            <th>Numero de Carnet</th>
            <th>Inicio de Inscripcion</th>
            <th>Fin de Inscripcion</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className='tbody-container'>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.nombre}</td>
              <td>{user.primer_apellido}</td>
              <td>{user.segundo_apellido}</td>
              <td>{user.direccion}</td>
              <td>{user.identidad}</td>
              <td>{user.inicio_inscripcion}</td>
              <td>{user.fin_inscripcion}</td>
              <td>{user.email}</td>
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
            value={editingUser.nombre}
            onChange={(e) => setEditingUser({ ...editingUser, nombre: e.target.value })}
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
            value={editingUser.inicio_inscripcion}
            onChange={(e) => setEditingUser({ ...editingUser, inicio_inscripcion: e.target.value })}
          />
          <input
            type="text"
            value={editingUser.fin_inscripcion}
            onChange={(e) => setEditingUser({ ...editingUser, fin_inscripcion: e.target.value })}
          />
          
          <input
            type="text"
            value={editingUser.email}
            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
          />
         
          <button onClick={handleSave}>Guardar</button>
        </div>
      )}
    </div>
  );
}

export default Search;
