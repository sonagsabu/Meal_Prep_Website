document.addEventListener(
    "DOMContentLoaded",
    loadCart
);


function loadCart() {

    const meals =
        JSON.parse(localStorage.getItem("meals")) || [];


    const cartList =
        document.getElementById("cartList");


    cartList.innerHTML = "";


    if (meals.length === 0) {

        cartList.innerHTML =
            "<li>No meals selected for this week.</li>";

        return;

    }


    let ingredients = [];


    meals.forEach(meal => {

        meal.ingredients.forEach(item => {

            ingredients.push(item);

        });

    });


    ingredients.forEach(item => {

        const li = document.createElement("li");

        li.textContent = item;

        cartList.appendChild(li);

    });

}