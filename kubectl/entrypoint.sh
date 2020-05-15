#!/bin/sh

set -e

echo "$KUBE_CONFIG" | base64 -d > /tmp/config
export KUBECONFIG=/tmp/config

bash -c "$*"
