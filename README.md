# dialect-chrome-extension
A simple chrome extension to make it easier to launch dialect tests

![Build](https://github.com/fzakaria/dialect-chrome-extension/workflows/Build/badge.svg?branch=master)

## Adding Development Extension to Chrome

1. Navigate to `chrome://extensions`
2. Click to enable `Developer Mode`
3. Click `Load Unpacked`

Be sure existing development or production extension is not active. You can reload your changes by clicking the reload button on the `chrome://extensions` page. 

## Development

```bash
make all
```

## Linting

```bash
eslint content.js --fix
```
