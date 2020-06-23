## Example

`KUBE_CONFIG` must be base64 encoded.

```
  deploy:
    runs-on: ubuntu-latest
    env:
      KUBE_CONFIG: ${{ secrets.KUBE_CONFIG }}
    steps:
    - uses: actions/checkout@v1
    - name: Kustomize build
      uses: swaglive/actions/kubectl@master
      with: 
        args: kustomize build .
    - name: Kubectl apply
      uses: swaglive/actions/kubectl@master
      with: 
        context: gke_asia-east1_edge-tw:ops:ops
        args: kubectl apply -k .
        watch: deployment/bot     # optional
        namespace: ops            # default: default
        watch_timeout: 100s       # default: 60s
```

## Develop
```bash
docker build -t kubectl .
```

```bash
export KUBE_CONFIG=
export INPUT_CONTEXT=
export INPUT_NAMESPACE=
export INPUT_WATCH=
export INPUT_WATCH_TIMEOUT=

docker run -it --rm -e KUBE_CONFIG -e INPUT_CONTEXT -e INPUT_NAMESPACE -e INTPUT_WATCH -e INPUT_WATCH kubectl kubectl get deploy
```

