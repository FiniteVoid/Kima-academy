// KIMA Main Site - Modal Handler
document.addEventListener('DOMContentLoaded', function () {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modalCloses = document.querySelectorAll('.kima-modal-close');
    const modalOverlays = document.querySelectorAll('.kima-modal-overlay');

    // Open modal
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
                document.body.classList.add('modal-open');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    modalCloses.forEach(closeBtn => {
        closeBtn.addEventListener('click', function () {
            const modal = this.closest('.kima-modal-overlay');
            if (modal) {
                modal.classList.remove('active');
                modal.setAttribute('aria-hidden', 'true');
                document.body.classList.remove('modal-open');
                document.body.style.overflow = '';
            }
        });
    });

    // Close on overlay click
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', function (e) {
            if (e.target === this) {
                this.classList.remove('active');
                this.setAttribute('aria-hidden', 'true');
                document.body.classList.remove('modal-open');
                document.body.style.overflow = '';
            }
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.kima-modal-overlay.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                activeModal.setAttribute('aria-hidden', 'true');
                document.body.classList.remove('modal-open');
                document.body.style.overflow = '';
            }
        }
    });

    // Close modal when clicking CTA links inside modal
    const modalCTAs = document.querySelectorAll('.modal-cta a');
    modalCTAs.forEach(cta => {
        cta.addEventListener('click', function () {
            const modal = this.closest('.kima-modal-overlay');
            if (modal) {
                modal.classList.remove('active');
                modal.setAttribute('aria-hidden', 'true');
                document.body.classList.remove('modal-open');
                document.body.style.overflow = '';
            }
        });
    });
});