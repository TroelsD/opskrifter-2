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

export async function createRecipe(recipe) {
  let headersList = {
    Accept: "application/json",
    apikey: apikey,
    Prefer: "return=representation",
    "Content-Type": "application/json",
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