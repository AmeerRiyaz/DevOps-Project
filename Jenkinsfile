pipeline {
    agent any
    // This pipeline is designed to clone a Git repository, install dependencies, and run a Node.js application.

    environment {
        NODE_ENV = 'production'
        NODE_VERSION = '18.20.2'  // Set your desired Node.js version
    }

    stages {
        stage('Initialize') {
            steps {
                echo '🚀 Starting the pipeline...'
            }
        }

        stage('Clone Repository') {
            steps {
                git credentialsId: 'jenkins', url: 'git@github.com:AmeerRiyaz/DevOps-Project.git', branch: 'main'
            }
        }

        stage('Install Node.js') {
            steps {
                sh '''
                    # Install nvm if not already present
                    export NVM_DIR="$HOME/.nvm"
                    if [ ! -d "$NVM_DIR" ]; then
                        echo "Installing NVM..."
                        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
                    fi

                    # Load NVM
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

                    # Install Node.js and set default
                    nvm install $NODE_VERSION
                    nvm use $NODE_VERSION
                    nvm alias default $NODE_VERSION

                    # Add node and npm to PATH for future steps
                    echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.bashrc
                    echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.bashrc
                '''
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
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                    nvm use $NODE_VERSION
                    npm install
                '''
            }
        }

        stage('Run App') {
            steps {
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                    nvm use $NODE_VERSION
                    npm start &
                '''
                echo '🎯 App started.'
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
