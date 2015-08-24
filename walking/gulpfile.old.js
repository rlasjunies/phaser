// var inject = require("gulp-inject");
var gulp = require("gulp");
var ts = require("gulp-typescript");
var del = require("del");
var tslint = require("gulp-tslint");
// var sourcemaps = require("gulp-sourcemaps");
// var html2ts = require("gulp-html-to-ts");
// var less = require('gulp-less');
// var imageResize = require('gulp-image-resize');
// var typedoc = require("gulp-typedoc");
// var exec = require('child_process').exec;

var config = {
    paths: {
        // web:{
            tsFiles: "./**/*.ts",
        //     htmlWebTemplateFiles: "./web/**/*.htm",
            outputPath: "./www",
        //     htmlFiles: ["./web/index.html", "./web/sidenav/sidenav.html"]
        // },
        // api:{
        //     tsApiFiles: "./api/**/*.ts",
        //     tsApiOutputPath: "./www/api",
        // },   
        typings: {
            tsDefinitions: "./typings/**/*.d.ts",
        },
        // styles:{
        //     lessFiles: "./styles/*.less",
        //     lessOutputPath: "./www/styles"
        // },
        // doc:{
        //     docOutputPath: "./www/doc"
        // }
    },
    tscConf: {
        target: "ES5",
        module: "umd",
        declarationFiles: false,
        noExternalResolve: true,
        out: "app.js",
        //typescript: require('typescript') 
    }
};

gulp.task("build", ["compile", "lint"]);

gulp.task("watch", function () {
    gulp.watch([config.paths.tsFiles], ["build"]);
});

gulp.task("lint", function () {
    return gulp.src(config.paths.tsFiles).pipe(tslint()).pipe(tslint.report("prose"));
});

gulp.task("compile", function () {
    var sourceTsFiles = [
        config.paths.tsFiles,
        config.paths.typings.tsDefinitions]; //reference to app.d.ts files
    
    return gulp.src(sourceTsFiles)
        .pipe(ts(config.tscConf));
    
    // tsResult.dts
    //     .pipe(gulp.dest(config.paths.outputPath));
    //     
    // tsResult.js
    //     .pipe(sourcemaps.write("."))
    //     .pipe(gulp.dest(config.paths.web.webOutputPath));
    // //    
    // return gulp.src(config.paths.web.htmlFiles) //TODO inject app or minified version of app.js, remove sideNav.html to directive or something like that 
    //     .pipe(gulp.dest(config.paths.web.webOutputPath));
});

gulp.task("cleanAllJs", function (cb) {
    var tsGenFiles = [
        config.paths.outputPath + "/**/*.js",
        config.paths.outputPath + "/**/*.js.map", // path to all sourcemap files auto gen"d by editor
    ];
    // delete the files
    del(tsGenFiles, cb);
});
