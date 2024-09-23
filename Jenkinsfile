pipeline {
    agent any
    
    stages {
        // Stage 1: Checkout
        stage('Checkout') {
            steps {
                // Pulls code from GitHub
                git branch: 'main', url: 'https://github.com/thuytruc1121/Implementing-Nodejs-Crypto.git'
            }
        }

        // Stage 2: Install dependencies
        stage('Install Dependencies') {
            steps {
                echo "Installing dependencies..."
                sh 'npm install'
            }
        }

        // Stage 3: Build
        stage('Build') {
            steps {
                echo "Building the application..."
                sh 'npm run build'
                // Archive the build artifact (for example: dist folder)
            }
        }

        // Stage 4: Tests
        stage('Tests') {
            steps {
                echo "Running tests"
                sh 'npm test'
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
