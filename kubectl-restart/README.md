## Example

`secrets.KUBE_CONFIG` must be base64 encoded.

on push `master`
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
      uses: swaglive/actions/kubectl-restart@v1.0
      with:
        kube_config: ${{ secrets.KUBE_CONFIG }}
        context: gke_asia-east1_edge-tw:ops:ops
        namespace: backend
        resource: deployment/api
```

A manually trigger action
```yaml
name: Kubectl Rollout Restart

on:
  workflow_dispatch:
    inputs:
      namespace:
        description: 'Namespace'
        default: 'default'
        required: false
      resource:
        description: 'Resource'
        required: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Kubectl Rollout Restart
      uses: swaglive/actions/kubectl-restart@v1.0
      with:
        kube_config: ${{ secrets.KUBE_CONFIG }}
        context: gke_asia-east1_edge-tw:ops:ops
        namespace: ${{ github.event.inputs.namespace }}
        resource: ${{ github.event.inputs.resource }}
```
