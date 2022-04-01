import Swiper from 'swiper'

const init = () => {
	if ($('.popular--slider').length) {
		let $prevButton = $('.nav-popuplar--left');
		let $nextButton = $('.nav-popuplar--right');

		let mySwiper = new Swiper('.popular--slider', {
			slidesPerView: 2,
			spaceBetween: 0,
			loop: true,
			observer: true,
			observeParents: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			breakpoints: {
				1023: {
					slidesPerView: 4,
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
