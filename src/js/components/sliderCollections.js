

const init = () => {
	if ($('.collections').length) {
		let $prevButton = $('.nav-collections--left');
		let $nextButton = $('.nav-collections--right');

		let mySwiper = new Swiper('.collections', {
			slidesPerView: 'auto',
			spaceBetween: 0,
			loop: false,
			observer: true,
			observeParents: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			navigation: {
				nextEl: '.nav-collections--right',
				prevEl: '.nav-collections--left',
			},
			breakpoints: {
				1023: {
					slidesPerView: 3,
					spaceBetween: 24,
				}
			}
		});
	}
}

export default {
	init,
}
