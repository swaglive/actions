
FROM docker:stable

RUN apk add curl python2 && \
    curl https://sdk.cloud.google.com | bash -s -- --disable-prompts

ENV PATH $PATH:/root/google-cloud-sdk/bin

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
