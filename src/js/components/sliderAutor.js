const init = () => {
	if ($('.autor').length) {
		let $prevButton = $('.nav-autor--left');
		let $nextButton = $('.nav-autor--right');

		let mySwiper = new Swiper('.autor', {

			loop: false,
			observer: true,
			observeParents: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			resizeReInit: true,
			progress:true,
			autoResize: true,
			resizeObserver: true,
			observeSlideChildren: true,
			updateOnWindowResize: true,
			navigation: {
				nextEl: '.nav-autor--right',
				prevEl: '.nav-autor--left',
			},
			breakpoints: {
				1023: {
					slidesPerView: 6,
					spaceBetween: 24,
				},
				1: {
					slidesPerView: 2,
					spaceBetween: 16,
				}
			}
		});



		mySwiper.update();
	}
}

export default {
	init,
}
