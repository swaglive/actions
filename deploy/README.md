## Exmaple
```yaml
on:
  push:
  pull_request:
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - run: env
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: ./deploy
      - uses: ./deploy
        with:
          deploy_to: production
          sha_length: 7
```
