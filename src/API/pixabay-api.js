import axios from 'axios';

export class PixabayAPI {
  static #API_KEY = '20810720-72356cc2d71a79f29ee419399';
  static #BASE_URL = 'https://pixabay.com/api/';

  #page = 1;
  #keyword;

  constructor(keyword = '') {
    this.#keyword = keyword;
  }

  async getIMGs() {
    const optionsa = {
      url: PixabayAPI.#BASE_URL,
      params: {
        key: PixabayAPI.#API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        q: this.#keyword,
        page: this.#page,
        per_page: 40,
      },
    };

    return await axios(optionsa);
  }

  resetPage() {
    this.#page = 0;
  }

  get page() {
    return this.#page;
  }

  set page(value) {
    this.#page = value;
  }

  get keyword() {
    return this.#keyword;
  }

  set keyword(value) {
    this.#keyword = value;
  }
}
