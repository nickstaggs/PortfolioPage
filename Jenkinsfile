pipeline {
  agent any

  stages {

    stage('checkout') {
      steps {
        sh 'cd ~'
        checkout scm
      }
    }

    stage('build') {
      steps {
        sh 'cd ~'

        sh 'npm install'
        sh 'scp -i ~/keys/aws.pem ubuntu@ec2-34-198-171-193.compute-1.amazonaws.com:~/PortfolioPage/.env ~/PortfolioPage/'
        sh 'scp -i ~/keys/aws.pem ubuntu@ec2-34-198-171-193.compute-1.amazonaws.com:~/data/db ~/data'
        sh 'scp -i ~/keys/aws.pem ubuntu@ec2-34-198-171-193.compute-1.amazonaws.com:~/PortfolioPage/www.nickstaggs ~/PortfolioPage/'

        configFileProvider([configFile(fileId: 'aa569752-3752-44e7-b5c5-0cc5fd3721db', variable: 'DOTENV')]) {
            sh 'echo $DOTENV > .env'
        }
      }
    }

    stage('test') {
      steps {
        sh 'echo This is where testing would be'
      }
    }

    stage('deploy') {
      steps {
        sh 'npm start'
      }
    }
  }
}
