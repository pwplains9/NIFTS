import vars from "../helpers";

const init = () => {
	let mySwiper = new Swiper('.collections', {

		loop: false,
		observer: true,
		observeParents: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		resizeReInit: true,
		progress: true,
		autoResize: true,
		resizeObserver: true,
		observeSlideChildren: true,
		updateOnWindowResize: true,
		navigation: {
			nextEl: '.nav-collections--right',
			prevEl: '.nav-collections--left',
		},
		breakpoints: {
			1: {
				slidesPerView: 'auto',
				spaceBetween: 0,
			},
			1023: {
				slidesPerView: 3,
				spaceBetween: 24,
			},
		}
	});

	const resize = () => {
		if (window.resizeWidth && innerWidth === window.resizeWidth) {
			return;
		}

		mySwiper.destroy();

		setTimeout(() => {
			init();
		}, 1000)

		window.resizeWidth = innerWidth;
	};

	window.resizeWidth = innerWidth;

	window.addEventListener('resize', _debounce(resize, 500));
}

export default {
	init,
}
