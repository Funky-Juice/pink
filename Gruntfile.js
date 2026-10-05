"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    less: {
      style: {
        files: {
          "build/css/style.css": "less/style.less"
        }
      }
    },

    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")(),
            require("postcss-sort-media-queries")({
              sort: "mobile-first"
            })
          ]
        },
        src: "build/css/*.css"
      }
    },

    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },

    svgstore: {
      options: {
        svg: {
          style: "display: none"
        }
      },
      symbols: {
        files: {
          "build/img/symbols.svg": ["img/icons/*.svg"]
        }
      }
    },

    svgmin: {
      symbols: {
        files: [{
          expand: true,
          src: ["build/img/icons/*.svg"]
        }]
      }
    },

    clean: {
      build: ["build"]
    },

    copy: {
      build: {
        files: [{
          expand: true,
          src: [
            "fonts/**/*.{woff,woff2}",
            "img/**",
            "js/**",
            "*.html"
          ],
          dest: "build"
        }]
      },
      html: {
        files: [{
          expand: true,
          src: ["*.html"],
          dest: "build"
        }]
      },
      js: {
        files: [{
          expand: true,
          src: ["js/*.js"],
          dest: "build"
        }]
      }
    },

    watch: {
      html: {
        files: ["*.html"],
        tasks: ["copy:html"]
      },
      style: {
        files: ["less/**/*.less"],
        tasks: ["less", "postcss", "csso"],
        options: {
          spawn: false
        }
      },
      js: {
        files: ["js/*.js"],
        tasks: ["copy:js"]
      }
    }
  });

  grunt.registerTask("imagemin", "Optimize raster images", function () {
    const done = this.async();
    const fs = require("fs/promises");
    const path = require("path");
    const sharp = require("sharp");
    const files = grunt.file.expand("build/img/**/*.{png,jpg,jpeg,gif}");

    Promise.all(files.map(async (file) => {
      const ext = path.extname(file).toLowerCase();
      const input = await fs.readFile(file);
      const image = sharp(input);
      const output = ext === ".png"
        ? await image.png({compressionLevel: 9}).toBuffer()
        : ext === ".gif"
          ? await image.gif().toBuffer()
          : await image.jpeg({quality: 80, mozjpeg: true}).toBuffer();

      if (output.length < input.length) {
        await fs.writeFile(file, output);
      }
    })).then(() => done()).catch(done);
  });

  grunt.registerTask("browserSync", "Start the local server", function () {
    const done = this.async();
    const browserSync = require("browser-sync").create();

    browserSync.init({
      server: "build",
      files: [
        "build/*.html",
        "build/css/*.css",
        "build/js/*.js"
      ],
      notify: false,
      open: true,
      cors: true,
      ui: false
    }, (error) => done(error));
  });

  grunt.registerTask("serve", ["browserSync", "watch"]);
  grunt.registerTask("build", [
    "clean",
    "copy",
    "less",
    "postcss",
    "csso",
    "imagemin"
  ]);
};
