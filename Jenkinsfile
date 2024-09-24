pipeline {
    agent any

    stages {
        // Stage 1: Build
        stage('Build') {
            steps {
                echo "Building the application..."
                // Add actual build steps if needed (e.g., npm install, mvn clean package, etc.)
            }   
        }

        // Stage 2: Tests
        stage('Tests') {
            steps {
                echo "Running tests..."
                //sh 'mvn test' // Correct usage of the 'sh' command for running tests
            }
        }

        // Stage 3: Deploy
        stage('Deploy') {
            steps {
                echo "Deploying..."
                // Add deployment steps here (e.g., AWS CLI commands for deployment)
            }
        }

        // Stage 4: Deploy to Production
        stage('Deploy to Production') {
            steps {
                echo "Deploying to production..."
                //sh 'aws ec2 run-instances ...' // Correct usage of the 'sh' command for deployment
            }
        }
    }
}
