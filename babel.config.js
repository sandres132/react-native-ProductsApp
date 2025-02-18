
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  
  plugins: [
    ['module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
      },
    ]


    //elemento-que-usa-Reanimated al final
  ]
};
