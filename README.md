# spa-check-for-update

Adds the ability to check for updates on Single Page Apps!

## Install

```
$ npm install spa-check-for-update
```

## Usage

```js
const checkForUpdate = require("spa-check-for-update");
```

I like to attach the function to my `fetch` requests instead of constantly polling.

```js
const originalFetch = window.fetch;
window.fetch = function (url) {
    if (!url.includes("/index.html")) {
        checkForUpdate(
            () => {
                console.log("out of date!")
            },
            () => {
                console.error("Check for Update Error")
            }
        );
    }
    return originalFetch.apply(window, arguments);
};
```
