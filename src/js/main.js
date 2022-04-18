import './vendor';
import './helpers';
import './components/social';
import './vendor/jquery.easing.1.3';
import './vendor/parallax';
import header from './components/header';
import lazyLoading from './modules/lazyLoading';
import scrollToAnchor from './modules/scrollToAnchor';
import vars from "./helpers";
import helpers from "./helpers";
import sliderAutor from "./components/sliderAutor";
import sliderCollections from "./components/sliderCollections";
import Scrollbar from 'smooth-scrollbar';
import './vendor/select';
import sliderMarketPlace from "./components/sliderMarketPlace";
import sliderPopular from "./components/sliderPopular";

// ieFix();
// vhFix();
// actualYear();
scrollToAnchor.init();

// header.init();
lazyLoading.init();

function sliceText(text, size) {
	let elem = $(text).text().slice(0, size);

	text.text(elem + '...');
}

function resize() {
	// if (window.resizeWidth && innerWidth === window.resizeWidth) {
	// 	return;
	// }

	forMobile();

	window.resizeWidth = innerWidth;
}

function init() {

	forMobile();
	const parall = $(`[data-off-parallax]`);

	$(parall).each((i, element) => {
		const data = $(element).attr('data-off-parallax');
		$(element).attr('data-parallax', `${data}`);
		$(element).removeAttr('data-off-parallax');
	});

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
			$this.addClass('is-active');

			if (!vars.isMobile()) {
				vars.$document.find('.header__menu').addClass('is-view');
			} else {
				vars.lockScroll(true, helpers.$document.find('.header'), 'header');

				setImmediate(() => {
					vars.$body.css('padding-right', `${vars.getScrollbarWidth()}px`);
					vars.$header.css('right', `${vars.getScrollbarWidth()}px`);
				});

				vars.$document.find('body').addClass('is-menu');
				vars.$document.find('.header').addClass('is-active');
				vars.$document.find('.mobile-menu').removeClass('is-hidden');
			}

		} else {
			$this.removeClass('is-active');
			if (!vars.isMobile()) {
				vars.$document.find('.header__menu').removeClass('is-view');
			} else {
				vars.lockScroll(false, vars.$document.find('.header'), 'header');
				vars.$body.css('padding-right', '');
				vars.$header.css('right', '');
				vars.$document.find('body').removeClass('is-menu');
				vars.$document.find('.header').removeClass('is-active');
				vars.$document.find('.mobile-menu').addClass('is-hidden');
			}
		}
	});

	$('.header__lang-current').on('click', (e) => {
		let $this = $(e.currentTarget);

		if (!$this.hasClass('is-active')) {
			$this.addClass('is-active');

			vars.$document.find('.header__lang-list').addClass('is-view');
		} else {
			$this.removeClass('is-active');
			vars.$document.find('.header__lang-list').removeClass('is-view');
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
	sliderMarketPlace.init();
	sliderPopular.init();

	if ($('.tabs').length) {
		Scrollbar.initAll();

		let $tabNav = vars.$document.find('.tabs__nav');

		$tabNav.on('click', (event) => {
			const $this = $(event.currentTarget);

			$tabNav.removeClass('is-active');

			$this.addClass('is-active');

			if ($this.data('tab') === 2 || $this.data('tab') === 4) {
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

	$('.js-select').each(function () {
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

		$styledSelect.click(function (e) {
			e.stopPropagation();
			$('div.select-styled.active').not(this).each(function () {
				$(this).removeClass('active').next('ul.select-options').hide();
				$(this).closest('.select').addClass('is-active');
			});
			$(this).toggleClass('active').next('ul.select-options').toggle();
			$(this).closest('.select').toggleClass('is-active');

			if (vars.$document.find('.range__current').hasClass('is-open')) {
				vars.$document.find('.range__current').removeClass('is-open');
				vars.$document.find('.range__dropdown').removeClass('is-open');
				vars.$document.find('.range').removeClass('is-open');
			}
		});

		$listItems.click(function (e) {
			e.stopPropagation();
			$listItems.removeClass('is-selected')
			$(this).addClass('is-selected')
			$styledSelect.text($(this).text()).removeClass('active');

			$styledSelect.closest('.select').removeClass('is-active');
			$this.val($(this).attr('rel'));
			$list.hide();
			//console.log($this.val());
		});

		$(document).click(function () {
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
		columns: 1,
		search: false,
		texts: {
			placeholder: 'Select options'
		},
		minHeight: false,
	});

	$('select[multiple]').siblings('a.addoption')
		.click(function (event) {
			event.preventDefault();

			var optionCnt = $(this).siblings('select[multiple]')
				.find('option').length + 1;

			$(this).siblings('select[multiple]')
				.multiselect('loadOptions', [{
						name: 'Option ' + optionCnt,
						value: optionCnt,
						checked: false
					}],
					false
				);
		});

	$('select[multiple]').siblings('a.daddoptgetvalues')
		.click(function (event) {
			event.preventDefault();

			alert(
				'Selected Values: '
				+ $(this).siblings('select[multiple]').val()
			);
		});


	vars.$document.find('.range__current').on('click', () => {
		if (!vars.$document.find('.range__current').hasClass('is-open')) {
			vars.$document.find('.range__current').addClass('is-open');
			vars.$document.find('.range__dropdown').addClass('is-open');
			vars.$document.find('.range').addClass('is-open');
		} else {
			vars.$document.find('.range__current').removeClass('is-open');
			vars.$document.find('.range__dropdown').removeClass('is-open');
			vars.$document.find('.range').removeClass('is-open');
		}
	});


	vars.$document.find('.js-luck').on('click', (event) => {
		let info = vars.$document.find('.marketplace .card__image img');
		let info2 = vars.$document.find('.marketplace .card__edition');
		let info3 = vars.$document.find('.marketplace .card__title');
		let info4 = vars.$document.find('.marketplace .card__bottom');
		let info5 = vars.$document.find('.marketplace .card__product');
		let info6 = vars.$document.find('.marketplace .card__caption');
		let info7 = vars.$document.find('.marketplace .like');
		event.preventDefault();

		gsap.timeline()
			.to([info2, info3, info4, info5, info6, info7], 0.5, {
				autoAlpha: 0,
				onStart: () => {
					vars.$document.find('.marketplace .card').addClass('is-start');
				}
			})
			.call(() => {

			})
			.from([info2, info3, info4, info5, info6, info7], 0.5, {
				delay: 2,
				autoAlpha: 0,
				onComplete: () => {
					vars.$document.find('.marketplace .card').removeClass('is-start');
				}
			})
	});

	$(".header__left li, .header__logo").hover(function (event) {
		const $this = $(event.currentTarget);

		if (!$this.hasClass('header__logo')) {
			vars.$document.find('.header__left .line').css({
				'left': $this.offset().left - vars.$document.find('.header__left').offset().left + 5 + 'px',
				'width': $this.width() + 3 + 'px',
			})

			console.log('123');
		} else {
			vars.$document.find('.header__left .line').css({
				'left': $this.offset().left - vars.$document.find('.header__left').offset().left + 'px',
				'width': $this.width() + 3 + 'px',
			})
		}
	});

	const $this = $('.header__nav li.is-current');

	vars.$document.find('.header__left .line').css({
		'left': $this.offset().left - vars.$document.find('.header__left').offset().left + 5 + 'px',
		'width': $this.width() + 3 + 'px',
	})

	$(".header__left li, .header__logo").on('mouseleave', () => {
		const $this = $('.header__nav li.is-current');

		vars.$document.find('.header__left .line').css({
			'left': $this.offset().left - vars.$document.find('.header__left').offset().left + 5 + 'px',
			'width': $this.width() + 3 + 'px',
		})
	});

	vars.$document.find('.js-modal').on('click', (e) => {
		e.preventDefault();
		helpers.lockScroll(true, helpers.$document.find('.modal'), 'modal');

		setImmediate(() => {
			helpers.$body.css('padding-right', `${helpers.getScrollbarWidth()}px`);
			helpers.$header.css('right', `${helpers.getScrollbarWidth()}px`);
		});

		const $this = $(e.currentTarget);
		const $modal = vars.$document.find(`.modal[data-modal="${$this.attr('data-modal')}"], .select-edition[data-modal="${$this.attr('data-modal')}"]`);

		if ($modal.hasClass('is-hidden')) {
			gsap.timeline().from($modal, 0.5, {
				opacity: 0,
				clearProps: true,
				onStart: () => {
					$modal.removeClass('is-hidden');
				}
			}).from($modal.find('.modal__content, .select-edition__content'), 0.5, {
				y: 100,
				opacity: 0,
				clearProps: true,
				onStart: () => {
					$modal.find('.modal__content, .select-edition__content').removeClass('is-hidden');
				}
			})
		}
	})

	vars.$document.find('.js-close-modal').on('click', (e) => {

		if (!$(e.currentTarget).closest('.modal, .select-edition').hasClass('is-hidden')) {
			gsap.timeline()
				.to($(e.currentTarget).closest('.modal, .select-edition').find('.modal__content, .select-edition__content'), 0.5, {
					y: 100,
					opacity: 0,
					clearProps: true,
					onComplete: () => {
						$(e.currentTarget).closest('.modal, .select-edition').find('.modal__content, .select-edition__content').addClass('is-hidden');
					}
				})
				.to($(e.currentTarget).closest('.modal, .select-edition'), 0.5, {
					opacity: 0,
					clearProps: true,
					onComplete: () => {
						$(e.currentTarget).closest('.modal, .select-edition').addClass('is-hidden');

						helpers.lockScroll(false, helpers.$document.find('.modal'), 'modal');
						helpers.$body.css('padding-right', '');
						helpers.$header.css('right', '');
					}
				});
		}
	});

	window.resizeWidth = innerWidth;

	window.addEventListener('resize', _debounce(resize, 500));
}

function forMobile() {
	if (vars.isMobile()) {
		sliceText($('.slice-text'), 9);

		$('.address').each((index, item) => {
			sliceText($(item), 37);
		})

		vars.$window.on('scroll', () => {
			if (window.scrollY > 0) {
				vars.$document.find('.header').addClass('is-scroll');
			} else {
				vars.$document.find('.header').removeClass('is-scroll');
			}
		});

		$('.js-level-main').on('click', (e) => {
			vars.$document.find('.mobile-menu__level--1').addClass('is-hidden');
			vars.$document.find('.mobile-menu__level--2').removeClass('is-hidden');
		});

		$('.js-langs').on('click', (e) => {
			vars.$document.find('.mobile-menu__level--1').addClass('is-hidden');
			vars.$document.find('.mobile-menu__level--3').removeClass('is-hidden');
		});

		$('.mobile-menu__back').on('click', (e) => {
			let $this = $(e.currentTarget);

			if (!$this.closest('.mobile-menu__level').hasClass('is-hidden')) {
				$this.closest('.mobile-menu__level').addClass('is-hidden');
				vars.$document.find('.mobile-menu__level--1').removeClass('is-hidden');
			}
		});

		$('.header__menu--langs').find('.header__menu-link').on('click', (e) => {
			e.preventDefault();

			let $this = $(e.currentTarget);

			if (!$this.hasClass('is-select')) {
				$('.header__menu--langs').find('.header__menu-link').removeClass('is-select');
				$this.addClass('is-select')
			}
		});

		$('.js-lang').on('click', (e) => {
			let $this = $(e.currentTarget);

			if ($this.closest('.header__menu--langs').find('.header__menu-link').hasClass('is-select')) {
				vars.$document.find('.js-langs').text($this.closest('.header__menu--langs').find('.header__menu-link.is-select'));
			}
		});

		$('.filter').on('click', (e) => {
			if (vars.$document.find('.mobile-filter').hasClass('is-hidden')) {
				vars.$document.find('.mobile-filter').removeClass('is-hidden');
				vars.lockScroll(true, helpers.$document.find('.header'), 'header');
				setImmediate(() => {
					vars.$body.css('padding-right', `${vars.getScrollbarWidth()}px`);
					vars.$header.css('right', `${vars.getScrollbarWidth()}px`);
				});
				vars.$document.find('body').addClass('is-menu');
			}
		});

		$('.js-clear, .mobile-filter__back').on('click', (e) => {
			if (!vars.$document.find('.mobile-filter').hasClass('is-hidden')) {
				vars.$document.find('.mobile-filter').addClass('is-hidden');
				vars.lockScroll(false, vars.$document.find('.header'), 'header');
				vars.$body.css('padding-right', '');
				vars.$header.css('right', '');
				vars.$document.find('body').removeClass('is-menu');
			}
		});
	}
}

init();

$(window).on('resize', () => {
	// init();
});
