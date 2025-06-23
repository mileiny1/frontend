const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/orders/orders`;
export const createOrder = async (orderData, token) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // include token if needed
    },
    body: JSON.stringify(orderData),
  });

  if (!res.ok) {
    throw new Error('Failed to create order');
  }

  return await res.json();
};
