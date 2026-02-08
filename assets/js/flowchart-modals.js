/**
 * Kima Academy - Flowchart Modal Handler
 * Manages the interactive flowchart and program detail modals
 */
(function ($) {
    'use strict';

    // Flowchart Modal Manager
    const FlowchartModals = {

        init: function () {
            this.bindEvents();
            this.setupAccessibility();
        },

        bindEvents: function () {
            // Open modal on node click
            $('[data-program-modal]').on('click', this.openModal);

            // Close modal on background click
            $('.program-modal-overlay').on('click', this.handleOverlayClick);

            // Close modal on close button click
            $('.program-modal-close').on('click', this.closeModal);

            // Close modal on Escape key
            $(document).on('keydown', this.handleEscapeKey);

            // Pillar modals
            $('[data-kima-modal]').on('click', this.openModal);
            $('.kima-modal-close').on('click', this.closeKimaModal);
            $('.kima-modal-overlay').on('click', this.handleKimaOverlayClick);
        },

        openModal: function (e) {
            e.preventDefault();
            const modalId = $(this).data('program-modal') || $(this).data('kima-modal');
            const $modal = $('#' + modalId);

            if ($modal.length) {
                $modal.addClass('is-open');
                $('body').css('overflow', 'hidden');

                // Focus on modal for accessibility
                setTimeout(() => {
                    $modal.find('.program-modal-close, .kima-modal-close').first().focus();
                }, 100);

                // Add entrance animation
                $modal.find('.program-modal, .kima-modal').css({
                    opacity: 0,
                    transform: 'scale(0.9) translateY(20px)'
                }).animate({
                    opacity: 1
                }, 300).css({
                    transform: 'scale(1) translateY(0)'
                });
            }
        },

        closeModal: function (e) {
            if (e) e.preventDefault();
            const $overlay = $(this).closest('.program-modal-overlay');

            // Exit animation
            $overlay.find('.program-modal').animate({
                opacity: 0
            }, 200, function () {
                $overlay.removeClass('is-open');
                $('body').css('overflow', '');
            });
        },

        closeKimaModal: function (e) {
            if (e) e.preventDefault();
            const $overlay = $(this).closest('.kima-modal-overlay');

            // Exit animation
            $overlay.find('.kima-modal').animate({
                opacity: 0
            }, 200, function () {
                $overlay.removeClass('is-open');
                $('body').css('overflow', '');
            });
        },

        handleOverlayClick: function (e) {
            if ($(e.target).hasClass('program-modal-overlay')) {
                FlowchartModals.closeModal.call(this, e);
            }
        },

        handleKimaOverlayClick: function (e) {
            if ($(e.target).hasClass('kima-modal-overlay')) {
                FlowchartModals.closeKimaModal.call(this, e);
            }
        },

        handleEscapeKey: function (e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                const $openModal = $('.program-modal-overlay.is-open, .kima-modal-overlay.is-open');
                if ($openModal.length) {
                    $openModal.removeClass('is-open');
                    $('body').css('overflow', '');
                }
            }
        },

        setupAccessibility: function () {
            // Add ARIA labels to flowchart nodes
            $('[data-program-modal]').each(function () {
                const modalId = $(this).data('program-modal');
                $(this).attr({
                    'role': 'button',
                    'aria-haspopup': 'dialog',
                    'aria-label': 'View details for ' + $(this).find('.node-title').text(),
                    'tabindex': '0'
                });

                // Allow keyboard activation
                $(this).on('keypress', function (e) {
                    if (e.which === 13 || e.which === 32) { // Enter or Space
                        e.preventDefault();
                        $(this).click();
                    }
                });
            });

            // Add ARIA labels to modals
            $('.program-modal-overlay, .kima-modal-overlay').attr({
                'role': 'dialog',
                'aria-modal': 'true',
                'aria-hidden': 'true'
            });

            $('.program-modal-overlay.is-open, .kima-modal-overlay.is-open').attr('aria-hidden', 'false');
        }
    };

    // Initialize on document ready
    $(document).ready(function () {
        FlowchartModals.init();
    });

    // Re-initialize if new content is loaded dynamically
    $(document).on('content-loaded', function () {
        FlowchartModals.init();
    });

})(jQuery);
