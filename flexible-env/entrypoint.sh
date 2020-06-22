#!/bin/zsh
set -e

if [[ "$GITHUB_EVENT_NAME" = "pull_request" ]]; then
    FLEX_GIT_SHA="$INPUT_PULL_SHA"
else
    FLEX_GIT_SHA="$GITHUB_SHA"
fi

if [ $GITHUB_HEAD_REF ]; then
    FLEX_GIT_REF="$GITHUB_HEAD_REF"
else
    FLEX_GIT_REF="$GITHUB_REF"
fi

if echo $GITHUB_REF | grep -q "refs/tags" ; then
    echo "::set-env name=FLEX_GIT_TAG::${GITHUB_REF/refs\/tags\//}"
fi

# Export env
echo "::set-env name=FLEX_GIT_SHA::$FLEX_GIT_SHA"
echo "::set-env name=FLEX_GIT_REF::$FLEX_GIT_REF"

## Shorten
echo "::set-env name=FLEX_GIT_SHA_SHORT::${FLEX_GIT_SHA:0:7}"
echo "::set-env name=FLEX_GIT_REF_SHORT::${FLEX_GIT_REF#refs/(heads|tags)/}"
echo "::set-env name=FLEX_GIT_REF_FORMAT::${FLEX_GIT_REF_SHORT//[^a-z0-9A-Z]/-}"

zsh -c "$*"