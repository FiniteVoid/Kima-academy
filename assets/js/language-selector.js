/**
 * Kima Academy Language Selector Dropdown
 * Handles dropdown behavior and language switching
 */
(function () {
    'use strict';

    const LANG_CODES = { en: 'EN', ar: 'AR', he: 'HE' };
    let dropdownBtn, dropdownMenu;

    /**
     * Initialize language selector
     */
    function init() {
        dropdownBtn = document.getElementById('langDropdownBtn');
        dropdownMenu = document.getElementById('langDropdownMenu');

        if (!dropdownBtn || !dropdownMenu) {
            console.warn('Language selector elements not found');
            return;
        }

        // Wait for i18n to initialize, then set initial state
        setTimeout(() => {
            const currentLang = window.KimaI18n?.getCurrentLanguage() || 'en';
            updateDropdownDisplay(currentLang);
        }, 100);

        // Add event listeners
        dropdownBtn.addEventListener('click', toggleDropdown);

        // Language option clicks
        dropdownMenu.querySelectorAll('.lang-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const lang = option.getAttribute('data-lang');
                selectLanguage(lang);
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.kima-language-selector')) {
                closeDropdown();
            }
        });

        // Keyboard support
        dropdownBtn.addEventListener('keydown', handleKeydown);

        // Listen for language changes from other sources
        window.addEventListener('languageChanged', (e) => {
            updateDropdownDisplay(e.detail.language);
        });
    }

    /**
     * Toggle dropdown open/close
     */
    function toggleDropdown(e) {
        e.preventDefault();
        e.stopPropagation();

        const isOpen = dropdownMenu.classList.contains('active');

        if (isOpen) {
            closeDropdown();
        } else {
            openDropdown();
        }
    }

    /**
     * Open dropdown
     */
    function openDropdown() {
        dropdownMenu.classList.add('active');
        dropdownBtn.setAttribute('aria-expanded', 'true');
    }

    /**
     * Close dropdown
     */
    function closeDropdown() {
        dropdownMenu.classList.remove('active');
        dropdownBtn.setAttribute('aria-expanded', 'false');
    }

    /**
     * Select a language
     */
    function selectLanguage(lang) {
        if (window.KimaI18n) {
            window.KimaI18n.switchLanguage(lang);
            updateDropdownDisplay(lang);
        }
        closeDropdown();
    }

    /**
     * Update button display with current language
     */
    function updateDropdownDisplay(lang) {
        const currentSpan = dropdownBtn?.querySelector('.lang-current');
        if (currentSpan) {
            currentSpan.textContent = LANG_CODES[lang] || 'EN';
        }

        // Update active state on options
        dropdownMenu?.querySelectorAll('.lang-option').forEach(option => {
            if (option.getAttribute('data-lang') === lang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }

    /**
     * Handle keyboard navigation
     */
    function handleKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleDropdown(e);
        } else if (e.key === 'Escape') {
            closeDropdown();
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
