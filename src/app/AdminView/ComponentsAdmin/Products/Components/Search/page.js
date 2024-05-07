'use client';

import React, { useState, useEffect } from 'react';
import firebaseApp from '/src/app/Firebase-Conexion/credenciales';
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import './search.css';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const firestore = getFirestore(firebaseApp);
      const usersCollection = collection(firestore, 'producto');
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const handleSearch = () => {
    const filteredUsers = users.filter(user =>
      user.nombre_producto.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = async () => {
    const firestore = getFirestore(firebaseApp);
    const userRef = doc(firestore, 'producto', editingUser.id);
    await updateDoc(userRef, editingUser);
  
    const updatedUsers = users.map(user =>
      user.id === editingUser.id ? editingUser : user
    );
    setUsers(updatedUsers);
  
    setEditingUser(null);
  };

  const handleDelete = async (id) => {
    const firestore = getFirestore(firebaseApp);
    const userRef = doc(firestore, 'producto', id);
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
            <th>Nombre del producto</th>
            <th>Precio Unitario</th>
            <th>Cantidad Total Producto</th>
            <th>Fecha de ingreso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className='tbody-container'>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.nombre_producto}</td>
              <td>{user.precio_unitario}</td>
              <td>{user.cantidad_total}</td>
              <td>{user.fecha_ingreso}</td>
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
            value={editingUser.nombre_producto}
            onChange={(e) => setEditingUser({ ...editingUser, nombre_producto: e.target.value })}
          />
          <input
            type="number"
            value={editingUser.precio_unitario}
            onChange={(e) => setEditingUser({ ...editingUser, precio_unitario: e.target.value })}
          />
          <input
            type="number"
            value={editingUser.cantidad_total}
            onChange={(e) => setEditingUser({ ...editingUser, cantidad_total: e.target.value })}
          />
          <input
            type="text"
            value={editingUser.fecha_ingreso}
            onChange={(e) => setEditingUser({ ...editingUser, fecha_ingreso: e.target.value })}
          />
          
    
          <button onClick={handleSave}>Guardar</button>
        </div>
      )}
    </div>
  );
}

export default Search;
