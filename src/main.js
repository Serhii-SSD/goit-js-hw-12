import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const searchForm = document.querySelector('.form');

searchForm.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const searchQuery = form.elements['search-text'].value.trim();

  if (searchQuery === "") {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
      position: 'topRight'
    });
    return;
  }

  clearGallery();
  showLoader();
  
  getImagesByQuery(searchQuery)
    .then(images => {
      if (images.length === 0) {
        iziToast.error({
          message: 'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          timeout: 5000
        });
        return;
      }

      createGallery(images);
      form.reset(); 
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
        position: 'topRight'
      });
    })
    .finally(() => {
      hideLoader();
    });
}
