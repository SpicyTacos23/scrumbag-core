// assets/controllers/hero_controller.js
// Animación de entrada en el hero (fade+slide up con Intersection Observer)

import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
    static targets = ['eyebrow', 'title', 'subtitle', 'actions', 'stats']

    connect() {
        // Delay escalonado para cada elemento
        const elements = [
            { el: this.hasEyebrowTarget  ? this.eyebrowTarget  : null, delay: 0   },
            { el: this.hasTitleTarget    ? this.titleTarget    : null, delay: 100 },
            { el: this.hasSubtitleTarget ? this.subtitleTarget : null, delay: 200 },
            { el: this.hasActionsTarget  ? this.actionsTarget  : null, delay: 300 },
            { el: this.hasStatsTarget    ? this.statsTarget    : null, delay: 450 },
        ]

        elements.forEach(({ el, delay }) => {
            if (!el) return
            el.style.opacity   = '0'
            el.style.transform = 'translateY(24px)'
            el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`
        })

        // Trigger after paint
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                elements.forEach(({ el }) => {
                    if (!el) return
                    el.style.opacity   = '1'
                    el.style.transform = 'translateY(0)'
                })
            })
        })
    }
}
