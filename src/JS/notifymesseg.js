import Notiflix from 'notiflix';

export class NotifyMess {
  notifySuccess(num) {
    return Notiflix.Notify.success(`Hooray! We found ${num} images.`);
  }
  notifyNotFound() {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  notifyInfo() {
    return Notiflix.Notify.info('We already found it');
  }
  notifyEmtyInput() {
    return Notiflix.Notify.failure('Please, write something');
  }
  motifyEnd() {
    return Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
  notifyFail() {
    return Notiflix.Notify.failure('API problem');
  }
}
