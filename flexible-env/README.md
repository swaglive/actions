## Example
```yaml
name: Flexible env

on:
  push:
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - use: swaglive/actions/flexible-env
    - use: echo ${{ env.FLEX_GIT_SHA }}
    - use: echo ${{ env.FLEX_GIT_REF }}
```

## Develop this action
Build
```bash
docker build -t flexible-env .
```

Run
```bash
export GITHUB_EVENT_NAME=
export INPUT_PULL_SHA=
export GITHUB_SHA=
export GITHUB_HEAD_REF=
export GITHUB_REF=

docker run -it --rm  -e GITHUB_EVENT_NAME -e INPUT_PULL_SHA -e GITHUB_SHA -e GITHUB_HEAD_REF -e GITHUB_REF flexible-env
```