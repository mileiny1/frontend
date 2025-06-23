import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { getOrdersByShortId } from '../../services/userOrdersHistoryService';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getOrdersByShortId();
        setOrders(data || []); // Ensure data is always an array
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Failed to load orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Helper function to safely format dates
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString();
    } catch {
      return 'Invalid Date';
    }
  };

  if (loading) {
    return (
      <div className="container-fluid p-3 d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid p-3">
        <div className="alert alert-danger" role="alert">
          {error}
          <button 
            className="btn btn-outline-danger ms-2" 
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-3" style={{ height: '100vh', overflowY: 'auto' }}>
      <div className="bg-light p-3 rounded shadow-sm mb-4 text-center">
        <h4>Welcome!</h4>
      </div>
      
      {orders.length === 0 ? (
        <div className="alert alert-info">
          No orders found.
          <Link className="btn btn-primary ms-2" to="/dessertorders">
            Place Your First Order
          </Link>
        </div>
      ) : (
        orders.map((order, index) => (
          <div key={order._id || order.id || `order-${index}`} className="card mb-4 shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Order Confirmed</h5>
            </div>
            <div className="card-body">
              <p><strong>Order #:</strong> {order.ordersnumber || 'N/A'}</p>
              <p><strong>Dessert:</strong> {order.name || 'N/A'}</p>
              <p><strong>Instructions:</strong> {order.specialInstructions || 'None'}</p>
              <p><strong>Type:</strong> {order.orderstype || 'N/A'}</p>
              <p><strong>Date:</strong> {formatDate(order.deliverydate)}</p>
              <p><strong>Status:</strong> {order.status || 'Unknown'}</p>
              <div className="mb-2">
                <strong>Delivery Address:</strong>
                <p className="mb-0">{order.deliveryAddress || 'N/A'}</p>
              </div>
              <div className="d-flex justify-content-end gap-2">
                <Link className="btn btn-success" to="/dessertorders">
                  Place Another Order
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;