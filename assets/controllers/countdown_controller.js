// assets/controllers/countdown_controller.js
// Cuenta regresiva hasta la fecha del festival

import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
    static targets = ['days', 'hours', 'minutes', 'seconds']
    static values  = { date: String }

    connect() {
        this._target = new Date(this.dateValue).getTime()
        this._tick()
        this._interval = setInterval(() => this._tick(), 1000)
    }

    disconnect() {
        clearInterval(this._interval)
    }

    // ── Privado ───────────────────────────────

    _tick() {
        const diff = this._target - Date.now()

        if (diff <= 0) {
            this._set(0, 0, 0, 0)
            clearInterval(this._interval)
            return
        }

        const days    = Math.floor(diff / 86400000)
        const hours   = Math.floor((diff % 86400000) / 3600000)
        const minutes = Math.floor((diff % 3600000) / 60000)
        const seconds = Math.floor((diff % 60000) / 1000)

        this._set(days, hours, minutes, seconds)
    }

    _set(d, h, m, s) {
        this.daysTarget.textContent    = String(d).padStart(2, '0')
        this.hoursTarget.textContent   = String(h).padStart(2, '0')
        this.minutesTarget.textContent = String(m).padStart(2, '0')
        this.secondsTarget.textContent = String(s).padStart(2, '0')
    }
}
