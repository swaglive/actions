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
      - uses: ./update-status
      - uses: ./update-status
        with:
          state: failure
          context: Update by rammus
```
