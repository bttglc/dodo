#!/bin/bash

# Function to check if a command is available
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo "$1 not found. Installing..."
        $2
    else
        echo "$1 is already installed."
    fi
}

# Step 1: Check and install Docker
check_command docker "
curl -fsSL https://get.docker.com -o get-docker.sh &&
sh get-docker.sh &&
rm get-docker.sh &&
sudo usermod -aG docker \$USER &&
echo 'Docker installed. Please log out and log back in for changes to take effect.' &&
exit 0
"

# Step 2: Check and install Minikube
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    MINIKUBE_URL="https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-amd64"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    MINIKUBE_URL="https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64"
else
    echo "Unsupported OS: $OSTYPE"
    exit 1
fi

check_command minikube "
curl -LO $MINIKUBE_URL &&
sudo install ./minikube* /usr/local/bin/minikube &&
rm ./minikube* &&
echo 'Minikube installed.'
"

# Step 3: Start Minikube with Docker driver
echo "Starting Minikube with Docker driver..."
minikube start --driver=docker

# Step 4: Apply all YAML files in dodo-k8s subdirectory
if [ -d "dodo-k8s" ]; then
    echo "Applying all YAML files in dodo-k8s..."
    kubectl apply -f dodo-k8s/
else
    echo "Directory dodo-k8s not found. Exiting."
    exit 1
fi

# Step 5: Wait for frontend and backend deployments to be running
echo "Waiting for frontend and backend deployments to be ready..."
while true; do
    frontend_status=$(kubectl get pods -l app=dodo-frontend -o jsonpath="{.items[0].status.phase}" 2>/dev/null)
    backend_status=$(kubectl get pods -l app=dodo-backend -o jsonpath="{.items[0].status.phase}" 2>/dev/null)
    if [ "$frontend_status" == "Running" ] && [ "$backend_status" == "Running" ]; then
        echo "Frontend and backend pods are running."
        break
    else
        echo "Waiting for pods to be in 'Running' state..."
        sleep 5
    fi
done

# Step 6: Get pod names for port-forwarding
frontend_pod=$(kubectl get pods -l app=dodo-frontend -o jsonpath="{.items[0].metadata.name}")
backend_pod=$(kubectl get pods -l app=dodo-backend -o jsonpath="{.items[0].metadata.name}")

# Step 7: Port forward in two new terminals
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS: Use `open` with AppleScript to launch new terminal windows
    echo "Setting up port forwarding on macOS..."
    osascript -e "tell application \"Terminal\" to do script \"kubectl port-forward $frontend_pod 3000:3000\""
    osascript -e "tell application \"Terminal\" to do script \"kubectl port-forward $backend_pod 8080:8080\""
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux: Use gnome-terminal or similar
    echo "Setting up port forwarding on Linux..."
    gnome-terminal -- bash -c "kubectl port-forward $frontend_pod 3000:3000; exec bash" &
    gnome-terminal -- bash -c "kubectl port-forward $backend_pod 8080:8080; exec bash" &
else
    echo "Unsupported OS: $OSTYPE"
    exit 1
fi

sleep 3

# Step 8: Open the default browser at localhost:3000
echo "Opening the default browser at http://localhost:3000..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    open http://localhost:3000
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open http://localhost:3000
else
    echo "Unsupported OS: $OSTYPE"
fi

# Script complete
echo "Setup complete!"