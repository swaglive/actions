
FROM docker:stable

LABEL version="1.0.0"

LABEL "version"="1.0.0"
LABEL "maintainer"="Rammus Xu <rammus.xu@swag.live>"
LABEL "com.github.actions.name"="GCR Login"
LABEL "com.github.actions.description"="use GCLOUD_AUTH"
LABEL "com.github.actions.icon"="terminal"
LABEL "com.github.actions.color"="green"


RUN apk add curl python2 && \
    curl https://sdk.cloud.google.com | bash -s -- --disable-prompts

ENV PATH $PATH:/root/google-cloud-sdk/bin

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
