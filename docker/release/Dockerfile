
FROM docker:stable

LABEL version="1.0.0"

LABEL "version"="1.0.0"
LABEL "maintainer"="Rammus Xu <rammus.xu@swag.live>"
LABEL "com.github.actions.name"="Docker release"
LABEL "com.github.actions.description"="Release to Github, GCR"
LABEL "com.github.actions.icon"="truck"
LABEL "com.github.actions.color"="green"

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]