pipeline {
    agent any

tools {
    jdk 'java25'
    maven 'maven'
    nodejs 'NodeJs'
}

    stages {

        // ----------- CLONE -----------
        stage('Clone Repository') {
            steps {
                git 'https://github.com/<your-username>/<your-repo>.git'
            }
        }

        // ----------- BUILD BACKEND -----------
        stage('Build Backend Services') {
            steps {
                script {
                    def services = [
                        "service-registry",
                        "api-gateway",
                        "booking-service",
                        "payment-service",
                        "tour-service",
                        "user-service"
                    ]

                    for (svc in services) {
                        dir("Tour Booking Backend/${svc}") {
                            bat 'mvn clean install -DskipTests'
                        }
                    }
                }
            }
        }

        // ----------- BUILD FRONTEND -----------
        stage('Build Frontend') {
            steps {
                dir('Tour-UI/tourUI') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // ----------- START SERVICES -----------
        stage('Start Backend Services') {
            steps {
                script {

                    // Start Eureka first
                    dir("Tour Booking Backend/service-registry") {
                        bat 'start cmd /c "java -jar target\\*.jar"'
                    }

                    // Wait for Eureka to start
                    bat 'timeout /t 20'

                    // Start other services
                    def services = [
                        "api-gateway",
                        "booking-service",
                        "payment-service",
                        "tour-service",
                        "user-service"
                    ]

                    for (svc in services) {
                        dir("Tour Booking Backend/${svc}") {
                            bat 'start cmd /c "java -jar target\\*.jar"'
                        }
                    }
                }
            }
        }

        // ----------- START FRONTEND -----------
        stage('Start Frontend') {
            steps {
                dir('Tour-UI/tourUI') {
                    bat 'start cmd /c "npm run dev"'
                }
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Application Built & Started!'
        }
        failure {
            echo 'FAILURE: Build Failed!'
        }
    }
}
