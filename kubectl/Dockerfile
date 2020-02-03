# 2019-10-24
# GitVersion:"v1.13.11-dispatcher", GitCommit:"2e298c7e992f83f47af60cf4830b11c7370f6668"
FROM gcr.io/cloud-builders/kubectl@sha256:1023dbcb23ff0776891bd9ed3e3d1e83d35f4c274d8dc2f2017490bfcba38da3

# https://github.com/kubernetes-sigs/kustomize/tree/v2.0.3
ENV KUSTOMIZE_VER 2.0.3

RUN curl -L https://github.com/kubernetes-sigs/kustomize/releases/download/v${KUSTOMIZE_VER}/kustomize_${KUSTOMIZE_VER}_linux_amd64  -o /usr/bin/kustomize \
    && chmod +x /usr/bin/kustomize

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]