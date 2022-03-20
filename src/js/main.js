import './vendor';
import './helpers';
import './components/social';
import {ieFix} from './vendor/ie-fix';
import {vhFix} from './vendor/vh-fix';
import {actualYear} from './modules/actualYear';
import header from './components/header';
import lazyLoading from './modules/lazyLoading';
import scrollToAnchor from './modules/scrollToAnchor';
import vars from "./helpers";
import sliderAutor from "./components/sliderAutor";
import sliderCollections from "./components/sliderCollections";

ieFix();
vhFix();
actualYear();
scrollToAnchor.init();

header.init();
lazyLoading.init();

function init () {
	let click = vars.$document.find('.js-like');

	click.on('click', (e) => {
		let $this = $(e.currentTarget);

		console.log($this.attr('data-like'), 'event for Back End');

		if(!$this.hasClass('is-select')) {
			$this.addClass('is-select')
		} else {
			$this.removeClass('is-select');
		}
	});

	$('.js-button').on('click', (e) => {
		let $this = $(e.currentTarget);

		if(!$this.hasClass('is-active')) {
			$this.addClass('is-active')
		} else {
			$this.removeClass('is-active');
		}
	});

	sliderAutor.init();
	sliderCollections.init();
}

init();
