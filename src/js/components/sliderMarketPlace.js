import vars from "../helpers";

const init = () => {
	if ($('.marketplace').length && vars.isMobile()) {
		let mySwiper = new Swiper('.marketplace', {
			slidesPerView: 'auto',
			spaceBetween: false,
			loop: true,
			observer: true,
			observeParents: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
		});

		mySwiper.update();
	}
}

export default {
	init,
}
