#!/usr/bin/env bash

set -euo pipefail

echo "=== Azure CLI Installer ==="

# Detect OS
if [ -f /etc/os-release ]; then
    . /etc/os-release
else
    echo "Impossibile rilevare il sistema operativo."
    exit 1
fi

install_ubuntu() {
    echo "Sistema Ubuntu/Debian rilevato"

    sudo apt-get update

    sudo apt-get install -y \
        ca-certificates \
        curl \
        apt-transport-https \
        lsb-release \
        gnupg

    curl -sL https://packages.microsoft.com/keys/microsoft.asc | \
        gpg --dearmor | \
        sudo tee /etc/apt/trusted.gpg.d/microsoft.gpg > /dev/null

    AZ_REPO=$(lsb_release -cs)

    echo "deb [arch=amd64] https://packages.microsoft.com/repos/azure-cli/ ${AZ_REPO} main" | \
        sudo tee /etc/apt/sources.list.d/azure-cli.list

    sudo apt-get update
    sudo apt-get install -y azure-cli
}

install_rhel() {
    echo "Sistema RHEL/CentOS/Rocky/AlmaLinux rilevato"

    sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc

    cat <<EOF | sudo tee /etc/yum.repos.d/azure-cli.repo
[azure-cli]
name=Azure CLI
baseurl=https://packages.microsoft.com/yumrepos/azure-cli
enabled=1
gpgcheck=1
gpgkey=https://packages.microsoft.com/keys/microsoft.asc
EOF

    if command -v dnf >/dev/null 2>&1; then
        sudo dnf install -y azure-cli
    else
        sudo yum install -y azure-cli
    fi
}

case "$ID" in
    ubuntu|debian)
        install_ubuntu
        ;;
    rhel|centos|rocky|almalinux)
        install_rhel
        ;;
    *)
        echo "Distribuzione non supportata: $ID"
        exit 1
        ;;
esac

echo
echo "=== Verifica installazione ==="
az version