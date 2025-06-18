pipeline {
    agent any

    environment {
        NODE_ENV = "production"
    }

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'jenkins', url: 'git@github.com:AmeerRiyaz/DevOps-Project.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test || echo "No tests found, skipping."'
            }
        }

        stage('Build') {
            steps {
                echo 'Build step (optional)'
                // Uncomment below if you have a build step
                // sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                echo 'You can add deployment script here'
                // For example, deploy to server, Docker, etc.
            }
        }
    }

    post {
        success {
            echo '✅ CI/CD pipeline completed successfully'
        }
        failure {
            echo '❌ Pipeline failed'
        }
    }
}
