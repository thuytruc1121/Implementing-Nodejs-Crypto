pipeline {
    agent any
    stages {
        // Stage 1: Build
        stage('Build') {
            steps {
                echo "Building ..."
            }
        }
        // Stage 2:Tests
        stage('Tests') {
            steps {
                echo "Running tests: sh 'mvn test'"
            }
        }
        // Stage 3: Deploy
        stage('Deploy ') {
            steps {
                echo "Deploying...'"
                // Use AWS CLI for deployment
            }
        }
        // Stage 4: Release
        stage('Deploy to Production') {
            steps {
                echo "Deploying to production: sh 'aws ec2 run-instances ...'"
            }
        }
    }
}