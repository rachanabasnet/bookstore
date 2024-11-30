$(document).ready(function () {
  // Get  cart items from the local storage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cartContainer");

  let shippingFee = 5.99;

  const renderCart = () => {
    cartContainer.innerHTML = "";
    let subTotal = 0;

    if (cart.length > 0) {
      cart.forEach((book, index) => {
        const item = document.createElement("div");
        item.classList.add("item");

        // Calculate item total price
        const itemTotalPrice = book.price * book.quantity;
        subTotal += itemTotalPrice; // Update subtotal

        item.innerHTML = `
          <img src="${book.imageLink}" alt="${book.title}">
          <div class="itemDetails">
              <h2>${book.title}</h2>
              <p>${book.author}</p>
          </div>
          <div class="itemQuantity">
              <button class="reduceQuantity">-</button>
              <div>${book.quantity}</div>
              <button class="addQuantity">+</button>
          </div>
          <p class="itemPrice">$${itemTotalPrice.toFixed(2)}</p>
      `;

        cartContainer.appendChild(item);

        // Event listeners for quantity buttons
        item.querySelector(".reduceQuantity").addEventListener("click", () => {
          updateQuantity(index, -1);
        });

        item.querySelector(".addQuantity").addEventListener("click", () => {
          updateQuantity(index, 1);
        });
      });

      // Add Subtotal, Shipping Fee, and Total
      const subTotalDiv = document.createElement("div");
      subTotalDiv.classList.add("summary");
      subTotalDiv.innerHTML = `
          <div class="row">
          <p>Subtotal</p>
          <p>$${subTotal.toFixed(2)}</p>
          </div>
          <div class="row">
          <p>Shipping Fee</p>
          <p>$${shippingFee}</p>
          </div>
      `;

      cartContainer.appendChild(subTotalDiv);

      const totalDiv = document.createElement("div");
      totalDiv.classList.add("total");
      totalDiv.innerHTML = `
      <p>Total</p>
      <p>CAD $${(subTotal + shippingFee).toFixed(2)}</p>
      `;

      cartContainer.appendChild(totalDiv);

      const submitBtnDiv = document.createElement("div");
      submitBtnDiv.innerHTML = `
          <button class="orderBtn">Confirm Order</button>
    `;

      cartContainer.appendChild(submitBtnDiv);
    } else {
      const noItemsDiv = document.createElement("div");
      noItemsDiv.classList.add("noItems");

      noItemsDiv.innerHTML = `
      <img src="images/empty-box.png" alt="No Items" width="250" height="250"/>
      <p>Your cart is empty!!</p>
      <p>Shop our latest collection by clicking on the button below.</p>
      <a href="books.html"><button class="btn primaryBtn">Browse</button></a>
    `;

      cartContainer.appendChild(noItemsDiv);
    }

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // Function to update quantity
  const updateQuantity = (index, change) => {
    cart[index].quantity += change;

    // Ensure quantity does not go below 1
    if (cart[index].quantity < 1) {
      cart.splice(index, 1); // Remove the item if quantity is 0
    }

    renderCart(); // Re-render the cart
  };

  // Initial render
  renderCart();
});
