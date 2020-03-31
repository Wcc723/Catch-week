import './node_modules/jquery/dist/jquery.slim.js';
import Swiper from './node_modules/swiper/js/swiper.esm.browser.bundle.min.js';
import data from './data.js';

const template = `${data.map(item => {
  return `<div class="swiper-slide card">
    <div class="swiper-slide-inner">
      <div class="square-img" style="background-image: url(${item.image})"></div>
      <div>
        <h2 class="card-title">${item.title}</h2>
        <div class="card-content">${item.content}</div>
      </div>
    </div>
  </div>`;
}).join('') }`;

console.log(data.length)


$('.swiper-wrapper').html(template);

const mainSwiper = new Swiper('.swiper-container', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true
  },
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
});

let isPlay = false;
let speed = 500;
let maxSpeed = 80;
let endSpeed = 1000;
const playBtn = $('#play');

playBtn.on('click', function() {
  isPlay = !isPlay;
  speed = 500;
  playSwiper();
  disableEle(playBtn, true);
});


const playSwiper = () => {
  if (isPlay) {
    speed = speed > maxSpeed ? speed - 50 : maxSpeed;
    mainSwiper.slideNext(speed);
    if (speed < maxSpeed) {
      disableEle(playBtn, false);
    }
  } else {
    speed = speed < endSpeed ? speed + 90 : endSpeed;
    if (speed < endSpeed) {
      mainSwiper.slideNext(speed);
    } else {
      disableEle(playBtn, false);
    }
  }
}
mainSwiper.on('transitionEnd', function() {
  playSwiper();
});

const disableEle = (ele, disabled) => {
  $(ele).prop('disabled', disabled);
}