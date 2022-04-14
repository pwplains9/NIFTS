import vars from "../helpers";

const init = () => {
	let swiper;

	swiper = new Swiper('.popular--slider', {

		loop: false,
		navigation: {
			nextEl: '.nav-popuplar--right',
			prevEl: '.nav-popuplar--left',
		},
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
		breakpoints: {
			1023: {
				slidesPerView: 4,
				spaceBetween: 24,
			},
			1: {
				slidesPerView: 2,
				spaceBetween: 0,
			}
		}
	});

	vars.$window.on('resize', () => {

		// swiper.destroy();
	});

	// const resize = () => {
	// 	if (window.resizeWidth && innerWidth === window.resizeWidth) {
	// 		return;
	// 	}
	//
	// 	init();
	//
	// 	window.resizeWidth = innerWidth;
	// };
	//
	// window.resizeWidth = innerWidth;
	//
	// window.addEventListener('resize', _debounce(resize, 500));
}

export default {
	init,
}
