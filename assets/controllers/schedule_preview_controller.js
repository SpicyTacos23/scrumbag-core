// assets/controllers/schedule_preview_controller.js
// Tabs de días del horario

import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

    switchDay(event) {
        const dayNum = event.currentTarget.dataset.day

        // Desactivar todos los tabs
        this.element.querySelectorAll('.schedule-preview__tab').forEach(tab => {
            tab.classList.remove('schedule-preview__tab--active')
            tab.setAttribute('aria-selected', 'false')
        })

        // Ocultar todos los días
        this.element.querySelectorAll('.schedule-preview__day').forEach(day => {
            day.classList.remove('schedule-preview__day--active')
            day.setAttribute('aria-hidden', 'true')
        })

        // Activar el tab y día seleccionados
        event.currentTarget.classList.add('schedule-preview__tab--active')
        event.currentTarget.setAttribute('aria-selected', 'true')

        const targetDay = this.element.querySelector(`#day-${dayNum}`)
        if (targetDay) {
            targetDay.classList.add('schedule-preview__day--active')
            targetDay.setAttribute('aria-hidden', 'false')
        }
    }
}
