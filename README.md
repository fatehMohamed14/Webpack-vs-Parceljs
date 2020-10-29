# Webpack vs Parcel

The goal of this comparison is not to say that one of them is the best
but which one can fit needs of a small application and the time you have
to do it. I've create a small typescript web application (fetch
countries and search countries by a given spoken language) using Webpack
and the same one using Parcel bundler in order to make a comparaison of
both tools in term of time spent on configuration, build speed, caching,
code splitting...

\
 The apps are separated in 2 sub-directories where you can build each
one and see the result your self, you can add more feature to the
application to see the results for a medium or even a big size
application

## comparaison

-

Webpack

Parcel

Configuration

35 Lines of configuration (webpack.config.js)

0 Configuration

Loaders and plugins

3 Dependencies \
 (**html-webpack-plugin**, **clean-webpack-plugin** , **ts-loader** ,
**webpack-dev-server** )

no dependencies needed for the app, Parcel can transform many assets
types like Typescript in my case, no need to install a ts loader

First Build

2771 ms

6026 ms

Second Build

2729ms

550ms (Better caching, second build is very improved)

Bundle Size

683kb

256kb \
 **Build size is only 96 kb when using --experimental-scope-hoisting (an
experimental Parcel feature to optimize bundle size)**

Dev Server

Need Config and installation of webpack dev server \
 `"dev": "webpack serve"`

Parcel support it out of the box\
 `"dev": "parcel ./src/index.html"`
