import { countries } from "./countries.js";

export async function setupCountries() {
  const list = document.querySelector("#countrylist");
  const frgmt = document.createDocumentFragment();
  countries.forEach((c) => {
    const option = document.createElement("option");
    option.value = c.name;
    frgmt.appendChild(option);
  });
  list.appendChild(frgmt);
}