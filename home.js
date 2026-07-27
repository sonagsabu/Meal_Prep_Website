document.addEventListener("DOMContentLoaded", () => {

    loadMealPlan();
    loadWeeklyMeals();

    const mealSlots = document.querySelectorAll(".meal-slot");

    mealSlots.forEach(slot => {

        slot.addEventListener("click", () => {

            chooseDish(slot);

        });

    });


    // New week button
    const newWeekButton = document.getElementById("newWeekButton");

    newWeekButton.addEventListener("click", clearWeek);

});


// Shows saved meals on the calendar
function loadMealPlan() {

    const mealPlan = JSON.parse(localStorage.getItem("mealPlan")) || {};

    const mealSlots = document.querySelectorAll(".meal-slot");


    mealSlots.forEach(slot => {

        const key = `${slot.dataset.day}-${slot.dataset.meal}`;

        if (mealPlan[key]) {
            slot.textContent = mealPlan[key];
        }

    });

}


// Allows user to pick a dish
function chooseDish(slot) {

    const meals = JSON.parse(localStorage.getItem("meals")) || [];

    const mealPlan = JSON.parse(localStorage.getItem("mealPlan")) || {};


    if (meals.length === 0) {

        alert("No meals available. Select dishes from your Recipe Book first.");

        return;

    }


    // Display available meals
    let options = meals
        .map((meal, index) =>
            `${index + 1}. ${meal.name} (${meal.servings} servings available)`
        )
        .join("\n");


    const choice = prompt(
        `Choose a meal:\n\n${options}`
    );


    const index = Number(choice) - 1;


    if (!meals[index]) {

        return;

    }


    const selectedMeal = meals[index];


    // Count how many times this meal is already used
    let used = 0;


    for (const key in mealPlan) {

        if (mealPlan[key] === selectedMeal.name) {

            used++;

        }

    }


    // Stop if servings are exceeded
    if (used >= selectedMeal.servings) {

        alert(
            `${selectedMeal.name} only has ${selectedMeal.servings} servings available.`
        );

        return;

    }


    // Add meal to calendar
    slot.textContent = selectedMeal.name;


    saveMeal(
        slot.dataset.day,
        slot.dataset.meal,
        selectedMeal.name
    );

}


// Saves calendar choices
function saveMeal(day, meal, dish) {

    const mealPlan = JSON.parse(localStorage.getItem("mealPlan")) || {};


    const key = `${day}-${meal}`;


    mealPlan[key] = dish;


    localStorage.setItem(
        "mealPlan",
        JSON.stringify(mealPlan)
    );

}

function clearWeek() {

    const confirmReset = confirm(
        "Start a new week? This will clear your weekly meals and calendar."
    );


    if (!confirmReset) {
        return;
    }


    // Clear home calendar
    localStorage.removeItem("mealPlan");


    // Clear weekly meals
    localStorage.removeItem("meals");


    // Clear calendar cells
    const mealSlots = document.querySelectorAll(".meal-slot");


    mealSlots.forEach(slot => {

        slot.textContent = "";

    });


    alert("New week started!");

}

function loadWeeklyMeals() {

    const meals =
        JSON.parse(localStorage.getItem("meals")) || [];

    const list =
        document.getElementById("weeklyMealsList");

    list.innerHTML = "";


    meals.forEach(meal => {

        const li = document.createElement("li");

        li.innerHTML =
            `<strong>${meal.name}</strong><br>
             ${meal.servings} servings`;

        list.appendChild(li);

    });

}