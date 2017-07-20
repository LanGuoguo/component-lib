const gulp = require("gulp");
const gts = require("gulp-typescript");
const tsc = require("typescript");
const fs = require("fs");
const path = require("path");
const tscOptions = require("./tsconfig.gulp.json").compilerOptions;

const sourcePath = path.resolve(__dirname, "src/components");
const tsxPaths = fs.readdirSync(sourcePath);
const tsxEntries =
  tsxPaths.reduce(
    (entries, curPath) => {
      let compEntries = [];
      const basePath = path.resolve(sourcePath, curPath);

      if (curPath.includes("index")) {
        compEntries.push({ index: basePath });
      }
      else {
        // console.log(fs.readdirSync(basePath));
        const childEntries = fs.readdirSync(basePath)
        compEntries = childEntries.map(childEntry => ({ [curPath]: path.resolve(basePath, childEntry) }))
      }

      return [...entries, ...compEntries];
    },
    []
  );

gulp.task("default", () => {
  // console.log(tsxEntries);
  tsxEntries.forEach((tsxEntry, tsxEntryIndex) => {
    const [[ entryName, entryPath ]] = Object.entries(tsxEntry);
    if (entryName === "index") {
      tscOptions.outDir = path.resolve(__dirname, "components_temp");
    } else {
      tscOptions.outDir = path.resolve(__dirname, "components_temp", entryName);
    }

    gulp
      .src(entryPath)
      .pipe(gts(tscOptions))
      .pipe(gulp.dest(tscOptions.outDir));
  });
});
