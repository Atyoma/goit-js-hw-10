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

fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags
`)
  .then(response => {
    return response.json();
  })
  .then(country => {
    console.log(country);
  })
  .catch(error => {
    console.log(error);
  });

function renderCoutryCard(coutry) {
  console.log('render html');
}
//   https://restcountries.com/v2/{service}?fields={field},{field},{field}
