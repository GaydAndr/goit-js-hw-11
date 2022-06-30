export function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v2/name/';
  const options = '?fields=name,capital,population,flags,languages';
  return fetch(`${BASE_URL}${name}${options}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
