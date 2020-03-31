import './libs/jquery.slim.min.js';
import Swiper from './libs/swiper.esm.browser.bundle.min.js';
import data from './data.js';

const template = `${data.map(item => {
  return `<div class="swiper-slide card">
    <div class="swiper-slide-inner">
      <div class="card-badge">${item.word}</div>
      <div class="card-subtitle">年薪：${item.salary}</div>
      <div class="square-img" style="background-image: url(${item.image})"></div>
      <div>
        <h2 class="card-title">${item.title}</h2>
        <div class="card-content">${item.content}</div>
      </div>
    </div>
  </div>`;
}).join('') }`;

$('.swiper-wrapper').html(template);

const mainSwiper = new Swiper('.swiper-container', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  runCallbacksOnInit: false,
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
let isStart = false;
let speed = 500;
let maxSpeed = 80;
let endSpeed = 1000;
const playBtn = $('#play');

playBtn.on('click', function() {
  isPlay = !isPlay;
  isStart = true;
  speed = 500;
  playSwiper();
  disableEle(playBtn, true);
  $('.glory').addClass('d-none');
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
      isStart = false;
      $('.glory').removeClass('d-none');
    }
  }
}
mainSwiper.on('transitionEnd', function() {
  if (isStart) playSwiper();
});

const disableEle = (ele, disabled) => {
  $(ele).prop('disabled', disabled);
}