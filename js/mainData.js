// const DB_PATH = './db.json';
const DB_PATH = 'https://anime-glo-js-default-rtdb.firebaseio.com/anime.json';

const mainData = () => {
  fetch(DB_PATH)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log('data: ', data.anime);
      console.log('data: ', data);
    });
};
mainData();
