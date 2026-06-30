import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const loaderElement = document.querySelector('.loader');

const galleryContainer = document.querySelector('.gallery');
let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});
function createImageCardMarkup({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
    return `
<li class="gallery-item">
<a class="gallery-link" href="${largeImageURL}">
<img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
</a>
<div class="info">
<p class="info-item"><b>Likes</b><span>${likes}</span></p>
<p class="info-item"><b>Views</b><span>${views}</span></p>
<p class="info-item"><b>Comments</b><span>${comments}</span></p>
<p class="info-item"><b>Downloads</b><span>${downloads}</span></p>
</div>
</li>
`;    
}

export function createGallery(images) {
    const markup = images.map(createImageCardMarkup).join('');
    galleryContainer.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}
export function clearGallery() {
    galleryContainer.innerHTML = '';

}
export function showLoader() {
    loaderElement.style.display = 'block';
}

export function hideLoader() {
    loaderElement.style.display = 'none';
}