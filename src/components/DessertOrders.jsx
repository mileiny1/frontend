import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import{ dessert } from '../../services/dessertService'
import { createOrder } from '../../services/orderService'
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const DessertOrders = () => { 
  const navigate = useNavigate();
  

  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    price: '',
    createdAt: new Date().toISOString().slice(0, 16),
    specialinstruction: '',
    deliveryaddress: '',
    dessertype: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found.');
      navigate('/register'); // Redirect to login if no token
      return;
    }

    // Decode the token to extract userId
    const base64Url = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(base64Url));
   
    const user = decodedPayload._id;

    if (!user) {
      console.error('User ID not found in token');
      return;
    }

    // Prepare dessert payload
    const dessertPayload = {
      ...formData,
      ingredients: formData.ingredients.split(',').map((item) => item.trim()),
      price: parseFloat(formData.price),
      createdAt: new Date(formData.createdAt).toISOString(),
    };

    // Create dessert
    const dessertResponse = await dessert(dessertPayload, token);
    console.log('Dessert created:', dessertResponse);

    const baseId = dessertResponse.dessert._id;

    if (!baseId || baseId.length < 24) {
      console.error('Invalid dessert ID returned:', baseId);
     navigate('/register');
      return;
     
    }

    // Generate desserttypeId by altering the last character of the ID
    const randomHex = Math.floor(Math.random() * 16).toString(16);
    const desserttypeId = baseId.slice(0, -1) + randomHex;

    // Create order payload
    const orderPayload = {
      ordersnumber: Math.floor(Math.random() * 1000000),
      orderstype: 'Dessert',
      quantity: 1,
      totalPrice: parseFloat(formData.price),
      status: 'Pending',
      deliveryAddress: formData.deliveryaddress,
      deliverydate: new Date().toISOString().slice(0, 10),
      desserttypeId,
      specialInstructions: formData.specialinstruction,
      user,
    };
console.log(orderPayload)
    const orderResponse = await createOrder(orderPayload, token);
    console.log('Order created:', orderResponse);

    // Reset form
    setFormData({
      name: '',
      ingredients: '',
      price: '',
      createdAt: new Date().toISOString().slice(0, 16),
      specialinstruction: '',
      deliveryaddress: '',
      dessertype: ''
    });

  } catch (error) {
    console.error('Error creating dessert or order:', error.message);
  }
};
  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <h2 className="mb-4 text-primary">Add Dessert</h2>

        <div className="mb-3">
          <label className="form-label">Dessert Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g., Chocolate Lava Cake"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ingredients (comma-separated)</label>
          <input
            type="text"
            name="ingredients"
            className="form-control"
            value={formData.ingredients}
            onChange={handleChange}
            required
            placeholder="e.g., Flour, Eggs, Butter"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            required
            step="0.01"
            min="0"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Created At</label>
          <input
            type="datetime-local"
            name="createdAt"
            className="form-control"
            value={formData.createdAt}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Special Instruction</label>
          <input
            type="text"
            name="specialinstruction"
            className="form-control"
            value={formData.specialinstruction}
            onChange={handleChange}
            required
            placeholder="e.g., Serve warm"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Delivery Address</label>
          <input
            type="text"
            name="deliveryaddress"
            className="form-control"
            value={formData.deliveryaddress}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dessert Type</label>
          <input
            type="text"
            name="dessertype"
            className="form-control"
            value={formData.dessertype}
            onChange={handleChange}
            required
            placeholder="e.g., Cake, Tart, Ice Cream"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Dessert
        </button>
      </form>
    </div>
  );
};

export default DessertOrders