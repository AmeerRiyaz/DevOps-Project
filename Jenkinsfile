pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        NODE_VERSION = '16'
        NVM_DIR = "${HOME}/.nvm"
    }

    stages {
        stage('Initialize') {
            steps {
                echo ' Starting the pipeline...'
            }
        }

        stage('Clone Repository') {
            steps {
                git credentialsId: 'Git-jenkins', url: 'git@github.com:AmeerRiyaz/DevOps-Project.git', branch: 'main'
            }
        }

        stage('Install Node and Dependencies') {
            steps {
                sh '''
                    #!/bin/bash
                    export NVM_DIR="$HOME/.nvm"

                    if [ ! -d "$NVM_DIR" ]; then
                        echo " Installing NVM..."
                        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
                    fi

                    # Load NVM
                    [ -s "$NVM_DIR/nvm.sh" ] && bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use $NODE_VERSION && npm install"
                '''
            }
        }

        stage('Run App') {
            steps {
                sh '''
                    #!/bin/bash
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && bash -c "source $NVM_DIR/nvm.sh && nvm use $NODE_VERSION && nohup npm start &"
                '''
            }
        }
    }

    post {
        success {
            echo ' CI/CD pipeline completed successfully'
        }
        failure {
            echo ' Pipeline failed'
        }
    }
}
