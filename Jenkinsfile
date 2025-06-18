pipeline {
    agent any

    environment {
        NODE_ENV = "production"
    }

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'jenkins', url: 'git@github.com:AmeerRiyaz/DevOps-Project.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test' // or skip if no tests
            }
        }

        stage('Build') {
            steps {
                echo 'Build step - e.g. compiling, bundling, etc.'
                // sh 'npm run build' if you have build scripts
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying to server...'
                // Example: sh 'scp -i key.pem dist/* user@server:/var/www/app/'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully ✅'
        }
        failure {
            echo 'Pipeline failed ❌'
        }
    }
}
