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
                            script {
                // Hentikan container lama jika ada
                bat 'docker rm -f react-snake-test || echo "No previous container"'

                // Jalankan container baru
                bat 'docker run -d --name react-snake-test -p 8090:8081 ridhoaja/react-snake:latest'

                // Tunggu container siap (gunakan ping cross-platform)
                echo "Waiting for container to start..."
                bat 'powershell -Command "Start-Sleep -Seconds 10"'

                // Cek apakah container jalan
                bat 'docker ps -a'
                }
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
