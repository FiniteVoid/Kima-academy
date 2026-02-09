/**
 * Leadership Levels Interaction
 * Handles the two-column layout interaction and mobile modal behavior
 */

(function ($) {
    'use strict';

    // Check if we're on mobile
    function isMobile() {
        return window.innerWidth < 768;
    }

    // Show level details in the right panel (desktop)
    function showLevelDetails(levelNum) {
        // Remove active class from all items
        $('.level-item').removeClass('active');
        $('.level-details-content').removeClass('active');

        // Add active class to clicked item
        $(`.level-item[data-level="${levelNum}"]`).addClass('active');
        $(`.level-details-content[data-level-details="${levelNum}"]`).addClass('active');
    }

    // Show level in modal (mobile)
    function showLevelModal(levelNum) {
        const levelContent = $(`.level-details-content[data-level-details="${levelNum}"]`).html();

        // Create modal if it doesn't exist
        if ($('#level-mobile-modal').length === 0) {
            $('body').append(`
        <div id="level-mobile-modal" class="level-modal-overlay">
          <div class="level-modal">
            <button type="button" class="level-modal-close" aria-label="Close">&times;</button>
            <div class="level-modal-content"></div>
          </div>
        </div>
      `);
        }

        // Set content and show modal
        $('#level-mobile-modal .level-modal-content').html(levelContent);
        $('#level-mobile-modal').addClass('is-open');
        $('body').css('overflow', 'hidden');
    }

    // Close mobile modal
    function closeLevelModal() {
        $('#level-mobile-modal').removeClass('is-open');
        $('body').css('overflow', '');
    }

    // Initialize on document ready
    $(document).ready(function () {
        // Level item click handler
        $('.level-item').on('click', function (e) {
            e.preventDefault();
            const levelNum = $(this).data('level');

            if (isMobile()) {
                // On mobile, show modal
                showLevelModal(levelNum);
            } else {
                // On desktop, show in right panel
                showLevelDetails(levelNum);
            }
        });

        // Close modal on close button click
        $(document).on('click', '.level-modal-close', function () {
            closeLevelModal();
        });

        // Close modal on overlay click
        $(document).on('click', '#level-mobile-modal', function (e) {
            if ($(e.target).is('#level-mobile-modal')) {
                closeLevelModal();
            }
        });

        // Close modal on ESC key
        $(document).on('keydown', function (e) {
            if (e.key === 'Escape' && $('#level-mobile-modal').hasClass('is-open')) {
                closeLevelModal();
            }
        });

        // Handle window resize
        let resizeTimer;
        $(window).on('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                // Close mobile modal if switching to desktop
                if (!isMobile() && $('#level-mobile-modal').hasClass('is-open')) {
                    closeLevelModal();
                }
            }, 250);
        });
    });

})(jQuery);
