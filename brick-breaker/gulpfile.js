var gulp = require("gulp");
var ts = require("gulp-typescript");

var config = {
    tsFiles: "./src/**/*.ts",
    outputPath: "./src",
    tsDefinitions: "./typings/**/*.d.ts",
    tscConf: {
        target: "ES5",
        module: "umd",
        declarationFiles: false,
        noExternalResolve: true,
        out: "app.js",
        noImplicitAny: true
    }
};

gulp.task("watch", function () {
    gulp.watch([config.tsFiles], ["compile"]);
});

gulp.task("compile", function () {
    var sourceTsFiles = [
        config.tsFiles,
        config.tsDefinitions];

    var tsResult = gulp.src(sourceTsFiles)
        .pipe(ts(config.tscConf));

	return tsResult.js.pipe(gulp.dest
        (config.outputPath));
});