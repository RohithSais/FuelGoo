// script.js
document.addEventListener('DOMContentLoaded', () => {
    // IMPORTANT: You will need to paste a valid supplier token here
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZTE1Yjk3M2UzNzU5NDRlOTU3ZTI3OCIsImlhdCI6MTc2MDQzMjU0MywiZXhwIjoxNzYzMDI0NTQzfQ.t4781HKqQyt0UrW_L7J3P8UGsVzn5_KuCwBLX3Nab3s'; 
    const ordersContainer = document.getElementById('orders-container');

    // --- REAL-TIME CONNECTION ---
    const socket = io('http://localhost:5000');
    socket.on('connect', () => console.log('Connected to WebSocket server!'));
    socket.on('new_order', () => fetchPendingOrders());
    socket.on('order_accepted', () => fetchPendingOrders());
    // -------------------------

    const fetchPendingOrders = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/orders/pending', {
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            if (!response.ok) throw new Error('Could not fetch orders. Is your token valid?');
            const orders = await response.json();
            renderOrders(orders);
        } catch (error) {
            ordersContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
        }
    };

  // In script.js, replace the old renderOrders function with this one:

const renderOrders = (orders) => {
    const ordersContainer = document.getElementById('orders-container');
    ordersContainer.innerHTML = ''; // Clear previous content

    if (orders.length === 0) {
        ordersContainer.innerHTML = '<p class="no-requests">No pending requests found.</p>';
        return;
    }

    orders.forEach(order => {
        const card = document.createElement('div');
        card.className = 'order-card';
        card.id = `order-${order._id}`;
        card.innerHTML = `
            <div class="card-header">
                <h3>Request from: ${order.user.name}</h3>
            </div>
            <div class="card-body">
                <p>Status: <span>${order.status}</span></p>
                <p>Coordinates: <span>${order.location.coordinates[1].toFixed(5)}, ${order.location.coordinates[0].toFixed(5)}</span></p>
            </div>
            <button class="accept-btn" data-id="${order._id}">Accept Request</button>
        `;
        ordersContainer.appendChild(card);
    });
};

    const acceptRequest = async (orderId) => {
        try {
            await fetch(`http://localhost:5000/api/orders/${orderId}/accept`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
        } catch (error) {
            alert(error.message);
        }
    };
    
    ordersContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('accept-btn')) {
            const orderId = event.target.dataset.id;
            acceptRequest(orderId);
        }
    });

    fetchPendingOrders();
});
