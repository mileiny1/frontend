const BACKEND_URL = import.meta.env.VITE_BACK_END_SERVER_URL 

async function signup(formData) {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    const data = await response.json()
    console.log("Sign Up Success:", data)
    return data
  }
  catch (err) {
    console.error('Signup error:', err);
    throw err
  }
}


const login = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    if (data.token) {
     
      return data.token;
    }

    throw new Error('No token received from server');
  } catch (err) {
    console.error('Login error:', err);
    throw new Error(err.message || 'Login failed.');
  }
};

export {
  signup,
  login,

}



   



