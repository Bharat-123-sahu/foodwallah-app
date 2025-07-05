const token = localStorage.getItem("token");

fetch("/api/cart", {
  headers: {
    Authorization: "Bearer " + token
  }
})
  .then(res => res.json())
  .then(cart => {
    const container = document.getElementById("cart-container");

    cart.items.forEach(item => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h4>${item.productId.name}</h4>
        <p>Qty: ${item.quantity}</p>
        <button onclick="removeItem('${item.productId._id}')">Remove</button>
      `;
      container.appendChild(div);
    });
  });

function removeItem(productId) {
  fetch("/api/cart/remove", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ productId })
  })
    .then(res => res.json())
    .then(() => location.reload());
}
