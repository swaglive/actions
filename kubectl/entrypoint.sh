#!/bin/sh
set -e

## Variables check
: "${KUBE_CONFIG:?"Need to set env.KUBE_CONFIG"}"
: "${INPUT_CONTEXT:?"Need to set inputs.context"}"
NAMESPACE=${INPUT_NAMESPACE:-default}
WATCH_TIMEOUT=" --timeout ${INPUT_WATCH_TIMEOUT:-60s}"

## Configure
echo "$KUBE_CONFIG" | base64 -d > /tmp/config
export KUBECONFIG=/tmp/config

kubectl config use-context $INPUT_CONTEXT

sh -c "$*"

[[ "$INPUT_WATCH" ]] && kubectl rollout status -n $NAMESPACE $WATCH_TIMEOUT $INPUT_WATCH 
