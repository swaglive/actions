#!/bin/sh
set -e

echo "$KUBE_CONFIG" | base64 -d > /tmp/config
export KUBECONFIG=/tmp/config

if [[ "$CONTEXT" ]]; then
    kubectl config use-context $CONTEXT
fi

sh -c "$*"