exports.config =
  paths:
    public: '../public'
    watched: [
      '../src'
    ]

  files:
    javascripts:
      joinTo: 
        '/js/main.js': [
          '../src/**',
          '../bower_components/angular/angular.js',
          '../bower_components/react/react-with-addons.js',
          '../bower_components/bootstrap/src/*.js'
        ]
    stylesheets:
      joinTo:
        '/css/main.css': [
          '../src/**'
        ]

  modules:
    wrapper: false
    definition: false

  plugins:
    sass:
      allowCache: true