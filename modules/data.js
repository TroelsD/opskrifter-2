import { apikey, endpoint } from "./settings.js";
export async function getRecipes() {
  let headersList = {
    Accept: "application/json",
    apikey: apikey,
  };

  let response = await fetch(endpoint, {
    method: "GET",
    headers: headersList,
  });

  let data = await response.json();
  return data;
}
//WET - Write Everything Twice
//DRY - Don't Repeat Yourself
//AHA - Avoid Hasty Abstractions

export async function createRecipe(formData) {
  const recipe = {
    name: formData.get('name'),
    description: formData.get('description'),
    diet: formData.get('diet'),
    origin: formData.get('origin'),
    serves: formData.get('serves'),
    studentFriendly: formData.get('studentFriendly') === 'yes',
    ingredients: formData.get('ingredients').split('\n'),
    allergens: formData.get('allergens').split('\n'),
  };

  let bodyContent = JSON.stringify(recipe);

  let response = await fetch(endpoint, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.text();
  console.log(data);
}

export async function deleteRecipe(id) {
  let headersList = {
    Accept: "application/json",
    apikey: apikey,
    Prefer: "return=representation",
  };

  let response = await fetch(endpoint + "?id=eq." + id, {
    method: "DELETE",
    headers: headersList,
  });

  let data = await response.json();
  return data;
}
export async function updateRecipe(id, state = true) {
  let headersList = {
    Accept: "application/json",
    apikey: apikey,
    Prefer: "return=representation",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    studentFriendly: state,
  });

  let response = await fetch(endpoint + "?id=eq." + id, {
    method: "PATCH",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  return data;
}