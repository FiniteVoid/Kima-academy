/**
 * Kima Academy i18n (Internationalization) System
 * Handles English, Arabic, and Hebrew translations
 * No build step required - pure client-side
 */
(function () {
    'use strict';

    const DEFAULT_LANG = 'en';
    const SUPPORTED_LANGS = ['en', 'ar', 'he'];
    const RTL_LANGS = ['ar', 'he'];
    const STORAGE_KEY = 'kimaLang';

    let currentLang = DEFAULT_LANG;
    let translations = {};

    /**
     * Detect language from URL, localStorage, or browser
     */
    function detectLanguage() {
        // Priority 1: URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && SUPPORTED_LANGS.includes(urlLang)) {
            return urlLang;
        }

        // Priority 2: localStorage
        const storedLang = localStorage.getItem(STORAGE_KEY);
        if (storedLang && SUPPORTED_LANGS.includes(storedLang)) {
            return storedLang;
        }

        // Priority 3: Browser language
        const browserLang = navigator.language.split('-')[0];
        if (SUPPORTED_LANGS.includes(browserLang)) {
            return browserLang;
        }

        // Default: English
        return DEFAULT_LANG;
    }

    /**
     * Load translations from JSON file
     */
    async function loadTranslations() {
        try {
            const response = await fetch('./assets/js/translations.json');
            if (!response.ok) {
                throw new Error('Failed to load translations');
            }
            translations = await response.json();
            return true;
        } catch (error) {
            console.error('Translation load error:', error);
            return false;
        }
    }

    /**
     * Get translated text with fallback to English
     */
    function t(key, lang = currentLang) {
        const keys = key.split('.');
        let value = translations[lang];

        // Navigate through nested keys
        for (const k of keys) {
            if (value && value[k] !== undefined) {
                value = value[k];
            } else {
                // Fallback to English
                value = translations[DEFAULT_LANG];
                for (const fk of keys) {
                    if (value && value[fk] !== undefined) {
                        value = value[fk];
                    } else {
                        // If not found in English either, return the key
                        console.warn(`Translation key not found: ${key}`);
                        return key;
                    }
                }
                break;
            }
        }

        return typeof value === 'string' ? value : key;
    }

    /**
     * Apply translations to DOM elements with data-i18n attribute
     */
    function applyTranslations() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = t(key);

            // Handle different element types
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                // For input elements, update placeholder
                if (el.hasAttribute('placeholder')) {
                    el.placeholder = translation;
                } else {
                    el.value = translation;
                }
            } else if (el.tagName === 'IMG') {
                // For images, update alt text
                el.alt = translation;
            } else {
                // For all other elements, update text content
                el.textContent = translation;
            }
        });

        // Update page title
        const titleKey = 'site.title';
        if (translations[currentLang] && translations[currentLang]['site'] && translations[currentLang]['site']['title']) {
            document.title = t(titleKey);
        }

        // Update HTML lang and dir attributes
        const htmlEl = document.documentElement;
        htmlEl.setAttribute('lang', currentLang);

        // Apply RTL layout for Arabic and Hebrew
        if (RTL_LANGS.includes(currentLang)) {
            htmlEl.setAttribute('dir', 'rtl');
            document.body.classList.add('rtl-layout');

            // Load RTL stylesheet if not already loaded
            const rtlLink = document.getElementById('rtl-stylesheet');
            if (!rtlLink) {
                const link = document.createElement('link');
                link.id = 'rtl-stylesheet';
                link.rel = 'stylesheet';
                link.href = './assets/css/main-rtl.css';
                document.head.appendChild(link);
            }
        } else {
            htmlEl.setAttribute('dir', 'ltr');
            document.body.classList.remove('rtl-layout');

            // Remove RTL stylesheet if exists
            const rtlLink = document.getElementById('rtl-stylesheet');
            if (rtlLink) {
                rtlLink.remove();
            }
        }

        // Update URL without reload
        updateURL(currentLang);

        // Store preference
        localStorage.setItem(STORAGE_KEY, currentLang);
    }

    /**
     * Update URL with language parameter
     */
    function updateURL(lang) {
        const url = new URL(window.location);
        if (lang === DEFAULT_LANG) {
            // Remove lang parameter for default language
            url.searchParams.delete('lang');
        } else {
            url.searchParams.set('lang', lang);
        }
        window.history.replaceState({}, '', url);
    }

    /**
     * Switch to a different language
     */
    function switchLanguage(lang) {
        if (!SUPPORTED_LANGS.includes(lang)) {
            console.warn(`Unsupported language: ${lang}`);
            return;
        }

        currentLang = lang;
        applyTranslations();

        // Dispatch custom event for other scripts to react
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: lang }
        }));
    }

    /**
     * Get current language
     */
    function getCurrentLanguage() {
        return currentLang;
    }

    /**
     * Check if current language is RTL
     */
    function isRTL() {
        return RTL_LANGS.includes(currentLang);
    }

    /**
     * Create language switcher UI (optional)
     */
    function createLanguageSwitcher() {
        // Check if switcher already exists
        if (document.getElementById('kima-lang-switcher')) {
            return;
        }

        // Find suitable place to insert switcher (e.g., in header)
        const header = document.querySelector('.header-wrapper');
        if (!header) return;

        const switcher = document.createElement('div');
        switcher.id = 'kima-lang-switcher';
        switcher.className = 'kima-language-selector';
        switcher.innerHTML = `
      <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en" aria-label="Switch to English">EN</button>
      <button class="lang-btn ${currentLang === 'ar' ? 'active' : ''}" data-lang="ar" aria-label="Switch to Arabic">عربى</button>
      <button class="lang-btn ${currentLang === 'he' ? 'active' : ''}" data-lang="he" aria-label="Switch to Hebrew">עברית</button>
    `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
      .kima-language-selector {
        display: inline-flex;
        gap: 0.5rem;
        align-items: center;
        margin-left: 1rem;
      }
      .kima-language-selector .lang-btn {
        background: transparent;
        border: 1px solid rgba(255,255,255,0.3);
        color: #fff;
        padding: 0.375rem 0.75rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: 600;
        transition: all 0.2s;
      }
      .kima-language-selector .lang-btn:hover {
        background: rgba(255,255,255,0.1);
        border-color: rgba(255,255,255,0.5);
      }
      .kima-language-selector .lang-btn.active {
        background: #D1B59C;
        border-color: #D1B59C;
        color: #fff;
      }
      @media (max-width: 991px) {
        .kima-language-selector {
          margin-left: 0;
          margin-top: 1rem;
        }
      }
    `;
        document.head.appendChild(style);

        // Insert switcher
        header.appendChild(switcher);

        // Add click handlers
        switcher.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetLang = btn.getAttribute('data-lang');

                // Update active state
                switcher.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Switch language
                switchLanguage(targetLang);
            });
        });
    }

    /**
     * Initialize i18n system
     */
    async function init() {
        // Detect language
        currentLang = detectLanguage();

        // Load translations
        const loaded = await loadTranslations();

        if (loaded && translations[currentLang]) {
            // Apply translations to the page
            applyTranslations();

            // Create language switcher (optional)
            // createLanguageSwitcher();

            // Listen for manual language switches
            document.querySelectorAll('[data-lang-switch]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetLang = btn.getAttribute('data-lang-switch');
                    switchLanguage(targetLang);
                });
            });

            console.log(`Kima i18n initialized (${currentLang})`);
        } else {
            console.error('Failed to initialize i18n system');
        }
    }

    // Expose public API
    window.KimaI18n = {
        init,
        t,
        switchLanguage,
        getCurrentLanguage,
        isRTL,
        createLanguageSwitcher
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
