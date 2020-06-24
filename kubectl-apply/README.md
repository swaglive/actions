## Full Example

`KUBE_CONFIG` must be base64 encoded.

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Kubectl apply
      uses: swaglive/actions/kubectl-apply@master
      with:
        kube_config: ${{ secrets.KUBE_CONFIG }}
        context: gke_asia-east1_edge-tw:ops:ops
        path: templates/bot       # default: .
        kustomize: true           # default: false
        watch: deployment/bot     # optional
        watch_namespace: ops      # default: default
        watch_timeout: 100s       # default: 60s
```

## Example
```yaml
uses: swaglive/actions/kubectl-apply@master
env:
  KUBE_CONFIG: ${{ secrets.KUBE_CONFIG }}
with:
  path: templates/bot
  context: gke_asia-east1_edge-tw:ops:ops
```


### Deploy and watch resource
```yaml
uses: swaglive/actions/kubectl-apply@master
env:
  KUBE_CONFIG: ${{ secrets.KUBE_CONFIG }}
with:
  context: gke_asia-east1_edge-tw:ops:ops
  watch: deployment/bot     # optional
```

## Develop
```bash
docker build -t kubectl .
```

```bash
export KUBE_CONFIG=
export INPUT_CONTEXT=
export INPUT_PATH=
export INPUT_WATCH_NAMESPACE=
export INPUT_WATCH=
export INPUT_WATCH_TIMEOUT=
export INPUT_KUSTOMIZE=

docker run -it --rm -e KUBE_CONFIG -e INPUT_CONTEXT -e INPUT_NAMESPACE -e INTPUT_WATCH -e INPUT_WATCH -e INPUT_KUSTOMIZE kubectl
```
