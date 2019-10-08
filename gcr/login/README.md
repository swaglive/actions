## Example

preparation: 
1. Download your service account json: `{ "type": "service_account", "project_id": ... }`
2. Encode json: `cat service_account.json | base64`
3. Setting -> Secrets -> Add: 
    - `GCLOUD_AUTH`: Encoded service account json.
    - `GCLOUD_PROJECT_ID`: ex. asia.gcr.io/project_id_from_gcp_console
    
```
name: Image Release

on:
  push:
    paths:
    - 'echo-box/**'
jobs:
  build:
    env: 
      GCLOUD_REGISTRY: ${{ secrets.GCLOUD_PROJECT_ID }}
      IMAGE_NAME: echo-box:${{ matrix.version }}
    runs-on: ubuntu-latest
    strategy:
      matrix:
        version: ['1.0', '2.0']
    steps:
    - uses: actions/checkout@v1
    - name: Build the Docker image
      env: 
        VERSION: ${{ matrix.version }}
      run: docker build echo-box/$VERSION --tag $GCLOUD_REGISTRY/$IMAGE_NAME
    - name: Push to GCR
      uses: swaglive/actions/gcr/login@master
      with:
        args: docker push $GCLOUD_REGISTRY/$IMAGE_NAME
      env:
        GCLOUD_AUTH: ${{ secrets.GCLOUD_AUTH }}
```