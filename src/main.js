import { getImagesByQuery } from './js/pixabay-api.js';
import { 
  createGallery, 
  clearGallery, 
  showLoader, 
  hideLoader, 
  showLoadMoreButton, 
  hideLoadMoreButton 
} from './js/render-functions.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const searchForm = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more-btn');

let searchQuery = '';
let currentPage = 1;
const perPage = 15;

searchForm.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  searchQuery = form.elements['search-text'].value.trim();

  if (searchQuery === "") {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
      position: 'topRight'
    });
    return;
  }

  currentPage = 1;  
  
  clearGallery(); 
  hideLoadMoreButton(); 
  showLoader();      
  
  try {
    const data = await getImagesByQuery(searchQuery, currentPage);
    const images = data.hits;
    const totalHits = data.totalHits;

    if (images.length === 0) {
      hideLoader(); 
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        timeout: 5000
      });
      return;
    }

    createGallery(images);
    form.reset(); 
    checkPaginationStatus(totalHits, false); 

  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight'
    });
  } finally {
    hideLoader();
  }
}

async function handleLoadMore() {
  currentPage += 1; 
  
  hideLoadMoreButton(); 
  showLoader();      

  try {
    const data = await getImagesByQuery(searchQuery, currentPage);
    const images = data.hits;
    const totalHits = data.totalHits;
    
    createGallery(images);
    smoothScroll();
    checkPaginationStatus(totalHits, true); 
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch more images.',
      position: 'topRight'
    });
  } finally {
    hideLoader();
  }
}

function checkPaginationStatus(totalHits, isLoadMoreAction) {
  const maxPages = Math.ceil(totalHits / perPage);

  if (currentPage >= maxPages) {
    hideLoadMoreButton(); 
    if (isLoadMoreAction) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight'
      });
    }
  } else {
    showLoadMoreButton(); 
  }
}

function smoothScroll() {
  const galleryItem = document.querySelector('.gallery-item');
  if (!galleryItem) return;

  const cardHeight = galleryItem.getBoundingClientRect().height;
  const gallery = document.querySelector('.gallery');
  const computedStyle = window.getComputedStyle(gallery);
  const gap = parseFloat(computedStyle.rowGap) || 0;

  window.scrollBy({
    top: (cardHeight + gap) * 2,
    behavior: 'smooth',
  });
}
