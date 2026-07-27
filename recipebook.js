document.addEventListener(
    "DOMContentLoaded",
    displayRecipes
);


function displayRecipes() {

    const recipes =
        JSON.parse(localStorage.getItem("recipes")) || [];


    const tableBody =
        document.getElementById("recipeTableBody");


    tableBody.innerHTML = "";


    recipes.forEach((recipe, index) => {

        const row = document.createElement("tr");


        const nameCell = document.createElement("td");
        nameCell.textContent = recipe.name;


        const ingredientsCell = document.createElement("td");
        ingredientsCell.textContent =
            recipe.ingredients.join(", ");


        const recipeCell = document.createElement("td");
        recipeCell.textContent = recipe.recipe;


        const actionCell = document.createElement("td");


        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.onclick = function() {

            editRecipe(row, recipe, index);

        };


        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.onclick = function() {

            deleteRecipe(index);

        };


        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);


        row.appendChild(nameCell);
        row.appendChild(ingredientsCell);
        row.appendChild(recipeCell);
        row.appendChild(actionCell);


        tableBody.appendChild(row);

    });

}

function editRecipe(row, recipe, index) {


    // Replace cells with inputs

    row.cells[0].innerHTML =
        `<input value="${recipe.name}" id="recipe-name-${index}">`;


    row.cells[1].innerHTML =
        `<input value="${recipe.ingredients.join(", ")}" id="recipe-ingredients-${index}">`;


    row.cells[2].innerHTML =
        `<textarea id="recipe-text-${index}">${recipe.recipe}</textarea>`;


    row.cells[3].innerHTML = "";


    const saveButton =
        document.createElement("button");


    saveButton.textContent = "Save";


    saveButton.onclick = function() {


        let recipes =
            JSON.parse(localStorage.getItem("recipes")) || [];


        recipes[index] = {

            name:
                document
                .getElementById(`recipe-name-${index}`)
                .value,


            ingredients:
                document
                .getElementById(`recipe-ingredients-${index}`)
                .value
                .split(",")
                .map(item => item.trim()),


            recipe:
                document
                .getElementById(`recipe-text-${index}`)
                .value

        };


        localStorage.setItem(
            "recipes",
            JSON.stringify(recipes)
        );


        displayRecipes();

    };


    row.cells[3].appendChild(saveButton);

}

function deleteRecipe(index) {

    let recipes =
        JSON.parse(localStorage.getItem("recipes")) || [];


    recipes.splice(index, 1);


    localStorage.setItem(
        "recipes",
        JSON.stringify(recipes)
    );


    displayRecipes();

}