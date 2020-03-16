// https://levelup.gitconnected.com/how-to-setup-your-workflow-using-gulp-v4-0-0-5450e3d7c512

const gulp = require('gulp')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const replace = require('gulp-replace')
const sourcemaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync').create()

const paths = {
  styles: {
    // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
    src: 'src-static/scss/**/*.scss',
    // Compiled files will end up in whichever folder it's found in (partials are not compiled)
    dest: 'public/dist/css'
  },
  js: {
    src: 'src-static/js/**/*.js',
    dest: 'public/dist/js'
  },
  images: {
    src: 'src-static/images/*',
    dest: 'public/dist/images'
  },
  fonts: {
    src: 'src-static/fonts/*',
    dest: 'public/dist/css/fonts'
  },
  libs: {
    src: 'src-static/lib/**/*',
    dest: 'public/dist/lib'
  }
}

/* Optimize our scss files */
function style() {
  return (
    gulp
      .src(paths.styles.src)
      // Initialize sourcemaps before compilation starts
      .pipe(sourcemaps.init())
      .pipe(sass())
      .on('error', sass.logError)
      // Use postcss with autoprefixer and compress the compiled file using cssnano
      .pipe(postcss([autoprefixer(), cssnano()]))
      // Now add/write the sourcemaps
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.styles.dest))
      // Add browsersync stream pipe after compilation
      .pipe(browserSync.stream())
  )
}

/* Optimize our images */
function image() {
  return gulp
    .src(paths.images.src)
    .pipe(
      imagemin([
        imagemin.svgo({
          plugins: [
            { removeXMLProcInst: false },
            { removeMetadata: false },
            { removeXMLNS: false },
            { removeEditorsNSData: false },
            { removeEmptyAttrs: false },
            { removeHiddenElems: false },
            { removeEmptyText: false },
            { removeEmptyContainers: false },
            { removeViewBox: false },
            { cleanupEnableBackground: false },
            { minifyStyles: false },
            { convertStyleToAttrs: false },
            { convertPathData: false },
            { convertTransform: false },
            { rremoveUnknownsAndDefaults: false },
            { removeNonInheritableGroupAttrs: false },
            { removeUselessStrokeAndFill: false },
            { removeUnusedNS: false },
            { prefixIds: false },
            { cleanupNumericValues: false },
            { cleanupListOfValues: false }
          ]
        })
      ])
    )
    .pipe(gulp.dest(paths.images.dest))
    .pipe(browserSync.stream())
}

/* Copy out fonts over to dist */
function font() {
  return gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dest))
}

/* Copy out libs over to dist */
function lib() {
  return gulp.src(paths.libs.src).pipe(gulp.dest(paths.libs.dest))
}

/* Optimize and concat our scripts */
function script() {
  return gulp
    .src([
      'src-static/lib/bootstrap/js/jquery-3.4.1.min.js',
      'src-static/lib/bootstrap/js/popper.min.js',
      'src-static/lib/bootstrap/js/bootstrap.4.3.min.js',
      'src-static/lib/slick/slick.min.js',
      'src-static/lib/dateformat/jquery-dateformat.min.js',
      'src-static/lib/raven.min.js',
      'src-static/js/main.js'
    ])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.stream())
}

/* Cache busting by adding timestamp query string to our optimized files */
const timeStamp = new Date().getTime()
function cacheBust() {
  return gulp
    .src(['public/**/*.html'])
    .pipe(replace(/CACHEBUSTER_TIMESTAMP/g, timeStamp))
    .pipe(gulp.dest('./public/.'))
}

// A simple task to reload the page
function reload() {
  browserSync.reload()
}

// Add browsersync initialization at the start of the watch task
function watch() {
  browserSync.init({
    // You can tell browserSync to use this directory and serve it as a mini-server
    server: {
      baseDir: './public'
    }
    // If you are already serving your website locally using something like apache
    // You can use the proxy setting to proxy that instead
    // proxy: "yourlocal.dev"
  })
  gulp.watch(paths.styles.src, style)
  gulp.watch(paths.js.src, script)
  gulp.watch(paths.images.src, image)
  gulp.watch(paths.fonts.src, font)
  gulp.watch(paths.libs.src, lib)
  // We should tell gulp which files to watch to trigger the reload
  // This can be html or whatever you're using to develop your website
  // Note -- you can obviously add the path to the Paths object
  gulp.watch('public/*.html', reload)
}

// Don't forget to expose the task!
exports.watch = watch

// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
exports.style = style
exports.image = image
exports.font = font
exports.lib = lib
exports.script = script
exports.cacheBust = cacheBust

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
const build = gulp.parallel(
  ...[style, image, font, lib, script].concat(
    process.env.TRAVIS ? cacheBust : []
  )
)

/*
 * You can still use `gulp.task` to expose tasks
 */
gulp.task('build', build)

/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task('default', build)
