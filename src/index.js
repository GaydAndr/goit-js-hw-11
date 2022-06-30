import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { PixabayAPI } from './API/pixabay-api';
import { createMarkUp } from './JS/create-markup';
import { NotifyMess } from './JS/notifymesseg';

//--------------------------

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  target: document.querySelector('.target'),
};

refs.form.addEventListener('submit', searchImages);

const pixabayAPI = new PixabayAPI();
const notifyMess = new NotifyMess();

const obs = new IntersectionObserver(onObs, {
  rootMargin: '200px',
});

let totalHits = 0;

//----------------------------------

function searchImages(event) {
  event.preventDefault();

  const { searchQuery } = event.currentTarget.elements;
  const keyword = searchQuery.value.trim();

  if (keyword === '') {
    return notifyMess.notifyEmtyInput();
  } else if (pixabayAPI.keyword === keyword) {
    return notifyMess.notifyInfo();
  }

  refs.gallery.innerHTML = '';

  totalHits = 0;
  pixabayAPI.page = 1;
  pixabayAPI.keyword = keyword;

  pixabayAPI.getIMGs().then(handleSuccess).catch(handleError);
}

//----------------------------------

function handleSuccess(response) {
  totalHits = response.data.totalHits;

  if (!totalHits) {
    return notifyMess.notifyNotFound();
  } else if (pixabayAPI.page === 1) {
    notifyMess.notifySuccess(totalHits);
  }

  refs.gallery.insertAdjacentHTML(
    'beforeend',
    createMarkUp(response.data.hits)
  );
  lightbox = new SimpleLightbox('.photo-card a');

  obs.observe(refs.target);
}

//----------------------------------

function handleError(error) {
  console.log(error);
  notifyMess.notifyFail();
}

//----------------------------------

function onObs(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      pixabayAPI.page += 1;

      if (pixabayAPI.page * 40 > totalHits) {
        obs.unobserve(refs.target);
        return notifyMess.motifyEnd();
      }

      pixabayAPI.getIMGs().then(handleSuccess).catch(handleError);
      lightbox.refresh();
    }
  });
}
