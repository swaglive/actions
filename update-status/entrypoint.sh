#!/bin/sh

if [[ "$GITHUB_EVENT_NAME" = "pull_request" ]]; then
    COMMIT_SHA=$INPUT_PULL_SHA
else
    COMMIT_SHA=$GITHUB_SHA
fi

if [[ $GITHUB_REF == *"refs/tags"* ]]; then
    TAG=${GITHUB_REF/refs\/tags\//}
else
    TAG=${COMMIT_SHA:0:10}
fi

http POST https://api.github.com/repos/${GITHUB_REPOSITORY}/commits/${COMMIT_SHA}/statuses \
    "Authorization: token ${INPUT_AUTH_TOKEN}" \
    state=${INPUT_STATE:-success} \
    context="update-status deploy:${INPUT_DEPLOY_TO} tag:${TAG}" \
    target_url=https://github.com/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID} \
    --ignore-stdin -v
