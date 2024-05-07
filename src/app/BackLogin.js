

import React, { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import firebaseApp from './Firebase-Conexion/credenciales';
import { useRouter } from 'next/router';


const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);


function BackLogin() {
  const router = useRouter();

  useEffect(() => {
    async function checkUserRole() {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDoc = await getDoc(doc(firestore, 'usuarios', currentUser.uid));
        const userData = userDoc.data();
        if (userData && userData.rol_usuario === 'administrador') {
          router.push('/AdminView');
        } else {
          router.push('/UsersView');
        }
      }
    }
    checkUserRole();
  }, []);

  return (
    <div>
      <h2>Redirigiendo...</h2>
    </div>
  );
}

export default BackLogin;
