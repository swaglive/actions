#!/bin/sh
set -e

if [[ "$GITHUB_EVENT_NAME" = "pull_request" ]]; then
    echo "::set-env name=FLEX_GIT_SHA::$INPUT_PULL_SHA"
else
    echo "::set-env name=FLEX_GIT_SHA::$GITHUB_SHA"
fi

if [ $GITHUB_HEAD_REF ]; then
    echo "::set-env name=FLEX_GIT_REF::$GITHUB_HEAD_REF"
else
    echo "::set-env name=FLEX_GIT_REF::$GITHUB_REF"
fi

if echo $GITHUB_REF | grep -q "refs/tags" ; then
    echo "::set-env name=FLEX_GIT_TAG::${GITHUB_REF/refs\/tags\//}"
fi

sh -c "$*"