"use strict"

/* <loaded>======================================================================================================================================================================================================== */
// скріпт для додавання _loaded до <html> коли сайт повністю завантажений
window.addEventListener('load', windowLoad);

// функція яка спрацьовує тільки коли сайт повністю завантажений
function windowLoad() {
	document.documentElement.classList.add('_loaded');


	/* <menu-icon>======================================================================================================================================================================================================== */
	// скріпт для відкриття та закриття меню бургер, по "click" на іконку меню, по "click" поза меню, по клавіші 'Escape'

	const iconMenu = document.querySelector('.menu__icon');
	const menuBody = document.querySelector('.menu__body');

	if (iconMenu) {
		// функція для закриття/відкриття меню
		function toggleMenu() {
			document.body.classList.toggle('_lock-scroll');
			iconMenu.classList.toggle('_show-menu');
			menuBody.classList.toggle('_show-menu');
		}

		// функція тільки для закриття меню
		function closeMenu() {
			document.body.classList.remove('_lock-scroll');
			iconMenu.classList.remove('_show-menu');
			menuBody.classList.remove('_show-menu');
		}

		// подія "click" на іконку меню
		iconMenu.addEventListener("click", toggleMenu);


		// подія "click" на документ, якщо клікнуто поза меню, то закриваємо його
		document.addEventListener('click', function (e) {
			const target = e.target;
			const menu = target.closest('.menu__body') || target.closest('.menu__icon');
			const isMenuOpen = iconMenu.classList.contains('_show-menu');
			if (!menu && isMenuOpen) {
				closeMenu();
			}
		});


		// подія "keydown" на документ, для закриття меню по клавіші 'Escape'
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape') {
				closeMenu();
			}
		});


		// подія "click" на menu__link, для закриття меню якщо клікнуто на menu__link
		const menuLinks = document.querySelectorAll('.menu__link');
		menuLinks.forEach(function (link) {
			link.addEventListener("click", function () {
				closeMenu();
			});
		});
	}

	/* <scroll-sections-active-link>======================================================================================================================================================================================================== */
	// скріпт для додавання або прибирання _active-link, якщо догортати до активного розділу
	const sections = document.querySelectorAll('section[id]');

	function scrollActive() {
		const scrollY = window.scrollY;

		sections.forEach(function (current) {
			const sectionHeight = current.offsetHeight;
			const sectionTop = current.offsetTop - (86 + 2); // height header + fix
			const sectionId = current.getAttribute('id');
			const sectionsClass = document.querySelector('.menu__body a[href*=' + sectionId + ']');

			if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
				sectionsClass.classList.add('_active-link');
			} else {
				sectionsClass.classList.remove('_active-link');
			}
		});
	}

	window.addEventListener('scroll', scrollActive);

	/* <show-scroll-up>======================================================================================================================================================================================================== */
	// скріпт для додавання '_show-scroll' до елемента 'scroll-up', якщо прокрутка більша за 320px

	function scrollUp() {
		const scrollUp = document.getElementById('scroll-up');
		if (window.scrollY >= 320) {
			scrollUp.classList.add('_show-scroll');
		} else {
			scrollUp.classList.remove('_show-scroll');
		}
	}

	window.addEventListener('scroll', scrollUp);

	/* <swiper>======================================================================================================================================================================================================== */
	const testimonialsSwiper = new Swiper('.testimonials__content', {
		// Optional parameters
		slidesPerView: 'auto', // if `auto`, then shows the automatic number of slides
		spaceBetween: 50, // space between slides
		loop: true, // if `true` then continuous scrolling


		wrapperClass: 'swiper__wrapper',
		slideClass: 'swiper__slide',
		slideActiveClass: '_slide-active',


		// If we need pagination
		pagination: {
			el: '.swiper__pagination',
			bulletClass: 'swiper__bullet',
			bulletActiveClass: '_bullet-active',

			clickable: true, // if `true` then clicking on pagination
		},


		// Navigation arrows
		navigation: {
			nextEl: '.swiper__button-next',
			prevEl: '.swiper__button-prev',
		},
	});

	/* <light&dark-mode>======================================================================================================================================================================================================== */
	// скріпт для додавання _dark-mode або _light-mode до body, відповідно до теми операційної системи користувача

	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		// Додавання класу _dark-mode до елементу body
		document.body.classList.add('_dark-mode');
	} else {
		// Додавання класу _light-mode до елементу body
		document.body.classList.add('_light-mode')
	}

	/* <change background header>======================================================================================================================================================================================================== */
	// скріпт для додавання _bg-header до id="header", якщо прокрутити сторінку на певну кількість вюпортів

	function scrollHeader() {
		const header = document.getElementById('header');
		// When the scroll is greater than 50 viewport height, add the bg-header class to the header tag
		if (window.scrollY >= 50) {
			header.classList.add('_bg-header');
		} else {
			header.classList.remove('_bg-header');
		}
	}

	window.addEventListener('scroll', scrollHeader);

	/* <data-animation>======================================================================================================================================================================================================== */
	// скріпт для анімації, анімація застосовується тільки один раз після завантаження сайту

	function createObserver(selector, className) {
		const elements = document.querySelectorAll(selector);
		const options = {
			threshold: 0.2
		}

		const callback = (entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add(className);
				}
			});
		}

		const observer = new IntersectionObserver(callback, options);

		elements.forEach(item => {
			observer.observe(item);
		});
	}

	createObserver('[data-slide-up]', '_animated');
	createObserver('[data-slide-down]', '_animated');
	createObserver('[data-slide-right]', '_animated');
	createObserver('[data-slide-left]', '_animated');

	/* <>======================================================================================================================================================================================================== */
}


/* end */