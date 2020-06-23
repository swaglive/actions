FROM swaglive/kubectl:1.17

# https://github.com/kubernetes-sigs/kustomize/tree/v2.0.3
ENV KUSTOMIZE_VER 2.0.3

RUN apk add --no-cache curl && \
    curl -L https://github.com/kubernetes-sigs/kustomize/releases/download/v${KUSTOMIZE_VER}/kustomize_${KUSTOMIZE_VER}_linux_amd64  -o /usr/bin/kustomize && \
    chmod +x /usr/bin/kustomize

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]