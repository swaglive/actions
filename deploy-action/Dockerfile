# Use github runner cached image
# https://github.com/actions/virtual-environments/blob/main/images/linux/Ubuntu2004-README.md
FROM alpine:3.10

RUN apk add httpie

COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
