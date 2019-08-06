
main.workflow
```
workflow "Pull Request" {
  on = "pull_request"
  resolves = ["release"]
}

action "release" {
  uses = "swaglive/actions/release@master"
  env = {
      GCR_REPO = "https://asia.gcr.io"
      GCR_IMAGE = "PROJECT_ID/IMAGE_NAME"
      GH_IMAGE = "OWNER/REPO_NAME/IMAGE_NAME"
      DOCKERFILE_PATH = "./echo-box"
  }
  secrets = ["GCLOUD_AUTH","DOCKER_USERNAME","DOCKER_PASSWORD"]
}
```

ENV|Note|Default|Example
-|-|-|-
GCR_REPO | Option: `gcr.io`, `us.gcr.io`, `eu.gcr.io`, `asia.gcr.io` | gcr.io | gcr.io
GCR_IMAGE | Need: `GCLOUD_AUTH` | | asia.gcr.io/swag-2c052/action-demo
GITHUB_IMAGE | Need: `DOCKER_USERNAME`,`DOCKER_PASSWORD` | | docker.pkg.github.com/action-kubectl-demo/action-demo
DOCKERFILE_PATH | | . | ./kubectl


## Run Locally
```
export GCLOUD_AUTH=$(base64 your_service_account.json)
act pull_request
```