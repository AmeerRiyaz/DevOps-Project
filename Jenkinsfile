pipeline {
    agent any  // Change to agent { label 'your-slave-label' } if using a specific agent

    environment {
        NODE_ENV = 'production'
        NODE_VERSION = '16' // Change this to the Node.js version you want to use
        NVM_DIR = "${HOME}/.nvm"
    }

    stages {
        stage('Initialize') {
            steps {
                echo '🚀 Starting the pipeline...'
            }
        }

        stage('Clone Repository') {
            steps {
                git credentialsId: 'Git-jenkins', url: 'git@github.com:AmeerRiyaz/DevOps-Project.git', branch: 'main'
            }
        }

        stage('Show Files') {
            steps {
                sh 'pwd'
                sh 'ls -la'
            }
        }

        stage('Install Node and Dependencies') {
            steps {
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    if [ ! -d "$NVM_DIR" ]; then
                        echo "🔧 Installing NVM..."
                        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
                    fi

                    # Load nvm
                    [ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"

                    echo "📦 Installing Node.js version $NODE_VERSION..."
                    nvm install $NODE_VERSION
                    nvm use $NODE_VERSION

                    echo "📥 Installing npm dependencies..."
                    npm install
                '''
            }
        }

        stage('Run App') {
            steps {
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"
                    nvm use $NODE_VERSION

                    echo "▶️ Running the app..."
                    nohup npm start &
                '''
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
