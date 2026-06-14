const Encore = require("@symfony/webpack-encore");

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || "dev");
}

Encore.enableStimulusBridge("./assets/controllers.json")
    // directory where compiled assets will be stored
    .setOutputPath("public/build/")
    // public path used by the web server to access the output path
    .setPublicPath("/build")
    // only needed for CDN's or subdirectory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry("app", "./assets/app.js")

    /* STYLES */
    // Layout
    .addStyleEntry("base", "./assets/styles/layout/base.css")
    .addStyleEntry("reset", "./assets/styles/layout/reset.css")
    // Components
    .addStyleEntry("navbar", "./assets/styles/components/navbar.css")
    .addStyleEntry(
        "floating-sidebar",
        "./assets/styles/components/floating-sidebar.css",
    )
    .addStyleEntry("footer", "./assets/styles/components/footer.css")
    // Blocks
    .addStyleEntry("bands-marquee", "./assets/styles/blocks/bands-marquee.css")
    .addStyleEntry("featured-bands", "./assets/styles/blocks/featured-bands.css")
    .addStyleEntry("hero", "./assets/styles/blocks/hero.css")
    .addStyleEntry("video-block", "./assets/styles/blocks/video-block.css")
    .addStyleEntry("news-grid", "./assets/styles/blocks/news-grid.css")
    .addStyleEntry("schedule-preview", "./assets/styles/blocks/schedule-preview.css")
    .addStyleEntry("location-block", "./assets/styles/blocks/location-block.css")
    .addStyleEntry("band-bio", "./assets/styles/blocks/band-bio.css")
    .addStyleEntry("band-gallery", "./assets/styles/blocks/band-gallery.css")
    .addStyleEntry("band-header", "./assets/styles/blocks/band-header.css")
    .addStyleEntry("band-media", "./assets/styles/blocks/band-media.css")


    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    //Copy content from assets images to public
    .copyFiles({
        from: "./assets/images",
        to: "images/[path][name].[ext]",
    })
    .copyFiles({
        from: "./assets/video",
        to: "video/[path][name].[ext]",
    })

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()

    // Displays build status system notifications to the user
    // .enableBuildNotifications()

    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // configure Babel
    // .configureBabel((config) => {
    //     config.plugins.push('@babel/a-babel-plugin');
    // })

    // enables and configure @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = "usage";
        config.corejs = "3.38";
    });

// enables Sass/SCSS support
//.enableSassLoader()

// uncomment if you use TypeScript
//.enableTypeScriptLoader()

// uncomment if you use React
//.enableReactPreset()

// uncomment to get integrity="..." attributes on your script & link tags
// requires WebpackEncoreBundle 1.4 or higher
//.enableIntegrityHashes(Encore.isProduction())

// uncomment if you're having problems with a jQuery plugin
//.autoProvidejQuery()

module.exports = Encore.getWebpackConfig();
