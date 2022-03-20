import Swiper from 'swiper'

const init = () => {
	if ($('.autor').length) {
		let $prevButton = $('.nav-autor--left');
		let $nextButton = $('.nav-autor--right');

		let mySwiper = new Swiper('.autor', {
			slidesPerView: 6,
			spaceBetween: 24,
			loop: true,
			observer: true,
			observeParents: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
		});

		$prevButton.on('click', () => {
			mySwiper.slidePrev();
		});

		$nextButton.on('click', () => {
			mySwiper.slideNext();
		});

		mySwiper.update();
	}
}

export default {
	init,
}
