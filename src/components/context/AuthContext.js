import { useState, createContext, useEffect } from 'react';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [userLogged, setUserLogged] = useState(false);

  let headers = new Headers();
  useEffect(() => {
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
  }, []);

  useEffect(() => {
    const fetchUserLogged = async () => {
      const res = await fetch(`https://notforsaleweb-a185cdef4039.herokuapp.com/api/auth/userLogged`, {
        method: 'GET',
        headers
      });
      
      const data = await res.json();
      if (data?.error) {
        setUserLogged(false);
      } else {
        setUserLogged(true);
      }
    }

    fetchUserLogged();

  }, []);

  const registerUser = async ({ name, surname, address, country, city, zip_code, email, password }) => {
    const res = await fetch(`https://notforsaleweb-a185cdef4039.herokuapp.com/api/auth/register`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, surname, address, country, city, zip_code, email, password })
    });
    const data = await res.json();
    if (res.status === 200) {
      return data;
    } else {
      alert('Qualcosa è andato storto');
    }
  }

  const loginUser = async ({ email, password }) => {
    
    const res = await fetch(`https://notforsaleweb-a185cdef4039.herokuapp.com/api/auth/login`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.status === 200) {
      if (!data?.error) setUserLogged(true);
      return data;
    } else {
      alert('Qualcosa è andato storto');
    }
  }

  const contextData = { userLogged, headers, registerUser, loginUser, setUserLogged }

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}