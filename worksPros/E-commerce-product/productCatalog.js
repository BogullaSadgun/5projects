// ==========================================
// 1. DATA SOURCE
// ==========================================
const inventory = [
  { id: 101, name: "Wireless Mouse", category: "Electronics", price: 29.99, tags: ["office", "tech", "usb"] },
  { id: 102, name: "Mechanical Keyboard", category: "Electronics", price: 89.99, tags: ["gaming", "tech", "rgb"] },
  { id: 103, name: "Ergonomic Chair", category: "Furniture", price: 199.99, tags: ["office", "comfort"] },
  { id: 104, name: "Standing Desk", category: "Furniture", price: 349.99, tags: ["office", "health"] },
  { id: 105, name: "USB-C Cable Pack", category: "Electronics", price: 14.99, tags: ["tech", "cables"] }
];

// App State
let cart = [];
let arrlent = 0;

// ==========================================
// 2. DOM ELEMENTS
// ==========================================
const searchInput = document.getElementById("search-input");
const tagSelect = document.getElementById("tag-select");
const resetBtn = document.getElementById("reset-btn");

const productGrid = document.getElementById("product-grid");
const tableBody = document.getElementById("tbod");
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
  // TODO: Clear existing productGrid HTML
  // TODO: Loop through products array and build card dynamic elements or innerHTML
  for(let pro of products){
    let row = tableBody.insertRow();
    let AddBtn = document.createElement("button");
    row.classList.add("Trow");
    AddBtn.textContent = "add to cart";
    let cell1 = row.insertCell(0);
    cell1.innerText = pro.name;
    cell1.classList.add('NameCol')
    let cell2 = row.insertCell(1);
    cell2.appendChild(AddBtn);
    AddBtn.classList.add("Btadd");
    AddBtn.addEventListener("click",()=>{
      addToCart(pro.id);
    });
    cell2.classList.add("butncol");
    tableBody.append(row);
  };
  //? with the filter inside the rendering.
  // tableBody.innerHTML = "";
  // arrlent = 0;
  // const searchTerm = searchInput.value.toLowerCase().trim();
  // const selectedTag = tagSelect.value;
  // for(let pro of products){
  //   let matchesSearch = pro.name.toLowerCase().includes(searchTerm);
  //   let matchesTag = (selectedTag==="ALL")|| pro.tags.includes(selectedTag);
  //   if(matchesSearch&&matchesTag){
  //     showpro(pro);
  //     arrlent++;
  //   };
  // };
  // productCount.innerText = arrlent;
};

/**
 * Filter products based on search term (.includes) and tag (.includes)
 */
function filterProducts() {
  tableBody.innerHTML = "";
  arrlent = 0;
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedTag = tagSelect.value;

  const filterproduct = inventory.filter((pro)=>{
    let matchesSearch = pro.name.toLowerCase().includes(searchTerm);
    let matchesTag = (selectedTag==="ALL")|| pro.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  })
  
  renderProducts(filterproduct); 
  // TODO: Use Array.prototype.filter()
  // TODO: Filter items whose name .includes(searchTerm)
  // TODO: Filter items whose tags .includes(selectedTag) unless selectedTag === 'ALL'
  // TODO: Call renderProducts() with filtered results
};

/**
 * Add product object to global cart array
 * @param {number} productId 
 */
function addToCart(productId) {
  // TODO: Find product by id in inventory
  // TODO: Push to cart array
  // TODO: Call updateCartUI()
  let pro = inventory.find(item=>{
    return item.id===productId
  });
  cart.push(pro);
  updateCartUI();
}

/**
 * Update Cart DOM elements and recalculate analytics using Array.reduce()
 */
function updateCartUI() {
  // 1. Render cart items list
  cartList.innerHTML = "";
  // 2. Calculate dynamic grand total using reduce()
  // TODO: const total = cart.reduce((acc, item) => acc + item.price, 0);
cart.forEach(item=>{
  let li = document.createElement("li");
  li.textContent = `${item.name} - $${item.price}`;
  li.classList.add("cartItem");
  cartList.append(li);
})
cartTotalItems.innerText = cart.length;

let total = cart.reduce((acc,item)=>acc+item.price,0);
cartGrandTotal.innerText = total.toFixed(2);
let categoryTotals = cart.reduce((acc,item)=>{
  acc[item.category]=(acc[item.category]||0)+item.price;
  return acc;
},{});

  categoryBreakdown.innerHTML="";
  for(let cat in categoryTotals){
    let li = document.createElement('li');
    li.textContent = `${cat}: $${categoryTotals[cat].toFixed(2)}`;
    li.classList.add("CategoryItem");
    categoryBreakdown.append(li);
  }

  // 3. Group cart items by category and compute category totals using reduce()
  /* 
     TODO: 
     const categoryTotals = cart.reduce((acc, item) => {
       acc[item.category] = (acc[item.category] || 0) + item.price;
       return acc;
     }, {});
  */

  // 4. Render category breakdown list into categoryBreakdown element
}

/**
 * Validate checkout action
 */
function handleCheckout() {
  // TODO: Check if cart.length === 0
  // TODO: Display error in cartError element if empty, else clear cart and show alert
  if(cart.length===0){
    cartError.textContent = "Your cart is Empty.";
  }

  else{
    cartError.textContent="";
    alert("checkout is successfull");
    cart=[];
    updateCartUI();
  }
}

// ==========================================
// 4. EVENT LISTENERS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // Initial render
  // renderProducts(inventory);
  filterProducts();

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