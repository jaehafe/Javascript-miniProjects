import './scss/style.scss';

// close when click outside
// const specifiedElement = document.getElementById('a')

// document.addEventListener('click', event => {
//   const isClickInside = specifiedElement.contains(event.target)

//   if (!isClickInside) {
//     // The click was OUTSIDE the specifiedElement, do something
//   }
// })

// modal close
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const cardContainer = document.querySelector(
  '.section__container-movie-card-container'
);
const $ = (selector) => document.querySelector(selector);

openModalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active');
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    closeModal(modal);
  });
});

const openModal = (modal) => {
  if (modal === null) return;
  modal.classList.add('active');
  overlay.classList.add('active');
};

const closeModal = (modal) => {
  if (modal === null) return;
  modal.classList.remove('active');
  overlay.classList.remove('active');
};

const errorHandle = {
  loadingDOM() {
    return ($(
      '.section__container-movie-card-container'
    ).innerHTML = `<div class="loading"></div>`);
  },

  errorDOM() {
    return ($('.section__container-movie-card-container').innerHTML =
      '<p class="error">there was an error</p>');
  },
};

//

const fetchQuestions = async () => {
  $('.questionsDOM').innerHTML = `<div class='loading'></div>`;
  try {
    const res = await getMovies();
    const { items } = await res.json();
    console.log(items);
    return items;
  } catch (err) {
    console.log(err);
    $('.questionsDOM').innerHTML = '<p class="error">there was an error</p>';
  }
};

// api
const getMovies = async (title = '', year = '', page = 2) => {
  $(
    '.section__container-movie-card-container'
  ).innerHTML = `<div class='loading'></div>`;
  try {
    const s = `&s=${title}`;
    const y = `&y=${year}`;
    const p = `&page=${page}`;
    const res = await fetch(
      `https://omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}${s}${y}${p}`
    );
    const data = await res.json();

    if (data.Response === 'True') {
      const { Search: movies, totalResults } = data;
      console.log(movies);

      const movieTemplate = movies
        .map((movie) => {
          const { Poster, Title, Year, imdbID } = movie;
          return `
                <div class="section__container-movie-card" data-movie-id="${imdbID}">
                  <button>
                    <img
                      data-modal-target="#modal"
                      src="${Poster}"
                      alt=""
                      class="section__container-movie-card--img"
                    />
                  </button>
                  <div class="flex">
                    <div class="section__container-movie-card--thumb">
                      <p class="section__container-movie-card--year">${Year}</p>
                      <h2 class="section__container-movie-card--title">${Title}</h2>
                    </div>
                    <div class="section__container-movie-card--btn">
                      <button
                        class="section__container-movie-card--btn-add movie-add-button"
                      >
                        추가
                      </button>
                      <button
                        class="section__container-movie-card--btn-remove movie-remove-button"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
                `;
        })
        .join('');
      cardContainer.innerHTML = movieTemplate;

      let search = $('#searchInput').value;
      $(
        '.main__search--result'
      ).innerHTML = `${search}이(가) 총 ${totalResults} 개 검색되었습니다.`;
    }
  } catch (err) {
    console.log(err);
    $('.section__container-movie-card-container').innerHTML =
      '<p class="error">there was an error</p>';
    throw err;
  }
};

$('.main__search-container').addEventListener('submit', (e) => {
  e.preventDefault();
  let search = $('#searchInput').value;
  if (search) {
    getMovies(search);
    search = '';
  }
});

// const displayMovies = async (title) => {
//   const movieList = await getMovies(title);
//   console.log(movieList.movies);
//   console.log(movieList.totalResults);
// };
// displayMovies('title');

// movies.map((movie) => {
//   console.log(movie);
// });
