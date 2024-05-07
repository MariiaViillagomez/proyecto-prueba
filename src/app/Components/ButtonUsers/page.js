import React, { useState } from 'react';
import './BotonUsers.css'; 
import RegiUsers from '/src/app/Components/RegiUsers/page'

function ButtonUsers() {
  // Estado para controlar la visibilidad del formulario
  const [showForm, setShowForm] = useState(false);

  // Función para manejar el clic en el botón "Agregar Usuario"
  const handleAddUserClick = () => {
    // Alternar entre mostrar y ocultar el formulario
    setShowForm(!showForm);
  };

  return (
    <div className="ButtonUsers-Container">
      {/* Renderiza el botón "Agregar Usuario" */}
      <button className="ButtonUsers" style={{ fontSize: '20px', padding: '8px 30px' }} onClick={handleAddUserClick}>
        {showForm ? 'Cerrar Formulario' : 'Agregar Usuario'}
      </button>
      
      {/* Renderiza el formulario de registro si showForm es verdadero */}
      {showForm && (
        <div className="FormRegis">
          <RegiUsers/>
        </div>
      )}
    </div>
  );
}

export default ButtonUsers;
