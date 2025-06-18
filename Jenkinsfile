pipeline {
     agent {
        label "Slave"
    }
    // This pipeline is designed to clone a Git repository, install dependencies, and run a Node.js application.

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Initialize') {
            steps {
                echo 'Starting the pipeline...'
            }
        }
        stage('Clone Repository') {
            steps {
                git credentialsId: 'jenkins', url: 'git@github.com:AmeerRiyaz/DevOps-Project.git', branch: 'main'
            }
        }

        stage('Verify Checkout') {
            steps {
                sh 'pwd'
                sh 'ls -la'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run App') {
            steps {
                sh 'npm start &'
                echo 'App started.'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully'
        }
        failure {
            echo '❌ Pipeline failed.'
        }
    }
}
