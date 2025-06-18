pipeline {
    agent {
        docker {
            image 'node:18'
        }
    }

    environment {
        NODE_ENV = "production"
    }

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'Git-jenkins', url: 'git@github.com:AmeerRiyaz/DevOps-Project.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'ls -al'                    // Debug: list files
                sh 'cat package.json'          // Debug: confirm it's there
                sh 'npm install'
            }
        }

        stage('Start App') {
            steps {
                sh 'npm start &'
                echo 'Node app started successfully.'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully'
        }
        failure {
            echo '❌ Pipeline failed. Check logs above.'
        }
    }
}
