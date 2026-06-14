// assets/controllers/video_block_controller.js
// Opens/closes a modal with a local <video> element. Sets src on open
// and plays it; clears src and pauses on close.

import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ["modal", "video"];

    openModal(event) {
        event.preventDefault();
        const videoSrc = event.params.videoSrc;

        this.videoTarget.src = videoSrc;
        this.modalTarget.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        this.modalTarget.focus();

        // play() returns a promise that can reject if autoplay is blocked
        this.videoTarget.play().catch(() => {});
    }

    closeModal() {
        this.modalTarget.setAttribute("aria-hidden", "true");
        this.videoTarget.pause();
        this.videoTarget.removeAttribute("src");
        this.videoTarget.load();
        document.body.style.overflow = "";
    }

    // Close with Escape
    keydown(event) {
        if (event.key === "Escape") this.closeModal();
    }

    connect() {
        this._keydown = this.keydown.bind(this);
        window.addEventListener("keydown", this._keydown);
    }

    disconnect() {
        window.removeEventListener("keydown", this._keydown);
    }
}
