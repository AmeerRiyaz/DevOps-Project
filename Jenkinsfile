pipeline {
    agent any

    environment {
        DOCKER_USERNAME = credentials('docker-username')
        DOCKER_PASSWORD = credentials('docker-password')
    }

    stages {

        stage('Pre Clean') {
            steps {
                echo '🧹 Cleaning up Docker containers, images, and Node.js...'
                sh '''
                    pkill node || true
                    docker ps -q | xargs -r docker stop || true
                    docker ps -aq | xargs -r docker rm || true
                    docker images -q myapp:latest | xargs -r docker rmi -f || true
                '''
                echo '✅ Pre-clean completed.'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh '''
                    mkdir -p test-results
                    echo "Sample Test Result" > test-results/result.txt
                '''
                echo '✅ Tests completed.'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'
                sh 'ls test-results/'
                echo '✅ Build completed.'
            }
        }

        stage('Build with Node.js') {
            steps {
                echo 'Setting up environment...'
                sh '''
                    if ! command -v node > /dev/null; then
                      curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
                      apt-get install -y nodejs
                    fi
                    pkill node || true
                    node -v
                    npm -v
                    cd app && npm install
                '''
                sh '''
                    echo "Running app temporarily..."
                    node app.js & PID=$!; sleep 10; kill $PID
                '''
                echo '✅ Node.js Build completed.'
            }
        }

        stage('Docker Build & Run') {
            steps {
                echo 'Deploying via Docker...'
                sh '''
                    cd app
                    docker build -t myapp:latest .
                    docker run -it -d -p 80:80 myapp:latest
                '''
                echo '✅ Docker deployment completed.'
            }
            post {
                always {
                    echo 'Cleaning up Docker...'
                    sh '''
                        docker ps -q | xargs -r docker stop || true
                        docker ps -aq | xargs -r docker rm || true
                        docker rmi -f myapp:latest || true
                    '''
                }
            }
        }

        stage('Docker Compose Deploy') {
            steps {
                echo 'Deploying using Docker Compose...'
                sh '''
                    docker-compose -f docker-compose.yml down || true
                    docker-compose -f docker-compose.yml up -d
                    sleep 10
                    docker ps -a
                '''
            }
            post {
                always {
                    sh 'docker-compose -f docker-compose.yml down || true'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing to Docker Hub...'
                sh '''
                    echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                    cd app
                    docker build -t myapp:latest .
                    docker tag myapp:latest docker.io/$DOCKER_USERNAME/myapp:latest
                    docker push docker.io/$DOCKER_USERNAME/myapp:latest
                '''
            }
        }

        stage('Pull & Run from Docker Hub') {
            steps {
                echo 'Running from Docker Hub...'
                sh '''
                    echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                    docker pull docker.io/$DOCKER_USERNAME/myapp:latest
                    docker run -it -d -p 80:80 docker.io/$DOCKER_USERNAME/myapp:latest
                '''
            }
        }
    }
}
