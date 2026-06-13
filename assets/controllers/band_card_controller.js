// assets/controllers/band_card_controller.js
// Reveal del overlay en hover (también gestionado por CSS, pero
// este controller puede añadir lógica extra como lazy-load de audio, etc.)

import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
    static targets = ['reveal']

    reveal() {
        if (this.hasRevealTarget) {
            this.revealTarget.setAttribute('aria-hidden', 'false')
        }
    }

    hide() {
        if (this.hasRevealTarget) {
            this.revealTarget.setAttribute('aria-hidden', 'true')
        }
    }
}
