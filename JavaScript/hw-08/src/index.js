'use strict';
import images from './gallery-items.js';

const refs = {
	gallery: document.querySelector('.js-gallery'),
	lightbox: document.querySelector('.lightbox'),
	closeButton: document.querySelector('[data-action="close-lightbox"]'),
	modal: document.querySelector('.lightbox__content'),
	lightboxImage: document.querySelector('.lightbox__image'),
};

const galleryItem = ({ preview, original, description }) =>
	`<li class="gallery__item">
<a class="gallery__link" href=${original}> <img class="gallery__image"
    src=${preview} data-source=${original} alt=${description}/></a></li>`;

const allGallery = images.reduce((acc, item) => acc + galleryItem(item), '');

refs.gallery.insertAdjacentHTML('afterbegin', allGallery);
refs.gallery.addEventListener('click', galleryClick);
refs.modal.addEventListener('click', closeClick);
refs.closeButton.addEventListener('click', closeLightbox);

function galleryClick(e) {
	e.preventDefault();
	if (e.target.nodeName !== 'IMG') {
		return;
	}
	if (e.target.nodeName === 'IMG') {
		refs.lightbox.classList.add('is-open');
		refs.lightboxImage.src = e.target.getAttribute('data-source');
		refs.lightboxImage.alt = e.target.alt;
	}
	window.addEventListener('keyup', closePressKey);
}

function closeLightbox(e) {
	refs.lightbox.classList.remove('is-open');
	refs.lightboxImage.src = '';
	refs.lightboxImage.alt = '';
	window.removeEventListener('keyup', closePressKey);
}

function closeClick(click) {
	if (click.target === click.currentTarget) {
		closeLightbox();
	}
}

function closePressKey(pressKey) {
	if (pressKey.code === 'Escape') {
		closeLightbox();
	}
}
