import Swiper from 'swiper'

const init = () => {
	if ($('.collections').length) {
		let $prevButton = $('.nav-collections--left');
		let $nextButton = $('.nav-collections--right');

		let mySwiper = new Swiper('.collections', {
			slidesPerView: 'auto',
			spaceBetween: 0,
			loop: true,
			observer: true,
			observeParents: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			breakpoints: {
				1023: {
					slidesPerView: 3,
					spaceBetween: 24,
				}
			}
		});

		$prevButton.on('click', () => {
			mySwiper.slidePrev();
		});

		$nextButton.on('click', () => {
			mySwiper.slideNext();
		});
	}
}

export default {
	init,
}
