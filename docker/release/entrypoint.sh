#!/bin/sh
set -e

# Environments
test $DOCKERFILE_PATH || DOCKERFILE_PATH="."
test $GCR_REPO || GCR_REPO=https://asia.gcr.io
test $GH_REPO || GH_REPO=docker.pkg.github.com
IMAGE_SHA=$(echo $GITHUB_SHA | cut -c1-8)

# Login
if [ "$GCLOUD_AUTH" ]; then
    echo "$GCLOUD_AUTH" | base64 -d > gcloud.json
    # https://cloud.google.com/container-registry/docs/advanced-authentication
    cat gcloud.json | docker login -u _json_key --password-stdin $GCR_REPO
fi

if [ "$DOCKER_USERNAME" ] && [ "$DOCKER_PASSWORD" ]; then
    echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin docker.pkg.github.com
fi

# Docker Build
if [ "$GCR_IMAGE" ]; then
    GCR_IMAGE=$GCR_REPO/$GCR_IMAGE:$IMAGE_SHA
    DOCKER_OPTIONS="-t $GCR_IMAGE"
fi
if [ "$GH_IMAGE" ]; then
    GH_IMAGE=$GH_REPO/$GH_IMAGE:$IMAGE_SHA
    DOCKER_OPTIONS="$DOCKER_OPTIONS -t $GH_IMAGE"
fi

docker build $DOCKER_OPTIONS $DOCKERFILE_PATH


# Docker Push
echo "$GCR_IMAGE" "$GH_IMAGE" | xargs -n1 -P2 docker push
