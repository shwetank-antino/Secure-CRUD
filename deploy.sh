#!/bin/bash
set -e

echo "[INFO] Checking prerequisites..."

if ! command -v docker &> /dev/null; then
  echo "[ERROR] Docker is not installed"
  exit 1
fi

if ! command -v docker-compose &> /dev/null; then
  echo "[ERROR] Docker Compose is not installed"
  exit 1
fi

echo "[INFO] Cleaning previous state..."
docker-compose down -v

echo "[INFO] Building and starting containers..."
docker-compose up --build -d

echo "[INFO] Waiting for services to become healthy..."
sleep 10

echo "[SUCCESS] Application is live at http://localhost"
