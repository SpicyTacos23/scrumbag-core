// assets/controllers/marquee_controller.js
// Pausa el marquee si el usuario prefiere reducir movimiento

import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
    static targets = ['track']

    connect() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.trackTarget.style.animationPlayState = 'paused'
        }
    }
}
