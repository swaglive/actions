## Full Example

`KUBE_CONFIG` must be base64 encoded.

```yaml
name: Kubectl Rollout Restart

on:
  push:
    branches:
    - master

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Kubectl Rollout Restart
      uses: swaglive/actions/kubectl-restart@master
      with:
        kube_config: ${{ secrets.KUBE_CONFIG }}
        context: gke_asia-east1_edge-tw:ops:ops
        namespace: backend
        resource: deployment/api
```
