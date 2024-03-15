const gulp = require("gulp");
var browserSync = require("browser-sync").create();
const less = require("gulp-less");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const watch = require("gulp-watch");

gulp.task("styles", function () {
  return gulp
    .src("./app/less/main.less")
    .pipe(
      plumber({
        errorHandler: notify.onError(function (err) {
          return {
            title: "Styles",
            sound: false,
            message: err.message,
          };
        }),
      })
    )
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 6 version"],
        cascade: false,
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./app/css"))
    .pipe(browserSync.stream());
});

gulp.task(
  "server",
  gulp.series("styles", function serverTask() {
    browserSync.init({
      server: {
        baseDir: "./app/",
      },
    });

    watch(["./app/**/*.html", "./app/**/*.js"]).on(
      "change",
      browserSync.reload
    );

    watch("./app/less/**/*.less", gulp.series("styles"));
  })
);

gulp.task("default", gulp.series("server"));
