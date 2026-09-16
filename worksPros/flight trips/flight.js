const flights = [
  { flightNo: "AA-101", origin: "JFK", destination: "LAX", price: 300, amenities: ["WiFi", "Meals", "Power"] },
  { flightNo: "UA-202", origin: "JFK", destination: "SFO", price: 350, amenities: ["Meals"] },
  { flightNo: "DL-303", origin: "ORD", destination: "LAX", price: 250, amenities: ["WiFi", "Entertainment"] },
  { flightNo: "SW-404", origin: "JFK", destination: "LAX", price: 280, amenities: ["Power"] }
];

//global arr for main use
let selectedItinerary=[];

const originSelect = document.getElementById("originSelect");
const destSelect = document.getElementById("destSelect");
const maxPriceInput = document.getElementById("maxPriceInput");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");

const flightCount = document.getElementById("flightCount");
const flightErrorMsg = document.getElementById("flightErrorMsg");
const flightList = document.getElementById("flightList");

const itineraryList = document.getElementById("itineraryList");
const subtotalCost = document.getElementById("subtotalCost");
const taxCost = document.getElementById("taxCost");
const grandTotalCost = document.getElementById("grandTotalCost");
const clearItineraryBtn = document.getElementById("clearItineraryBtn");

const jumpScare = document.getElementById("jumpScare");
const screamSound = document.getElementById("screamSound");

function renderFlights(lists){
  flightList.innerHTML = "";
  flightCount.textContent = lists.length;

  if(lists.length===0){
    flightErrorMsg.style.display="block";
    flightErrorMsg.textContent = "No matching flights found in this criteria."
    return;
  }
  else{
    flightErrorMsg.style.display="none";
    flightErrorMsg.textContent="";
  }

  lists.forEach(flight => {
    let card = document.createElement("div");
    card.classList.add("employee-card");

    let title = document.createElement("h4");
    title.textContent = flight.flightNo+" ("+flight.origin+"->"+flight.destination+")";
    
    let pricePara = document.createElement("p");
    pricePara.textContent = "Price : $"+flight.price;

    let amenitiesPara = document.createElement("p");
    amenitiesPara.textContent = "Amenities: "+flight.amenities.join(", "); 

    let bookBtn = document.createElement("button");
    bookBtn.textContent = "Book Now";
    bookBtn.classList.add("btn", "btn-facebook");
    bookBtn.style.marginTop = "8px";

    bookBtn.addEventListener("click",() =>{
      addToItinerary(flight);
    });
    card.append(title, pricePara, amenitiesPara, bookBtn);
    flightList.append(card);
  });
};

function renderItinerary(){
  itineraryList.innerHTML = "";
  if (selectedItinerary.length === 0){
    let emptyMsg = document.createElement("p");
    emptyMsg.textContent = "No flights added to itinerary";
    itineraryList.append(emptyMsg);
  } 
  else{
    selectedItinerary.forEach(flight => {
      let item = document.createElement("p");
      item.textContent = "• "+flight.flightNo+": "+flight.origin+" to "+flight.destination+" ($"+flight.price+")";
      itineraryList.append(item);
    });
  };


let subtotal = selectedItinerary.reduce((acc,flight)=>{
  return acc+flight.price;
},0);

let tax = subtotal * 0.10;
let grandTotal = subtotal + tax;

//! jump scare start------------------
if (grandTotal >= 1000) {
  jumpScare.style.display = "block";
  screamSound.currentTime = 0;
  screamSound.play();
  setTimeout(() => {
      jumpScare.style.display = "none";
      screamSound.pause();
      screamSound.currentTime = 0;
  }, 1500);
}
//! jumpscare finsih----------------
subtotalCost.textContent = "$"+subtotal.toFixed(2);
  taxCost.textContent = "$"+tax.toFixed(2);
  grandTotalCost.textContent = "$"+grandTotal.toFixed(2);
};

function addToItinerary(flight) {
  selectedItinerary.push(flight);
  renderItinerary();
};

function resetFilters(){
  originSelect.value = "All";
  destSelect.value = "All";
  maxPriceInput.value = "";

  let checkboxes = document.querySelectorAll(".seat-class-checkbox");
  checkboxes.forEach(cb=>{
    cb.checked = false;
  });
  renderFlights(flights);
};

function clearItinerary(){
  selectedItinerary = [];
  renderItinerary();
};

function validatePassengerName(name){
  let trimmedName = name.trim();
  if (trimmedName.length < 3){
    return false;
  };
  return true;
};

function validatePassportNumber(passport) {
  let allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let cleaned = passport.trim();
  if (cleaned.length !== 9){
    return false;
  };
  for (let i = 0; i < cleaned.length; i++){
    if (!allowedChars.includes(cleaned[i])){
      return false;
    };
  };
  return true;
};

function processBooking(passengerName,passportNumber){
  if(!validatePassengerName(passengerName)){
    alert("Invalid Passenger Name: Must be at least 3 characters long.");
    return false;
  };
  if(!validatePassportNumber(passportNumber)){
    alert("Invalid Passport Number: Must be exactly 9 alphanumeric characters (e.g., A12345678).");
    return false;
  };

  if(selectedItinerary.length === 0){
    alert("Your itinerary is empty. Please select at least one flight.");
    return false;
  };
  alert("Booking successful for "+passengerName.trim() +"!");
  clearItinerary();
  return true;
};

function filterFlights(){
  let selectedOrigin = originSelect.value;
  let selectedDest = destSelect.value;
  let maxPrice = parseFloat(maxPriceInput.value);

  let checkedBoxes = document.querySelectorAll(".seat-class-checkbox:checked");
  let selectedAmenities = [];
  
  checkedBoxes.forEach(cb=>{
    selectedAmenities.push(cb.value);
  });

  let filtered = flights.filter(flight=>{
    let matchesOrigin = (selectedOrigin === "All" || flight.origin === selectedOrigin);
    let matchesDest = (selectedDest === "All" || flight.destination === selectedDest);
    let matchesPrice = isNaN(maxPrice) || flight.price <= maxPrice;
    let matchesAmenities = selectedAmenities.every(amenity=>{
      return flight.amenities.includes(amenity);
    });
    return matchesOrigin && matchesDest && matchesPrice && matchesAmenities;
  });
  renderFlights(filtered);
};

document.addEventListener("DOMContentLoaded",()=>{
  renderFlights(flights);
  renderItinerary();
  searchBtn.addEventListener("click", filterFlights);
  resetBtn.addEventListener("click", resetFilters);
  clearItineraryBtn.addEventListener("click", clearItinerary);
});
