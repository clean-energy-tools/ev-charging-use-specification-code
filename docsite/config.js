
const akasha  = require('akasharender');

const config = new akasha.Configuration();

// TODO - Update this to akashacms.github.io/open-source-site
// when that's ready

// This URL is used as the base URL of the website.
// Any time AkashaCMS code calculates the full URL of
// a thing in the site, it will use this URL.
config.rootURL("https://clean-energy-tools.github.io/ev-charging-use-specification-code/");

// This informs the Configuration where it is located
// in the file-system.  Any time AkashaCMS code calculates
// a pathname, it uses this plus the relative pathname
// from the root of the project.
config.configDir = __dirname;

// Directories for this project
config
    .addAssetsDir('assets')
    .addAssetsDir({
        src: 'node_modules/bootstrap/dist',
        dest: 'vendor/bootstrap'
    })
   .addAssetsDir({
        src: 'node_modules/jquery/dist',
        dest: 'vendor/jquery'
    })
    .addAssetsDir({
        src: 'node_modules/popper.js/dist',
        dest: 'vendor/popper.js'
    })
    // .addAssetsDir({
    //     src: 'node_modules/@fortawesome/fontawesome-free/',
    //     dest: 'vendor/fontawesome-free'
    // })
    .addAssetsDir({
        src: 'node_modules/swagger-ui/dist',
        dest: 'vendor/swagger-ui'
    })
    .addAssetsDir({
        src: '../node/src/schemas',
        dest: 'schemas'
    })
    .addLayoutsDir('layouts')
    .addDocumentsDir('documents')
    .addPartialsDir('partials');

config
    .use(require('@akashacms/theme-bootstrap'))
    .use(require('@akashacms/plugins-base'), {
        generateSitemapFlag: true
    })
    .use(require('@akashacms/plugins-breadcrumbs'))
    .use(require('@akashacms/plugins-booknav'))
    .use(require('@akashacms/plugins-external-links'))
    .use(require('@akashacms/plugins-footnotes'));

config
    .addFooterJavaScript({ href: "/vendor/jquery/jquery.min.js" })
    .addFooterJavaScript({ href: "/vendor/popper.js/umd/popper.min.js" })
    .addFooterJavaScript({ href: "/vendor/bootstrap/js/bootstrap.min.js" })
    .addStylesheet({ href: "/vendor/bootstrap/css/bootstrap.min.css" })
    .addStylesheet({ href: "/css/flatly.min.css" })
    .addStylesheet({ href: "/css/style.css" })
    // .addStylesheet({ href: "/vendor/fontawesome-free/css/all.min.css" })
    ;


config.setMahabhutaConfig({
    recognizeSelfClosing: true,
    recognizeCDATA: true
});

config.prepare();
module.exports = config;
    