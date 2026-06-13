// assets/controllers/newsletter_controller.js
// Envía el form de newsletter vía fetch (API Symfony)

import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
    static targets = ['email', 'feedback']

    async subscribe(event) {
        event.preventDefault()

        const email = this.emailTarget.value.trim()
        if (!email) return

        this.feedbackTarget.textContent = 'Enviando...'

        try {
            const response = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })

            if (response.ok) {
                this.feedbackTarget.textContent = '✓ Te hemos añadido a la lista negra.'
                this.emailTarget.value = ''
            } else {
                this.feedbackTarget.textContent = '✗ Error. Inténtalo de nuevo.'
            }
        } catch {
            this.feedbackTarget.textContent = '✗ Sin conexión. Inténtalo más tarde.'
        }
    }
}
