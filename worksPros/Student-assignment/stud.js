// 1. DATA SOURCE
// ==========================================
const inventory = [
    { id: 101, name: "Wireless Mouse", category: "Electronics", price: 29.99, tags: ["office", "tech", "USB"] },
    { id: 102, name: "Mechanical Keyboard", category: "Electronics", price: 89.99, tags: ["gaming", "tech", "RGB"] },
    { id: 103, name: "Ergonomic Chair", category: "Furniture", price: 199.99, tags: ["office", "Comfort"] },
    { id: 104, name: "Standing Desk", category: "Furniture", price: 349.99, tags: ["office", "Health"] },
    { id: 105, name: "USB-C Cable Pack", category: "Electronics", price: 14.99, tags: ["tech", "Cables"] }
  ];
  
  // App State
  let cart = [];
  
  // ==========================================
  // 2. DOM ELEMENTS
  // ==========================================
  const searchInput = document.getElementById("search-input");
  const tagSelect = document.getElementById("tag-select");
  const resetBtn = document.getElementById("reset-btn");
  
  const productGrid = document.getElementById("product-grid");
  const productCount = document.getElementById("product-count");
  
  const cartList = document.getElementById("cart-list");
  const cartTotalItems = document.getElementById("cart-total-items");
  const cartGrandTotal = document.getElementById("cart-grand-total");
  const categoryBreakdown = document.getElementById("category-breakdown");
  const checkoutBtn = document.getElementById("checkout-btn");
  
  const searchError = document.getElementById("search-error");
  const cartError = document.getElementById("cart-error");
  
  // ==========================================
  // 3. CORE FUNCTIONS TO IMPLEMENT
  // ==========================================
  
  /**
   * Render the product list array into product-grid element
   * @param {Array} products 
   */
  function renderProducts(products) {
    // TODO: Update productCount text
     productCount.textContent = products.length;
    // TODO: Clear existing productGrid HTML
     productGrid.innerHTML = "";
    // TODO: Loop through products array and build card dynamic elements or innerHTML
    products.forEach(product => {
  // Create product card
      const card = document.createElement("div");
      card.className = "product-card";
  
      card.innerHTML = `
        <h3>${product.name}</h3>
        <p>Category: ${product.category}</p>
        <p>Price: ₹${product.price}</p>
        <p>Tags: ${product.tags.join(", ")}</p>
        <button onclick="addToCart(${product.id})">
          Add to Cart
        </button>
      `;
  
      // Add card to product grid
      productGrid.appendChild(card);
    });
  }
  
  
  /**
   * Filter products based on search term (.includes) and tag (.includes)
   */
  function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedTag = tagSelect.value;
  
    // TODO: Use Array.prototype.filter()
      const filteredProducts = inventory.filter(product => {
    
    // TODO: Filter items whose name .includes(searchTerm)
     const nameMatch = product.name
        .toLowerCase()
        .includes(searchTerm);
    
    // TODO: Filter items whose tags .includes(selectedTag) unless selectedTag === 'ALL'
    const tagMatch =
        selectedTag === "ALL" ||
        product.tags.includes(selectedTag);
        return nameMatch && tagMatch;
    });
    
    // TODO: Call renderProducts() with filtered results
    renderProducts(filteredProducts);
  }
  
  /**
   * Add product object to global cart array
   * @param {number} productId 
   */
  function addToCart(productId) {
    // TODO: Find product by id in inventory
    const product = inventory.find(item => item.id === productId);
    // TODO: Push to cart array
    if (product) {
      cart.push(product);
    }
  
    // Update cart UI
    updateCartUI();
  }
    // TODO: Call updateCartUI()
  
  
  /**
   * Update Cart DOM elements and recalculate analytics using Array.reduce()
   */
  function updateCartUI() {
    // 1. Render cart items list
    cartList.innerHTML = "";
  
    cart.forEach(item => {
  
      const li = document.createElement("li");
  
      li.textContent = `${item.name} - ₹${item.price}`;
  
      cartList.appendChild(li);
    });
    
    // 2. Calculate dynamic grand total using reduce()
    const total = cart.reduce((acc, item) => acc + item.price, 0);

    const cartCount = cart.length;
    cartTotalItems.innerText = `${cartCount}`;
    cartGrandTotal.textContent = `₹${total.toFixed(2)}`;
  
  
    // 3. Group cart items by category and compute category totals using reduce()
    /* 
       TODO: 
       const categoryTotals = cart.reduce((acc, item) => {
         acc[item.category] = (acc[item.category] || 0) + item.price;
         return acc;
       }, {});
    */
    const categoryTotals = cart.reduce((acc, item) => {
  
      acc[item.category] =
        (acc[item.category] || 0) + item.price;
  
      return acc;
  
    }, {});
    // 4. Render category breakdown list into categoryBreakdown element
    categoryBreakdown.innerHTML = "";
    Object.entries(categoryTotals).forEach(
      ([category, total]) => {
        const li = document.createElement("li");
        li.textContent = `${category}: ₹${total.toFixed(2)}`;
        categoryBreakdown.appendChild(li);
      }
    );
  }
  
  /**
   * Validate checkout action
   */
  function handleCheckout() {
    // TODO: Check if cart.length === 0
     if (cart.length === 0) {
  
      cartError.textContent = "Your cart is empty.";
  
      return;
    }
    // TODO: Display error in cartError element if empty, else clear cart and show alert
     cartError.textContent = "";
      // Show alert
    alert("Checkout successful!");
  
    // Clear cart
    cart.length = 0;
  
    // Update UI
    updateCartUI();
  }
  
  // ==========================================
  // 4. EVENT LISTENERS
  // ==========================================
  document.addEventListener("DOMContentLoaded", () => {
    // Initial render
    renderProducts(inventory);
  
    // Input listeners
    searchInput.addEventListener("input", filterProducts);
    tagSelect.addEventListener("change", filterProducts);
  
    resetBtn.addEventListener("click", () => {
      searchInput.value = "";
      tagSelect.value = "ALL";
      searchError.textContent = "";
      renderProducts(inventory);
    });
  
    checkoutBtn.addEventListener("click", handleCheckout);
  }); 