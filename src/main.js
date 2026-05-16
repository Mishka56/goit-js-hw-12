
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';
import { getAdapter } from "axios";

const searchForm = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more-btn');

let searchQuery = '';
let currentPage = 1;
const perPage = 15;

searchForm.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const trimmedQuery = form.elements.searchText.value.trim();

  if (trimmedQuery === '') {
    iziToast.warning({
      title: 'Caution',
      message: 'Please enter a search query!',
      position: 'topRight'
    });
    return;
  }

  searchQuery = trimmedQuery;
  currentPage = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(searchQuery, currentPage);

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    if (data.totalHits > perPage) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Something went wrong: ${error.message}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
    form.reset();
  }
}

async function handleLoadMore() {
  currentPage += 1;

  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(searchQuery, currentPage);

    createGallery(data.hits);

    smoothScroll();

    const totalPages = Math.ceil(data.totalHits / perPage);

    if (currentPage >= totalPages) {
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Failed to load more images: ${error.message}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

function smoothScroll() {
  const firstCard = document.querySelector('.gallery-item');

  if (firstCard) {
    const { height: cardHeight } = firstCard.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}


