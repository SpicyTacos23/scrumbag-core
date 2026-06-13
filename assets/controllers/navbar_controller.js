// assets/controllers/navbar_controller.js
// Gestiona: scroll → fondo opaco, hamburger → menú mobile

import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
    static targets = ['burger', 'mobileMenu', 'link']
    static classes = ['scrolled']

    connect() {
        this._onScroll = this._handleScroll.bind(this)
        window.addEventListener('scroll', this._onScroll, { passive: true })
        this._handleScroll()
    }

    disconnect() {
        window.removeEventListener('scroll', this._onScroll)
    }

    toggleMenu() {
        const isOpen = this.mobileMenuTarget.getAttribute('aria-hidden') === 'false'
        this._setMenuOpen(!isOpen)
    }

    closeMenu() {
        this._setMenuOpen(false)
    }

    // ── Privados ──────────────────────────────

    _setMenuOpen(open) {
        this.mobileMenuTarget.setAttribute('aria-hidden', open ? 'false' : 'true')
        this.burgerTarget.setAttribute('aria-expanded', open ? 'true' : 'false')
    }

    _handleScroll() {
        const scrolled = window.scrollY > 60
        this.element.classList.toggle(this.scrolledClasses[0], scrolled)
    }
}
