#!/bin/sh
set -e

## Variables check
: "${INPUT_KUBE_CONFIG:?"Need to set intputs.KUBE_CONFIG"}"
: "${INPUT_CONTEXT:?"Need to set inputs.context"}"
[[ "$INPUT_KUSTOMIZE" ]] && APPLY_METHOD=-k || APPLY_METHOD=-f
INPUT_WATCH_NAMESPACE=${INPUT_WATCH_NAMESPACE:-default}
INPUT_WATCH_TIMEOUT=" --timeout ${INPUT_WATCH_TIMEOUT:-60s}"

## Configure
echo "$INPUT_KUBE_CONFIG" | base64 -d > $GITHUB_WORKSPACE/kube_config
export KUBECONFIG=$GITHUB_WORKSPACE/kube_config

## Apply
kubectl apply $APPLY_METHOD $INPUT_PATH --context $INPUT_CONTEXT
[[ "$INPUT_RESTART" ]] && kubectl rollout restart $INPUT_RESTART -n $INPUT_WATCH_NAMESPACE --context $INPUT_CONTEXT

## Watch
[[ "$INPUT_WATCH" ]] && kubectl rollout status $INPUT_WATCH_TIMEOUT $INPUT_WATCH -n $INPUT_WATCH_NAMESPACE --context $INPUT_CONTEXT
