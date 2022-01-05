const api = function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}?fields=${url}`).then(response => {
    if (!response.ok) {
      return;
    }
    return response.json();
  });
};
const url = 'name,capital,population,flags,languages';

export { api, url };
