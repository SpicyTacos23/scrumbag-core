// assets/controllers/floating_sidebar_controller.js
// Actualiza el thumb del scroll indicator según la posición de scroll

import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
    static targets = ['thumb', 'scroll']

    connect() {
        this._onScroll = this._handleScroll.bind(this)
        window.addEventListener('scroll', this._onScroll, { passive: true })
    }

    disconnect() {
        window.removeEventListener('scroll', this._onScroll)
    }

    _handleScroll() {
        if (!this.hasThumbTarget) return

        const docH    = document.documentElement.scrollHeight - window.innerHeight
        const percent = docH > 0 ? (window.scrollY / docH) * 70 : 0
        this.thumbTarget.style.transform = `translateY(${percent}%)`
    }
}
