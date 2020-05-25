#!/bin/sh

if [[ "$GITHUB_EVENT_NAME" = "pull_request" ]]; then
    COMMIT_SHA=$INPUT_PULL_SHA
else
    COMMIT_SHA=$INPUT_PUSH_SHA
fi

http POST https://api.github.com/repos/${GITHUB_REPOSITORY}/commits/${COMMIT_SHA}/statuses \
    "Authorization: token ${INPUT_AUTH_TOKEN}" \
    state=${INPUT_STATE:-success} \
    context="update-status deploy:${INPUT_DEPLOY_TO}" \
    target_url=https://github.com/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID} \
    --ignore-stdin -v
