## Example

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
        args: kubectl apply -k .
```