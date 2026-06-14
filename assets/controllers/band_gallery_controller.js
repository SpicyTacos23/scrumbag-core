// assets/controllers/band_gallery_controller.js
// Lightbox: abrir/cerrar, navegación prev/next, teclado y contador

import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
    static targets = ['lightbox', 'image', 'counter', 'data']

    connect() {
        this._images = JSON.parse(this.dataTarget.textContent)
        this._currentIndex = 0
        this._keydown = this._handleKeydown.bind(this)
    }

    open(event) {
        this._currentIndex = parseInt(event.params.index, 10)
        this._render()
        this.lightboxTarget.setAttribute('aria-hidden', 'false')
        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', this._keydown)
    }

    close() {
        this.lightboxTarget.setAttribute('aria-hidden', 'true')
        document.body.style.overflow = ''
        window.removeEventListener('keydown', this._keydown)
    }

    prev() {
        this._currentIndex = (this._currentIndex - 1 + this._images.length) % this._images.length
        this._render()
    }

    next() {
        this._currentIndex = (this._currentIndex + 1) % this._images.length
        this._render()
    }

    // ── Privados ──────────────────────────────

    _render() {
        this.imageTarget.src = this._images[this._currentIndex]
        this.counterTarget.textContent = `${this._currentIndex + 1} / ${this._images.length}`
    }

    _handleKeydown(event) {
        if (event.key === 'Escape') this.close()
        if (event.key === 'ArrowLeft') this.prev()
        if (event.key === 'ArrowRight') this.next()
    }
}
