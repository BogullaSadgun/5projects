const recipes = [
  { id: "R1", title: "Avocado Toast", ingredients: ["bread", "avocado", "egg", "salt"], calories: 350, prepTime: 10 },
  { id: "R2", title: "Chicken Salad", ingredients: ["chicken", "lettuce", "tomato", "olive oil"], calories: 420, prepTime: 20 },
  { id: "R3", title: "Veggie Stir Fry", ingredients: ["tofu", "broccoli", "soy sauce", "rice"], calories: 500, prepTime: 25 },
  { id: "R4", title: "Egg Fried Rice", ingredients: ["rice", "egg", "soy sauce", "onion"], calories: 450, prepTime: 15 }
];

//* global array
let dayMealPlan = [];

//* fetching all the elements
const ingredientInput = document.getElementById("ingredientInput");
const findRecipesBtn = document.getElementById("findRecipesBtn");
const clearPantryBtn = document.getElementById("clearPantryBtn");

const recipeCount = document.getElementById("recipeCount");
const recipeList = document.getElementById("recipeList");

const mealPlanList = document.getElementById("mealPlanList");
const totalCalories = document.getElementById("totalCalories");
const totalPrepTime = document.getElementById("totalPrepTime");
const clearMealPlanBtn = document.getElementById("clearMealPlanBtn");

//* correctinput word funciton
function validateInput(text){
  let allowed = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ, ";
  for (let i = 0; i < text.length; i++){
    if (!allowed.includes(text[i])){
      return false;
    };
  };
  return true;
};

//* reder the recipies 
function renderRecipes(list){
  recipeList.innerHTML = "";
  recipeCount.textContent = list.length;

  if (list.length === 0){
    let emptyMsg = document.createElement("p");
    emptyMsg.textContent = "No matching recipes found.";
    emptyMsg.classList.add("empty-plan-box");
    recipeList.append(emptyMsg);
    return;
  };

  list.forEach(recipe =>{
    let card = document.createElement("div");
    card.classList.add("employee-card");

    let title = document.createElement("h4");
    title.textContent = recipe.title;

    let ingredientsPara = document.createElement("p");
    ingredientsPara.textContent = "Ingredients: " + recipe.ingredients.join(", ");

    let statsPara = document.createElement("p");
    statsPara.textContent = "Calories: " + recipe.calories + " Kcal | Prep: " + recipe.prepTime + " mins";

    let addBtn = document.createElement("button");
    addBtn.textContent = "Add to Day Plan";
    addBtn.classList.add("btn", "btn-primary");
    addBtn.style.marginTop = "8px";

    addBtn.addEventListener("click", () =>{
      addToMealPlan(recipe);
    });
    card.append(title, ingredientsPara, statsPara, addBtn);
    recipeList.append(card);
  });
};

//* recipei filtering
function filterRecipes(){
  let rawText = ingredientInput.value.trim();

  if (rawText !== "" && !validateInput(rawText)){
    alert("Please enter only letters and commas (no numbers or special characters).");
    return;
  };

  if (rawText === ""){
    renderRecipes(recipes);
    return;
  };

  let userIngredients = rawText.split(",").map(item => item.trim().toLowerCase()).filter(item=>item !== "");

  let matched = recipes.filter(recipe =>{
    let recipeIngredientsLower = recipe.ingredients.map(ing => ing.toLowerCase());
    return userIngredients.every(userIng => recipeIngredientsLower.includes(userIng));
  });

  if (matched.length === 0){
    alert("No recipes match all specified pantry ingredients!");
  };

  renderRecipes(matched);
};

//* rederign the mealPlan
function renderMealPlan(){
  mealPlanList.innerHTML = "";
  if (dayMealPlan.length === 0){
    let emptyPara = document.createElement("p");
    emptyPara.textContent = "No recipes added to plan yet";
    mealPlanList.append(emptyPara);
  } 
	else{
    dayMealPlan.forEach(recipe => {
      let item = document.createElement("p");
      item.textContent = "• " + recipe.title + " (" + recipe.calories + " Kcal)";
      mealPlanList.append(item);
    });
  };

  let totalCals = dayMealPlan.reduce((acc, recipe)=>{
    return acc + recipe.calories;
  },0);

  let totalTime = dayMealPlan.reduce((acc, recipe)=>{
    return acc + recipe.prepTime;
  },0);

  totalCalories.textContent = totalCals +" Kcal";
  totalPrepTime.textContent = totalTime +" mins";
}

//*adding the recipie and showing the meals
function addToMealPlan(recipe) {
  dayMealPlan.push(recipe);
  renderMealPlan();
}

//* clearing the data and showing the recipies
function clearPantry() {
  ingredientInput.value = "";
  renderRecipes(recipes);
}

//* clearint the meals and showing all the recipies
function clearMealPlan() {
  dayMealPlan = [];
  renderMealPlan();
}

document.addEventListener("DOMContentLoaded", () => {
  renderRecipes(recipes);
  renderMealPlan();
  findRecipesBtn.addEventListener("click", filterRecipes);
  clearPantryBtn.addEventListener("click", clearPantry);
  clearMealPlanBtn.addEventListener("click", clearMealPlan);
});