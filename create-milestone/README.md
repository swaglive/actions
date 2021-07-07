## Example

.github/workflows/cron-milestone.yaml

```yaml
name: test-create-milestone

on:
  schedule:
    - cron:  '0 */12 * * *'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: swaglive/actions/create-milestone@eb0e678
        with:
          duration: 2W                       
          description: 'action create'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```