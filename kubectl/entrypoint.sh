#!/bin/bash

set -e

echo "$KUBE_CONFIG" | base64 --decode > /tmp/config
export KUBECONFIG=/tmp/config

bash -c "$*"