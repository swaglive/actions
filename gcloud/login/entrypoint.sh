#!/bin/sh
set -e

echo "$GCLOUD_AUTH" | base64 -d > gcloud.json

gcloud auth activate-service-account --key-file=gcloud.json

# https://cloud.google.com/container-registry/docs/advanced-authentication
cat gcloud.json | docker login -u _json_key --password-stdin https://asia.gcr.io

bash -c "$*"