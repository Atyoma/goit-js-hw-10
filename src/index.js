import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const name = 'united';

refs.searchBox.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

function onFormInput(e) {
  console.log(name);
}

const searchParams = 'name,capital,population,flags,languages';

fetch(`https://restcountries.com/v3.1/name/${name}?fields=${searchParams}`)
  .then(response => {
    return response.json();
  })
  .then(createCountryCard)

  // const capital = countrys.map(country => country.capital);
  // console.log(capital[0]);
  .catch(error => {
    console.log(error);
  });

// renderCountryCard(name);
// function renderCountryCard(name) {
//   const countryCard =
//     '<div class="country-title"><img src="" alt=""><h2 class ="title">${name}</h2></div><div class="coutry-card"><p class="card-text">Capital:${capital}</p><p class="card-text">Languages:${Object.values(languages)}</p><p class="card-text">Population:${population}</p></div>';
//   refs.countryInfo.innerHTML = countryCard;
//   console.log('render html');
// }
//   https://restcountries.com/v2/{service}?fields={field},{field},{field}

function createCountryCard(countrys) {
  return countrys
    .map(({ name, capital, population, flags, languages }) => {
      return (refs.countryInfo.innerHTML = `<div class="country-title"><img src="${
        flags.svg
      }" alt="${name}" width ="80"><h2 class ="title">${
        name.official
      }</h2></div><div class="coutry-card"><p class="card-text">Capital:${capital}</p><p class="card-text">Languages:${Object.values(
        languages,
      )}</p><p class="card-text">Population:${population}</p></div>`);
    })
    .join('');
}
