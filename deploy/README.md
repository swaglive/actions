## Exmaple
```yaml
on:
  push:
  pull_request:
jobs:
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: swaglive/actions/deploy@v1.0
      - uses: swaglive/actions/deploy@v1.0
        with:
          deploy_to: production
          sha_length: 
```
