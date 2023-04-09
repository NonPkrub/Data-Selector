let mix = require('laravel-mix');

mix.setPublicPath('./')
    .sass('assets/sass/popup.scss', 'dist/css')
    .js('assets/js/background.js' , 'dist/js')
    .js('assets/js/popup.js', 'dist/js').vue()
    .options({
        processCssUrls: false
    });

// Bundle content script separately
// mix.js('assets/js/content_scripts/content.js', 'dist/content_scripts');

// Listen for click events on browser action icon
