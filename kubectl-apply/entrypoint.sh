#!/bin/sh
set -e

## Variables check
: "${KUBE_CONFIG:?"Need to set env.KUBE_CONFIG"}"
: "${INPUT_CONTEXT:?"Need to set inputs.context"}"
[[ "$INPUT_KUSTOMIZE" ]] && APPLY_METHOD=-k || APPLY_METHOD=-f
NAMESPACE=${INPUT_NAMESPACE:-default}
WATCH_TIMEOUT=" --timeout ${INPUT_WATCH_TIMEOUT:-60s}"

## Configure
echo "$KUBE_CONFIG" | base64 -d > /tmp/kube_config
export KUBECONFIG=/tmp/kube_config

## Apply
kubectl apply $APPLY_METHOD $INPUT_PATH --context $INPUT_CONTEXT

## Watch
[[ "$INPUT_WATCH" ]] && kubectl rollout status -n $NAMESPACE $WATCH_TIMEOUT $INPUT_WATCH
