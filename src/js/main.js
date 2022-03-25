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
import Scrollbar from 'smooth-scrollbar';
import './vendor/select';

ieFix();
vhFix();
actualYear();
scrollToAnchor.init();

header.init();
lazyLoading.init();

function init() {
	let click = vars.$document.find('.js-like');

	click.on('click', (e) => {
		let $this = $(e.currentTarget);

		console.log($this.attr('data-like'), 'event for Back End');

		if (!$this.hasClass('is-select')) {
			$this.addClass('is-select')
		} else {
			$this.removeClass('is-select');
		}
	});

	$('.js-button').on('click', (e) => {
		let $this = $(e.currentTarget);

		if (!$this.hasClass('is-active')) {
			$this.addClass('is-active')
		} else {
			$this.removeClass('is-active');
		}
	});

	vars.$document.find('.faq__item').find('.faq__arrow').on('click', (e) => {
		let $this = $(e.currentTarget);
		let $item = $this.closest('.faq__item');
		let $content = $item.find('.faq__content');

		if (!$item.hasClass('is-active')) {
			$item.addClass('is-active');
			$content.addClass('is-active').slideDown();
		} else {
			$item.removeClass('is-active');
			$content.removeClass('is-active').slideUp();
		}
	})

	sliderAutor.init();
	sliderCollections.init();


	if ($('.tabs').length) {
		Scrollbar.initAll();

		let $tabNav = vars.$document.find('.tabs__nav');

		$tabNav.on('click', (event) => {
			const $this = $(event.currentTarget);

			$tabNav.removeClass('is-active');

			$this.addClass('is-active');

			if($this.data('tab') === 2) {
				vars.$document.find('.tabs__navs').addClass('is-active')
			} else {
				vars.$document.find('.tabs__navs').removeClass('is-active')
			}

			gsap.timeline()
				.to(vars.$document.find('.tabs__element.is-active'), 0.5, {
						autoAlpha: 0,
						clearProps: true,
					}
				)
				.call(() => {
					vars.$document.find('.tabs__element').addClass('is-hidden').removeClass('is-active');
					vars.$document.find(`.tabs__element[data-tab='${$this.data('tab')}']`).removeClass('is-hidden').addClass('is-active');
				})
				.from(vars.$document.find(`.tabs__element[data-tab='${$this.data('tab')}']`), 0.5, {
					autoAlpha: 0,
					clearProps: true,
				});
		});
	}

	$('.js-select').each(function(){
		var $this = $(this), numberOfOptions = $(this).children('option').length;

		$this.addClass('select-hidden');
		$this.wrap('<div class="select"></div>');
		$this.after('<div class="select-styled"></div>');

		var $styledSelect = $this.next('div.select-styled');
		$styledSelect.text($this.children('option').eq(0).text());

		var $list = $('<ul />', {
			'class': 'select-options'
		}).insertAfter($styledSelect);

		for (var i = 0; i < numberOfOptions; i++) {
			$('<li />', {
				text: $this.children('option').eq(i).text(),
				rel: $this.children('option').eq(i).val()
			}).appendTo($list);
			//if ($this.children('option').eq(i).is(':selected')){
			//  $('li[rel="' + $this.children('option').eq(i).val() + '"]').addClass('is-selected')
			//}
		}

		var $listItems = $list.children('li');

		$styledSelect.click(function(e) {
			e.stopPropagation();
			$('div.select-styled.active').not(this).each(function(){
				$(this).removeClass('active').next('ul.select-options').hide();
			});
			$(this).toggleClass('active').next('ul.select-options').toggle();
		});

		$listItems.click(function(e) {
			e.stopPropagation();
			$listItems.removeClass('is-selected')
			$(this).addClass('is-selected')
			$styledSelect.text($(this).text()).removeClass('active');
			$this.val($(this).attr('rel'));
			$list.hide();
			//console.log($this.val());
		});

		$(document).click(function() {
			$styledSelect.removeClass('active');
			$list.hide();
		});

	});

	vars.$document.find('.js-open').on('click', () => {
		vars.$document.find('.container__top--catalog').addClass('is-active')
		vars.$document.find('.container__right').addClass('is-hide');
	});

	vars.$document.find('.js-close').on('click', () => {
		vars.$document.find('.container__top--catalog').removeClass('is-active')
		vars.$document.find('.container__right').removeClass('is-hide');
	});

	$('select[multiple]').multiselect({
		columns  : 1,
		search   : false,
		texts: {
			placeholder: 'Select options'
		},
		minHeight: false,
	});

	$('select[multiple]').siblings('a.addoption')
		.click(function( event ){
			event.preventDefault();

			var optionCnt = $(this).siblings('select[multiple]')
				.find('option').length + 1;

			$(this).siblings('select[multiple]')
				.multiselect('loadOptions', [{
						name   : 'Option '+ optionCnt,
						value  : optionCnt,
						checked: false
					}],
					false
				);
		});

	$('select[multiple]').siblings('a.daddoptgetvalues')
		.click(function( event ){
			event.preventDefault();

			alert(
				'Selected Values: '
				+ $(this).siblings('select[multiple]').val()
			);
		});


	vars.$document.find('.range__current').on('click', () => {
		if(!vars.$document.find('.range__current').hasClass('is-open')) {
			vars.$document.find('.range__current').addClass('is-open');
			vars.$document.find('.range__dropdown').addClass('is-open');
		}
		else {
			vars.$document.find('.range__current').removeClass('is-open');
			vars.$document.find('.range__dropdown').removeClass('is-open');
		}
	});
}

init();
