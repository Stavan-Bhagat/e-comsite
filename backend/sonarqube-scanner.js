const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl: 'http://localhost:9000',
    //  serverUrl: 'https://sonar.aspiresoftware.in/',
    token: 'sqp_ab45cf69136d96ac46bde4c063d38457681f5525',
    options: {
      'sonar.projectName': 'docutranscribe-user-management',
      'sonar.projectDescription': 'Description for "My App" project...',
      'sonar.projectKey': 'docutranscribe-user-management',
      'sonar.sources': 'src'
    }
  },
  () => process.exit()
);
