// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const saveButton = document.getElementById("saveDishBtn");

    saveButton.addEventListener("click", saveDish);
});

function saveDish() {
    // Get values from the form
    const dishName = document.getElementById("dishName").value.trim();
    const servings = document.getElementById("servings").value;
    const recipe = document.getElementById("recipe").value.trim();

    // Split ingredients into an array
    const ingredients = document
        .getElementById("ingredients")
        .value
        .split("\n")
        .map(item => item.trim())
        .filter(item => item !== "");

    // Make sure required fields are filled
    if (dishName === "" || servings === "") {
        alert("Please enter a dish name and number of servings.");
        return;
    }

    // Create dish object
    const dish = {
        name: dishName,
        servings: Number(servings),
        ingredients: ingredients,
        recipe: recipe
    };

    // Save to Recipe Book
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    recipes.push(dish);

    localStorage.setItem(
        "recipes",
        JSON.stringify(recipes)
    );


// Save to Meals page
    let meals = JSON.parse(localStorage.getItem("meals")) || [];

    meals.push(dish);

    localStorage.setItem(
        "meals",
        JSON.stringify(meals)
    );

    alert("Dish saved successfully!");

    // Clear the form
    document.getElementById("dishName").value = "";
    document.getElementById("servings").value = "";
    document.getElementById("ingredients").value = "";
    document.getElementById("recipe").value = "";
}