const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl: 'http://localhost:9000',
    //  serverUrl: 'https://sonar.aspiresoftware.in/',
    token: 'sqp_f2a25632045463f551403be116577935c27a78ee',
    options: {
      'sonar.projectName': 'docutranscribe-user-management',
      'sonar.projectDescription': 'Description for "My App" project...',
      'sonar.projectKey': 'docutranscribe-user-management',
      'sonar.sources': 'src',
    },
  },
  () => process.exit()
);
