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
        studentFriendlyElement.textContent = rec.studentFriendly ? "Ja" : "Nej";
      } else {
        console.warn("Student friendly element not found");
      }

      // Display ingredients
      const ingredientsList = clone.querySelector("[data-ingredients]");
      ingredientsList.innerHTML = ""; // Clear previous ingredients
      if (Array.isArray(rec.ingredients)) {
        rec.ingredients.forEach((ingredient) => {
          const li = document.createElement("li");
          li.textContent = ingredient;
          ingredientsList.appendChild(li);
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
