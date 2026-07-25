//script.js
const API_URL = "http://localhost:3000"; 

const orderForm = document.getElementById("orderForm");
const ordersTableBody = document.getElementById("ordersTableBody");

let orders = []; // store fetched orders

// Modal elements
const updateModal = document.getElementById("updateModal");
const closeModal = document.getElementById("closeModal");
const updateForm = document.getElementById("updateForm");

// 🟢 Load all orders on page load
window.addEventListener("DOMContentLoaded", loadOrders);

async function loadOrders() {
  const res = await fetch(`${API_URL}/order`);
  orders = await res.json();
  renderOrders(orders);
}  

// 🟠 Add New Order
orderForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newOrder = {
    customerName: document.getElementById("customerName").value,
    product: document.getElementById("product").value,
    quantity: parseInt(document.getElementById("quantity").value)
  };

  const res = await fetch(`${API_URL}/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newOrder)
  });

  if (res.ok) {  
    orderForm.reset();
    loadOrders();
  }
});

// 🟡 Render Orders Table
function renderOrders(orders) {
  
  ordersTableBody.innerHTML = "";
  orders.forEach(order => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${order._id || order.orderId}</td>
      <td>${order.customerName}</td>
      <td>${order.product}</td>
      <td>${order.quantity}</td>
      <td>${order.status}</td>
      <td>
        <button class="action-btn edit-btn" onclick="updateOrder('${order._id || order.orderId}')">Update</button>
        <button class="action-btn delete-btn" onclick="deleteOrder('${order._id || order.orderId}')">Delete</button>
      </td>
    `;
    ordersTableBody.appendChild(row);
  });
}

// 🟡 Open modal with prefilled data
function updateOrder(orderId) {
  const order = orders.find(o => (o._id || o.orderId) === orderId);
  if (!order) return;

  document.getElementById("updateOrderId").value = order._id || order.orderId;
  document.getElementById("updateCustomerName").value = order.customerName || "";
  document.getElementById("updateProduct").value = order.product || "";
  document.getElementById("updateQuantity").value = order.quantity || "";
  document.getElementById("updateStatus").value = order.status || "";

  updateModal.style.display = "block";
}

// Close modal
closeModal.onclick = () => (updateModal.style.display = "none");
window.onclick = (e) => {
  if (e.target === updateModal) updateModal.style.display = "none";
};

// Handle modal form submission
updateForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("updateOrderId").value;

  const updatedData = {
    customerName: document.getElementById("updateCustomerName").value,
    product: document.getElementById("updateProduct").value,
    quantity: Number(document.getElementById("updateQuantity").value),
    status: document.getElementById("updateStatus").value
  };

  // Remove empty fields
  Object.keys(updatedData).forEach(key => {
    if (updatedData[key] === "" || updatedData[key] === 0) delete updatedData[key];
  });

  const res = await fetch(`${API_URL}/order/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData)
  });

  if (res.ok) {
    updateModal.style.display = "none";
    loadOrders();
  } else {
    alert("Failed to update order");
  }
});

// 🔴 DELETE Order
async function deleteOrder(orderId) {
  if (!confirm("Are you sure you want to delete this order?")) return;

  const res = await fetch(`${API_URL}/order/${orderId}`, {
    method: "DELETE"
  });

  if (res.ok) {
    loadOrders();
  }
}
