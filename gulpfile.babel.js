import gulp from 'gulp';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'; // Recommended helper for modern yargs
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass'; // The modern compiler
import gulpif from 'gulp-if'; // Helpful for conditional logic
import cleanCss from 'gulp-clean-css'; // To actually minify
import sourcemaps from 'gulp-sourcemaps';
import imagemin from 'gulp-imagemin';
import { deleteAsync } from 'del';
import webpack from "webpack-stream";
import named from 'vinyl-named';
import browserSync from 'browser-sync';
import zip from 'gulp-zip';
import replace from 'gulp-replace';
import info from './package.json';

const sass = gulpSass(dartSass); // Tell gulp-sass to use dart-sass
const server  =browserSync.create();
const argv = yargs(hideBin(process.argv)).argv;
const PRODUCTION = !!argv.prod; // Ensures it's a true boolean

const paths={
     styles:{
          src:['src/assets/scss/bundle.scss', 'src/assets/scss/admin.scss'],
          dest:'dist/assets/css'
     },
     images:{
           src:'src/assets/images/**/*.{jpg,jpeg,png,svg,gif}',
           dest:'dist/assets/images'
     },
    scripts:{
          src:['src/assets/js/bundle.js', 'src/assets/js/admin.js'],
         dest:'dist/assets/js'
    },
     other:{
           src:['src/assets/**/*', '!src/assets/{images,js,scss}','!src/assets/{images,js,scss}/**/*'],
           dest:'dist/assets'
     },
    package:{
         src:['**/*','!.vscode','!node_modules{,/**}','!packaged{,/**}','!src{,/**}','!.babelrc','!.gitignore','!gulpfile.babel.js','!package.json','!package-lock.js'],
         dest:'packaged'
    }
}

export const serve=(done)=>{
    server.init({
        proxy:"http://themewithplugin.local/"
    });
    done();
}

export const reload=(done)=>{
    server.reload();
    done();
}
export const clean=()=> deleteAsync(['dist']);


export const styles = () => {
     return gulp.src(paths.styles.src)
         .pipe(gulpif(!PRODUCTION,sourcemaps.init()))
         .pipe(sass().on('error', sass.logError))
         // If PRODUCTION is true, minify the CSS
         .pipe(gulpif(PRODUCTION, cleanCss()))
         .pipe(gulpif(!PRODUCTION,sourcemaps.write()))
         .pipe(gulp.dest(paths.styles.dest))
          .pipe(server.stream()); //injecting CSS without full reload
};


export const images=() =>{
     return gulp.src(paths.images.src)
         .pipe(gulpif(PRODUCTION,imagemin()))
         .pipe(gulp.dest(paths.images.dest));
}

export const watch = () =>{
     gulp.watch('src/assets/scss/**/*.scss',styles);
    gulp.watch('src/assets/js/**/*.js', gulp.series(scripts,reload));
    gulp.watch('**/*.php',reload);
    gulp.watch(paths.images.src,gulp.series(images,reload));
     gulp.watch(paths.other.src, gulp.series(copy,reload));
}

export const copy = () =>{
     return gulp.src(paths.other.src)
         .pipe(gulp.dest(paths.other.dest));
}

export const scripts = () => {
    return gulp.src(paths.scripts.src)
        .pipe(named())
        .pipe(webpack({
            module: {
                rules: [ // "rules" replaces "loaders"
                    {
                        test: /\.js$/,
                        exclude: /node_modules/, // Don't waste time transpiling vendor code
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    }
                ]
            },
            mode: PRODUCTION ? 'production' : 'development',
            output: {
                filename: '[name].js',
            },
            externals:{
                jquery:'jQuery' //adding external liberi as dependenci , using script tag not installed using npm
            },
            devtool:!PRODUCTION ? 'inline-source-map' :false
        }))
        .pipe(gulp.dest(paths.scripts.dest));
}

export const compress=()=>{
    return gulp.src(paths.package.src)
        .pipe(replace('_themename', info.name))
        .pipe(zip(`${info.name}.zip`))
        .pipe(gulp.dest(paths.package.dest));
}
export const dev = gulp.series(clean, gulp.parallel(styles,scripts,images,copy),serve,watch);
export const build = gulp.series(clean, gulp.parallel(styles,scripts,images,copy));
export const bundle = gulp.series(build,compress);

export default dev;