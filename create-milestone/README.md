Example:

.github/workflows/cron-milestone.yaml
```
name: cron-milestone
on:
  schedule:
    - cron:  '0 */12 * * *'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: swaglive/actions/create-milestone@master
        with:
          start-date: '2019-01-02'
          period-day: 14
          format: '[M]YYYY-[W]WW'
          description: 'cron-milestone create'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```