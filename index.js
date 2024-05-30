import {
  createRecipe,
  getRecipes,
  deleteRecipe,
  updateRecipe,
} from "./modules/data.js";

import { setupCountries } from "./modules/setup.js";

setupCountries();

async function showRecipes() {
  try {
    const response = await getRecipes();
    console.table(response);

    const template = document.querySelector("template").content;
    const parent = document.querySelector(".recipes");
    parent.innerHTML = "";

    response.forEach((rec) => {
      const clone = template.cloneNode(true);
      console.log("Recipe:", rec); // Debugging statement

      // Display title (name)
      const titleElement = clone.querySelector("[data-name]");
      if (titleElement) {
        titleElement.textContent = rec.name || "No title"; // Ensure title is not empty
      } else {
        console.warn("Title element not found");
      }

      clone.querySelector("[data-description]").textContent = rec.description;


      // Display origin
      const originElement = clone.querySelector("[data-origin]");
      if (originElement) {
        originElement.textContent = rec.origin || "Unknown";
      } else {
        console.warn("Origin element not found");
      }

     

      // Display diet
      const dietElement = clone.querySelector("[data-diet]");
      if (dietElement) {
        dietElement.textContent = rec.diet || "Not specified";
      } else {
        console.warn("Diet element not found");
      }

      // Display student-friendly status
      const studentFriendlyElement = clone.querySelector("[data-studentFriendly]");
      if (studentFriendlyElement) {
        studentFriendlyElement.textContent = rec.studentFriendly ? "Ja den er studentervenlig!" : "Nej den er desværre ikke studentervenlig!";
      } else {
        console.warn("Student friendly element not found");
      }
      // Add studentFriendly status to the clone
const statusElement = clone.querySelector(".status");
statusElement.innerHTML = ""; // Clear previous content
const studentFriendlyStatus = rec.studentFriendly ? "Ja" : "Nej";
statusElement.innerHTML = `<h4>Studentervenlig?</h4><span>${studentFriendlyStatus}</span>`;


      // Display ingredients
      const ingredientsList = clone.querySelector("[data-ingredients]");
      ingredientsList.innerHTML = ""; // Clear previous ingredients
      if (Array.isArray(rec.ingredients)) {
        rec.ingredients.forEach((ingredient) => {
          const li = document.createElement("li");
          li.textContent = ingredient;
          ingredientsList.appendChild(li);
          // Add ingredients to the clone
const ingredientList = clone.querySelector("[data-ingredients]");
ingredientList.innerHTML = ""; // Clear previous content
const ingredients = rec.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("");
ingredientList.innerHTML = `<h4>Ingredienser:</h4><ul>${ingredients}</ul>`;

        });
      }

      const allergensList = clone.querySelector("[data-allergens]");
      allergensList.innerHTML = ""; // Clear previous allergens
      if (Array.isArray(rec.allergens)) {
        rec.allergens.forEach((allergen) => {
          const li = document.createElement("li");
          li.textContent = allergen;
          allergensList.appendChild(li);

          // Add allergens to the clone
const allergenList = clone.querySelector("[data-allergens]");
allergenList.innerHTML = ""; // Clear previous content
const allergens = rec.allergens.map((allergen) => `<li>${allergen}</li>`).join("");
allergenList.innerHTML = `<h4>Allergener:</h4><ul>${allergens}</ul>`;

        });
      }

      clone.querySelectorAll("[data-id]").forEach((e) => (e.dataset.id = rec.id));
      clone
        .querySelector("button[data-action='delete']")
        .addEventListener("click", async () => {
          await deleteRecipe(rec.id);
          await showRecipes();
        });
      clone
        .querySelector("button[data-action='update']")
        .addEventListener("click", async () => {
          await updateRecipe(rec.id, !rec.studentFriendly);
          await showRecipes();
        });
      parent.appendChild(clone);
    });
  } catch (error) {
    console.error("Error showing recipes:", error);
  }
}
showRecipes();

function handleSubmit() {
  const form = document.querySelector("form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const recipe = {
      name: formData.get("name"),
      description: formData.get("description"),
      ingredients: formData.get("ingredients").split("\n").filter(Boolean),
      serves: formData.get("serves"),
      allergens: formData.get("allergens").split("\n").filter(Boolean),
      diet: formData.get("diet"),
      studentFriendly: formData.get("studentFriendly") === 'yes', // Ensure boolean value
      origin: formData.get("origin"),
    };

    console.log("Recipe Object to be created:", recipe); // Debugging log

    try {
      await createRecipe(recipe);
      showRecipes();
      form.reset();
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  });
}
handleSubmit();
