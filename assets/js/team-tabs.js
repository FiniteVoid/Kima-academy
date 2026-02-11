// KIMA Main Site - Team Tabs Handler
document.addEventListener('DOMContentLoaded', function () {
    const teamTabs = document.querySelectorAll('.h6-tab');
    const tabContents = document.querySelectorAll('.h6-tab-content');

    // Tab click handler
    teamTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const index = this.getAttribute('data-index');

            // Remove active class from all tabs
            teamTabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            // Show selected tab content
            const activeContent = document.getElementById('tab-' + index);
            if (activeContent) {
                activeContent.classList.add('active');
            }
        });
    });

    // Initialize Swiper for team carousel
    if (typeof Swiper !== 'undefined') {
        const teamSlider = new Swiper('.team-tab-slider', {
            slidesPerView: 'auto',
            spaceBetween: 20,
            centeredSlides: false,
            freeMode: true,
            grabCursor: true,
            breakpoints: {
                320: {
                    slidesPerView: 3,
                    spaceBetween: 10
                },
                480: {
                    slidesPerView: 4,
                    spaceBetween: 15
                },
                640: {
                    slidesPerView: 5,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: 6,
                    spaceBetween: 20
                },
                1024: {
                    slidesPerView: 8,
                    spaceBetween: 20
                },
                1200: {
                    slidesPerView: 11,
                    spaceBetween: 20
                }
            }
        });
    }
});