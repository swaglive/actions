FROM alpine:3.11

RUN apk add httpie

COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
