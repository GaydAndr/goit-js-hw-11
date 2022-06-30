import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(event) {
  const countriName = event.target.value.trim();

  countryList.innerHTML = '';
  countryInfo.innerHTML = '';

  if (countriName !== '') {
    fetchCountries(countriName)
      .then(createMarkUp)
      .catch(() =>
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
  }
}

function createMarkUp(arr) {
  if (arr.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (arr.length < 2) {
    countryInfo.innerHTML = createCountryCard(arr);
  } else {
    countryList.innerHTML = createCountryList(arr);
  }
}

function createCountryList(countries) {
  return countries
    .map(item => {
      return `
    <li class='country-item'>
        <img class = 'item-flag'
          src = ${item.flags.png}
          alt = ${item.name}
          width = '60px'>
        <p class = 'item-name'>${item.name}</p>
    </li>
    `;
    })
    .join('');
}

function createCountryCard(country) {
  return `
  <h2>
    <img class = ''
      src = ${country[0].flags.png}
      alt = ${country[0].name}
      width = '40px'>
    ${country[0].name}
  </h2>
  <p>
    Capital:
    <span>${country[0].name}</span>
  </p>
  <p>
    Population:
    <span>${country[0].population}</span>
  </p>
  <p>
    Languages:
    <span>
      ${country[0].languages.map(item => item.name).join(', ')}
    </span>
  </p>
  `;
}
