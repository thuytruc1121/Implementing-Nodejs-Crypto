pipeline {
    agent any

    stages {
        stage('Checkout GitHub repo') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/thuytruc1121/Implementing-Nodejs-Crypto.git']])
            }
        }
        
        stage('Build and Tag Docker Image') {
            steps {
                script {
                    sh 'docker build . -t hellodocker'
                    sh 'docker tag hellodocker jamesndubuisi/hellodocker'
                }
            }
        }
        
        stage('Push the Docker Image to DockerHUb') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'docker_hub', variable: 'docker_hub')]) {
                    sh 'docker login -u miapham98 -p ${docker_hub}'
}
                    sh 'docker push miapham98/hellodocker'
                }
            }
        }
        // Stage 2:Tests
        stage('Tests') {
            steps {
                echo "Running tests: sh 'mvn test'"
            }
        }
        // Stage 3: Deploy and Release
        stage('Deploy deployment and service file') {
            steps {
                script {
                    kubernetesDeploy configs: 'deploymentsvc.yaml', kubeconfigId: 'kubernetes_config'
                }
            }
        }
    }
}
