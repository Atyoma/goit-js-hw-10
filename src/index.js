import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { api, url } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

let maxCountry = 10;
refs.searchBox.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

function onFormInput(e) {
  // console.log(e.target.value);
  const stringValue = refs.searchBox.value.trim();
  if (stringValue === '') {
    return onClearInput();
  }
  console.log(stringValue);
  api(stringValue).then(createCountryCard).catch(onFetchErrror);
}

function createCountryCard(countrys) {
  console.log(countrys.length);
  if (countrys.length > maxCountry) {
    onClearInput();
    Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);
    return;
  } else if (countrys.length < 10 && countrys.length !== 1) {
    const markup = countrys
      .map(
        country =>
          `<li class="country-item"><div class="country-title"><img src="${country.flags.svg}" alt="${country.name}" width ="40"><h2 class ="title">${country.name.official}</h2></div></li>`,
      )
      .join('');
    onClearInput();
    refs.countryList.insertAdjacentHTML('beforeend', markup);
  } else {
    onClearInput();
    return countrys
      .map(({ name, capital, population, flags, languages }) => {
        return (refs.countryInfo.innerHTML = `<div class="country-title"><img src="${
          flags.svg
        }" alt="${name}" width ="80"><h2 class ="title">${
          name.official
        }</h2></div><div class="coutry-card"><p class="card-text">Capital: ${capital}</p><p class="card-text">Languages: ${Object.values(
          languages,
        )}</p><p class="card-text">Population: ${population}</p></div>`);
      })
      .join('');
  }
}

function onFetchErrror(error) {
  onClearInput();
  Notiflix.Notify.failure(`❌ Oops, there is no country with that name`);
}

function onClearInput() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}
