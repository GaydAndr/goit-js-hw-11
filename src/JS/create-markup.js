export function createMarkUp(data) {
  // console.log(data);

  return data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
          <div class="photo-card">
            <a class="gallery__item" href="${largeImageURL}">
              <img class="gallery__image"
                src="${webformatURL}" 
                alt="${tags}"
                loading="lazy"/>
            </a>
            <div class="info">
              <p class="info-item">
                <span>Likes</span>
                <span>${likes}</span>
              </p>
              <p class="info-item">
                <span>Views</span>
                <span>${views}</span>
              </p>
              <p class="info-item">
                <span>Comments</span>
                <span>${comments}</span>
              </p>
              <p class="info-item">
                <span>Downloads</span>
                <span>${downloads}</span>
              </p>
            </div>
          </div>
        `;
      }
    )
    .join('');
}
