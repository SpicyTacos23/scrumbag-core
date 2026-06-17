// assets/controllers/video_block_controller.js
// Opens/closes a modal with a local <video> element. Sets src on open
// and plays it; clears src and pauses on close.

// assets/controllers/video_block_controller.js

import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ["modal", "video", "thumb", "year", "description"];
    static values = {
        videos: Array,
        currentIndex: Number
    };

    connect() {
        this.currentIndexValue = 0;
    }

    openModal(event) {
        event.preventDefault();

        const index = event.params.index ?? this.currentIndexValue;
        const video = this.videosValue[index];

        this.currentIndexValue = index;

        this.videoTarget.src = `/build/video/${video.src}`;
        this.modalTarget.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        this.videoTarget.play().catch(() => {});
    }

    closeModal() {
        this.modalTarget.setAttribute("aria-hidden", "true");
        this.videoTarget.pause();
        this.videoTarget.removeAttribute("src");
        this.videoTarget.load();
        document.body.style.overflow = "";
    }

    nextVideo(event) {
        event.stopPropagation();

        this.currentIndexValue =
            (this.currentIndexValue + 1) % this.videosValue.length;

        const video = this.videosValue[this.currentIndexValue];

        // Actualizar UI
        this.thumbTarget.src = `/build/images/${video.thumb}`;
        this.yearTarget.textContent = video.year;
        this.descriptionTarget.textContent = video.description;
    }
}
