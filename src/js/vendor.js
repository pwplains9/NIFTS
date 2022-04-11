import 'core-js/stable';
import 'regenerator-runtime/runtime';
import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import objectFitImages from 'object-fit-images';
import gsap from 'gsap';
// import objectFitVideos from 'object-fit-videos';
import Swiper from 'swiper/swiper-bundle.min';
svg4everybody();
objectFitImages();
// objectFitVideos();

window.$ = $;
window.jQuery = $;
window.gsap = gsap;
window.Swiper = Swiper;
window.objectFitImages = objectFitImages;
// window.objectFitVideos = objectFitVideos;

require('ninelines-ua-parser');
