const init = () => {
	if ($('.popular--slider').length) {
		let $prevButton = $('.nav-popuplar--left');
		let $nextButton = $('.nav-popuplar--right');

		let mySwiper = new Swiper('.popular--slider', {
			slidesPerView: 2,
			spaceBetween: 0,
			loop: false,
			navigation: {
				nextEl: '.nav-popuplar--right',
				prevEl: '.nav-popuplar--left',
			},
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
	}
}

export default {
	init,
}
