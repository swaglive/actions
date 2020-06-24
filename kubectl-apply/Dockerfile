# Have cache: https://github.com/actions/virtual-environments/blob/master/images/linux/Ubuntu1804-README.md
FROM alpine:3.10

ARG VERSION=1.18.0

RUN wget -q https://storage.googleapis.com/kubernetes-release/release/v$VERSION/bin/linux/amd64/kubectl -O /usr/local/bin/kubectl && \
    chmod +x /usr/local/bin/kubectl

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
