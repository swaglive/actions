#!/bin/sh
set -e

echo "$KUBE_CONFIG" | base64 -d > /tmp/config
export KUBECONFIG=/tmp/config

if [[ "$INPUT_CONTEXT" ]]; then
    kubectl config use-context $INPUT_CONTEXT
fi

sh -c "$*"