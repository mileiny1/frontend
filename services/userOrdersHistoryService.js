export let lastEncodedShortId = null;

export const getOrdersByShortId = async () => {
  try {
    const token = localStorage.getItem('token'); // Get JWT
    const user = JSON.parse(localStorage.getItem('user')); // Get user payload

    if (!token || !user || !user._id) {
      throw new Error('User or authentication token not found');
    }

    const fullUserId = user._id;
    const encodedShortId = btoa(fullUserId); // Encode the full ID

    // Store for potential external access
    lastEncodedShortId = encodedShortId;

    const res = await fetch(`http://localhost:3000/orders/orders/${encodedShortId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to fetch orders');
    }

    const data = await res.json();
    console.log("data:", data)
    return data;
  } catch (err) {
    console.error('Error:', err.message);
    return [];
  }
};