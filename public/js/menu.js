const token = localStorage.getItem("token"); // After login

fetch("/api/products")
  .then(res => res.json())
  .then(products => {
    const menu = document.getElementById("menu-container");

    products.forEach(product => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h4>${product.name}</h4>
        <p>${product.description}</p>
        <p>₹${product.price}</p>
        <a onclick="addToCart('${product._id}')">Add to Cart</a>
      `;
      menu.appendChild(div);
    });
  });

function addToCart(productId) {
  fetch("/api/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ productId, quantity: 1 })
  })
    .then(res => res.json())
    .then(data => alert("Added to cart!"));
}
function viewCart() {
  fetch("/api/cart", {
    headers: {
      "Authorization": "Bearer " + token
    }
  })
    .then(res => res.json())
    .then(cart => {
      const cartContainer = document.getElementById("cart-container");
      cartContainer.innerHTML = "";
      cart.items.forEach(item => {
        const div = document.createElement("div");
        div.innerHTML = `
          <h4>${item.product.name}</h4>
          <p>Quantity: ${item.quantity}</p>
          <p>Price: ₹${item.product.price * item.quantity}</p>
        `;
        cartContainer.appendChild(div);
      });
    });
}