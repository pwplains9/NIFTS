const init = () => {
	if ($('.autor').length) {
		let $prevButton = $('.nav-autor--left');
		let $nextButton = $('.nav-autor--right');

		let mySwiper = new Swiper('.autor', {
			slidesPerView: 'auto',
			spaceBetween: 16,
			loop: false,
			observer: true,
			observeParents: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			navigation: {
				nextEl: '.nav-autor--right',
				prevEl: '.nav-autor--left',
			},
			breakpoints: {
				1023: {
					slidesPerView: 6,
					spaceBetween: 24,
				}
			}
		});



		mySwiper.update();
	}
}

export default {
	init,
}
