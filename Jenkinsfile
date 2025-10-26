pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "ridhoaja/react-snake:latest"
        DOCKER_CREDENTIALS = "dockerhub-credentials"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Test') {
            steps {
                echo "No unit tests configured"
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    bat "docker build -t %DOCKER_IMAGE% ."
                }
            }
        }

        stage('Docker Login & Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: env.DOCKER_CREDENTIALS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
                    bat "docker push %DOCKER_IMAGE%"
                }
            }
        }

        stage('Test Container') {
            steps {
                bat 'docker run -d --name react-snake-test -p 8082:8081 %DOCKER_IMAGE%'
                bat 'timeout /t 10'
                bat 'docker ps'
                bat 'docker stop react-snake-test'
                bat 'docker rm react-snake-test'
            }
        }
    }

    post {
        always {
            echo "Pipeline finished"
        }
        success {
            echo "✅ Successfully built, tested, and pushed %DOCKER_IMAGE%"
        }
        failure {
            echo "❌ Pipeline failed"
        }
    }
}
