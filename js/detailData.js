const detailData = () => {
  const preloader = document.querySelector('.preloder');

  const renderGenreList = (genres) => {
    const dropdownBlock = document.querySelector('.header__menu .dropdown');
    dropdownBlock.innerHTML = '';

    genres.forEach((genre) => {
      dropdownBlock.insertAdjacentHTML(
        'beforeend',
        `
        <li><a href="./categories.html?genre=${genre}">${genre}</a></li>
      `,
      );
    });
  };

  const renderAnimeDetails = (array, itemId) => {
    const animeObj = array.find(item => item.id == itemId);
    const imageBlock = document.querySelector('.anime__details__pic');
    const viewsBlock = imageBlock.querySelector('.view');
    const titleBlock = document.querySelector('.anime__details__title h3');
    const subTitleBlock = document.querySelector('.anime__details__title span');
    const descriptionBlock = document.querySelector('.anime__details__text p');
    const widgetList = document.querySelectorAll('.anime__details__widget ul li');
    const breadcrumb = document.querySelector('.breadcrumb__links span');

    if (animeObj) {
      // console.log('animeObj: ', animeObj);
      imageBlock.dataset.setbg = animeObj.image;
      viewsBlock.innerHTML = '';
      viewsBlock.insertAdjacentHTML('beforeend', `
        <i class="fa fa-eye"> ${Intl.NumberFormat("ru", {style: "decimal", minimumFractionDigits: 0}).format(animeObj.views)}</i>
      `);

      titleBlock.textContent = animeObj.title;
      subTitleBlock.textContent = animeObj['original-title'];
      descriptionBlock.textContent = animeObj.description;

      widgetList[0].insertAdjacentHTML('beforeend', `
        <span>Дата выхода:</span> ${animeObj.date}
      `);
      widgetList[1].insertAdjacentHTML('beforeend', `
        <span>Рейтинг:</span> ${animeObj.rating}
      `);
      widgetList[2].insertAdjacentHTML('beforeend', `
        <span>Жанр:</span> ${animeObj.tags.join(', ')}
      `);

      breadcrumb.textContent = animeObj.ganre;

      document.querySelectorAll('.set-bg').forEach((element) => {
        element.style.backgroundImage = `url('${element.dataset.setbg}')`;
      });

      setTimeout(() => {
        preloader.classList.remove('active');
      }, 500);
    } else {
      console.log('Error! No data!');   
    }
  };

  fetch(DB_PATH)
    .then((response) => response.json())
    .then((data) => {
      const genres = new Set();
      const genreParams = new URLSearchParams(window.location.search).get('itemId');

      data.forEach((item) => {
        genres.add(item.ganre);
      });

      // console.log('data: ', data.anime);
      if (genreParams) {
        renderAnimeDetails(data, genreParams);
      } else {
        console.log('Error! No data!');        
      }
      renderGenreList(genres);
    });
};

detailData();
