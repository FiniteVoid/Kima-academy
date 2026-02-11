/**
 * Glowing Connection Lines for Kima Pillars Section
 * Connects cards from their edges (left from left, middle from bottom, right from right)
 * Responsive: adapts to different screen sizes
 */

(function ($) {
    'use strict';

    $(document).ready(function () {

        const $section = $('.kima-pillars-feature');
        const $pillarCards = $section.find('.feature-item');

        if ($pillarCards.length === 0) return;

        // Create canvas element
        const canvas = document.createElement('canvas');
        canvas.id = 'pillars-connection-canvas';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        canvas.style.opacity = '0';

        $section.css('position', 'relative');
        $section[0].insertBefore(canvas, $section[0].firstChild);

        const ctx = canvas.getContext('2d');
        let animationFrame = null;
        let linesAnimated = false;
        let connections = [];

        function resizeCanvas() {
            const rect = $section[0].getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        }

        function calculateConnections() {
            connections = [];
            const sectionRect = $section[0].getBoundingClientRect();

            $pillarCards.each(function (index) {
                const cardRect = this.getBoundingClientRect();
                const relativeTop = cardRect.top - sectionRect.top;
                const relativeBottom = cardRect.bottom - sectionRect.top;
                const relativeLeft = cardRect.left - sectionRect.left;
                const relativeRight = cardRect.right - sectionRect.left;
                const cardCenterY = relativeTop + (cardRect.height / 2);
                const cardCenterX = relativeLeft + (cardRect.width / 2);

                let startX, startY, endX, endY, controlX, controlY;

                const winWidth = $(window).width();
                const cardsPerRow = winWidth > 991 ? 3 : (winWidth > 767 ? 2 : 1);
                const colIndex = index % cardsPerRow;

                if (cardsPerRow === 3) {
                    if (colIndex === 0) {
                        // Left card from left edge
                        startX = 0;
                        startY = cardCenterY;
                        endX = relativeLeft;
                        endY = cardCenterY;
                        controlX = startX + (endX - startX) * 0.3;
                        controlY = startY;
                    } else if (colIndex === 1) {
                        // Middle card from bottom
                        startX = cardCenterX;
                        startY = sectionRect.height;
                        endX = cardCenterX;
                        endY = relativeBottom;
                        controlX = startX;
                        controlY = startY - (startY - endY) * 0.3;
                    } else {
                        // Right card from right edge
                        startX = sectionRect.width;
                        startY = cardCenterY;
                        endX = relativeRight;
                        endY = cardCenterY;
                        controlX = startX - (startX - endX) * 0.3;
                        controlY = startY;
                    }
                } else if (cardsPerRow === 2) {
                    if (colIndex === 0) {
                        // Left card from left edge
                        startX = 0;
                        startY = cardCenterY;
                        endX = relativeLeft;
                        endY = cardCenterY;
                        controlX = startX + (endX - startX) * 0.3;
                        controlY = startY;
                    } else {
                        // Right card from right edge
                        startX = sectionRect.width;
                        startY = cardCenterY;
                        endX = relativeRight;
                        endY = cardCenterY;
                        controlX = startX - (startX - endX) * 0.3;
                        controlY = startY;
                    }
                } else {
                    // Mobile: alternating pattern
                    if (index % 3 === 0) {
                        startX = 0;
                        startY = cardCenterY;
                        endX = relativeLeft;
                        endY = cardCenterY;
                        controlX = startX + (endX - startX) * 0.3;
                        controlY = startY;
                    } else if (index % 3 === 1) {
                        startX = sectionRect.width;
                        startY = cardCenterY;
                        endX = relativeRight;
                        endY = cardCenterY;
                        controlX = startX - (startX - endX) * 0.3;
                        controlY = startY;
                    } else {
                        startX = cardCenterX;
                        startY = sectionRect.height;
                        endX = cardCenterX;
                        endY = relativeBottom;
                        controlX = startX;
                        controlY = startY - (startY - endY) * 0.3;
                    }
                }

                connections.push({
                    startX, startY, endX, endY, controlX, controlY,
                    progress: 0,
                    maxProgress: 1
                });
            });
        }

        function drawConnections() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            connections.forEach((conn) => {
                if (conn.progress <= 0) return;

                const currentEndX = conn.startX + (conn.endX - conn.startX) * conn.progress;
                const currentEndY = conn.startY + (conn.endY - conn.startY) * conn.progress;
                const currentControlX = conn.startX + (conn.controlX - conn.startX) * conn.progress;
                const currentControlY = conn.startY + (conn.controlY - conn.startY) * conn.progress;

                ctx.save();
                ctx.shadowColor = '#00d4ff';
                ctx.shadowBlur = 20;

                ctx.beginPath();
                ctx.moveTo(conn.startX, conn.startY);
                ctx.quadraticCurveTo(currentControlX, currentControlY, currentEndX, currentEndY);

                const gradient = ctx.createLinearGradient(conn.startX, conn.startY, currentEndX, currentEndY);
                gradient.addColorStop(0, 'rgba(0, 97, 255, 0.3)');
                gradient.addColorStop(0.5, 'rgba(0, 212, 255, 0.8)');
                gradient.addColorStop(1, 'rgba(0, 97, 255, 0.4)');

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 3;
                ctx.lineCap = 'round';
                ctx.stroke();

                if (conn.progress >= 0.95) {
                    ctx.beginPath();
                    ctx.arc(conn.endX, conn.endY, 6, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(0, 212, 255, 0.8)';
                    ctx.fill();

                    ctx.beginPath();
                    ctx.arc(conn.endX, conn.endY, 3, 0, Math.PI * 2);
                    ctx.fillStyle = '#00d4ff';
                    ctx.fill();
                }

                ctx.restore();
            });
        }

        function animateLines() {
            let allComplete = true;

            connections.forEach((conn) => {
                if (conn.progress < conn.maxProgress) {
                    conn.progress += 0.02;
                    if (conn.progress > conn.maxProgress) conn.progress = conn.maxProgress;
                    allComplete = false;
                }
            });

            drawConnections();

            if (!allComplete) {
                animationFrame = requestAnimationFrame(animateLines);
            }
        }

        function initConnections() {
            if (linesAnimated) return;

            resizeCanvas();
            calculateConnections();

            $(canvas).animate({ opacity: 1 }, 400, function () {
                setTimeout(() => {
                    animateLines();
                }, 300);
            });

            linesAnimated = true;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                    // Animate cards first
                    $pillarCards.each(function (index) {
                        const $card = $(this);
                        const delay = parseFloat($card.attr('data-wow-delay') || 0) * 1000;
                        setTimeout(() => {
                            $card.addClass('pillar-animate');
                        }, delay);
                    });

                    // Then animate connection lines after cards
                    setTimeout(() => {
                        initConnections();
                    }, 800);
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });

        observer.observe($section[0]);

        let resizeTimeout;
        $(window).on('resize', function () {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (linesAnimated) {
                    resizeCanvas();
                    calculateConnections();
                    connections.forEach(conn => conn.progress = 1);
                    drawConnections();
                }
            }, 250);
        });

    });

})(jQuery);