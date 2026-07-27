document.addEventListener("DOMContentLoaded", () => {

    displayDishes();

    document
        .getElementById("selectDishButton")
        .addEventListener("click", selectDish);

});


function displayDishes() {

    const dishes = JSON.parse(localStorage.getItem("meals")) || [];

    const tableBody = document.getElementById("mealTableBody");

    tableBody.innerHTML = "";


    dishes.forEach((dish, index) => {

        const row = document.createElement("tr");


        const nameCell = document.createElement("td");

        nameCell.classList.add("dish-name-card");


        const dishName = document.createElement("span");

        dishName.textContent = dish.name;


        nameCell.appendChild(dishName);


        // Servings
        const servingsCell = document.createElement("td");
        servingsCell.textContent = dish.servings;


        // Ingredients
        const ingredientsCell = document.createElement("td");
        ingredientsCell.textContent =
            dish.ingredients.join(", ");


        // Recipe
        const recipeCell = document.createElement("td");
        recipeCell.textContent = dish.recipe;


        // Actions
        const actionCell = document.createElement("td");


        const editButton = document.createElement("button");

        editButton.textContent = "Edit";


        editButton.onclick = function() {

            editRow(
                row,
                dish,
                index
            );

        };


        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";


        deleteButton.onclick = function() {

            deleteMeal(dish.name);

        };


        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);


        row.appendChild(nameCell);
        row.appendChild(servingsCell);
        row.appendChild(ingredientsCell);
        row.appendChild(recipeCell);
        row.appendChild(actionCell);


        tableBody.appendChild(row);

    });

}

function editRow(row, dish, index) {


    // Replace cells with inputs

    row.cells[0].innerHTML =
        `<input value="${dish.name}" id="name-${index}">`;


    row.cells[1].innerHTML =
        `<input type="number" value="${dish.servings}" id="servings-${index}">`;


    row.cells[2].innerHTML =
        `<input value="${dish.ingredients.join(", ")}" id="ingredients-${index}">`;


    row.cells[3].innerHTML =
        `<textarea id="recipe-${index}">${dish.recipe}</textarea>`;


    row.cells[4].innerHTML = "";


    const saveButton = document.createElement("button");

    saveButton.textContent = "Save";


    saveButton.onclick = function() {


        let meals =
            JSON.parse(localStorage.getItem("meals")) || [];


        meals[index] = {

            name:
                document.getElementById(`name-${index}`).value,


            servings:
                Number(
                    document.getElementById(`servings-${index}`).value
                ),


            ingredients:
                document
                .getElementById(`ingredients-${index}`)
                .value
                .split(",")
                .map(item => item.trim()),


            recipe:
                document.getElementById(`recipe-${index}`).value

        };


        localStorage.setItem(
            "meals",
            JSON.stringify(meals)
        );
        
        
        // Remove old meal from Home calendar
        removeFromCalendar(dish.name);
        
        
        displayDishes();

    };


    row.cells[4].appendChild(saveButton);

}

function deleteMeal(name) {

    let meals =
        JSON.parse(localStorage.getItem("meals")) || [];


    meals = meals.filter(
        meal => meal.name !== name
    );


    localStorage.setItem(
        "meals",
        JSON.stringify(meals)
    );


    displayDishes();

}

function selectDish() {

    // Get recipes from Recipe Book
    const recipes =
        JSON.parse(localStorage.getItem("recipes")) || [];


    if (recipes.length === 0) {

        alert("Your Recipe Book is empty.");

        return;

    }


    // Display recipe options

    let options = recipes
        .map((recipe, index) =>
            `${index + 1}. ${recipe.name}`
        )
        .join("\n");


    const choice = prompt(
        `Select a dish:\n\n${options}`
    );


    const index = Number(choice) - 1;


    if (!recipes[index]) {

        return;

    }


    const selectedRecipe = recipes[index];


    // Ask servings

    const servings = prompt(
        `How many servings of ${selectedRecipe.name} do you want?`
    );


    const servingsNumber = Number(servings);


    if (
        !servingsNumber ||
        servingsNumber <= 0
    ) {

        alert("Invalid serving amount.");

        return;

    }


    // Create weekly meal version

    const meal = {

        name: selectedRecipe.name,

        servings: servingsNumber,

        ingredients: selectedRecipe.ingredients,

        recipe: selectedRecipe.recipe

    };


    // Add to Meals page

    let meals =
        JSON.parse(localStorage.getItem("meals")) || [];


    meals.push(meal);


    localStorage.setItem(
        "meals",
        JSON.stringify(meals)
    );


    displayDishes();


}
function editMeal(name) {

    let meals =
        JSON.parse(localStorage.getItem("meals")) || [];


    const meal = meals.find(
        meal => meal.name === name
    );


    if (!meal) {
        return;
    }


    // Edit name
    const newName = prompt(
        "Edit dish name:",
        meal.name
    );


    if (!newName) {
        return;
    }


    // Edit servings
    const newServings = prompt(
        "Edit servings:",
        meal.servings
    );


    if (!newServings || Number(newServings) <= 0) {

        alert("Invalid serving amount.");

        return;

    }


    // Edit ingredients
    const newIngredients = prompt(
        "Edit ingredients (separate with commas):",
        meal.ingredients.join(", ")
    );


    if (!newIngredients) {
        return;
    }


    // Edit recipe
    const newRecipe = prompt(
        "Edit recipe:",
        meal.recipe
    );


    if (!newRecipe) {
        return;
    }


    // Save changes
    meal.name = newName;

    meal.servings = Number(newServings);

    meal.ingredients =
        newIngredients
        .split(",")
        .map(item => item.trim());

    meal.recipe = newRecipe;



    localStorage.setItem(
        "meals",
        JSON.stringify(meals)
    );


    displayDishes();

}

function removeFromCalendar(name) {

    let mealPlan =
        JSON.parse(localStorage.getItem("mealPlan")) || {};


    for (const key in mealPlan) {

        if (mealPlan[key] === name) {

            delete mealPlan[key];

        }

    }


    localStorage.setItem(
        "mealPlan",
        JSON.stringify(mealPlan)
    );

}