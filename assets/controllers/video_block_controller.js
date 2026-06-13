// assets/controllers/video_block_controller.js
// Abre/cierra modal con iframe de YouTube. Limpia src al cerrar.

import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
    static targets = ['modal', 'iframe']

    openModal(event) {
        event.preventDefault()
        const videoId = event.params.videoId
        this.iframeTarget.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
        this.modalTarget.setAttribute('aria-hidden', 'false')
        document.body.style.overflow = 'hidden'
        this.modalTarget.focus()
    }

    closeModal() {
        this.modalTarget.setAttribute('aria-hidden', 'true')
        this.iframeTarget.src = ''
        document.body.style.overflow = ''
    }

    // Cerrar con Escape
    keydown(event) {
        if (event.key === 'Escape') this.closeModal()
    }

    connect() {
        this._keydown = this.keydown.bind(this)
        window.addEventListener('keydown', this._keydown)
    }

    disconnect() {
        window.removeEventListener('keydown', this._keydown)
    }
}
