const api = function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}?fields=${url}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  });
};
const url = 'name,capital,population,flags,languages';

export { api, url };
