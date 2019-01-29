# console test runner

## Install

Install Node.js and NPM. `brew install node`.

Install the project dependencies. `npm install`.

## Running Tests

To run the tests with a default browser use `npm run all`. By default, it runs all tests.

### Specifying URL
We've implemented support for environment variables in automation and a `.env` file for local environments. To specify your variables, please use `URL = 'http://www.example.com/'` in your `.env`

### Specifying Browsers
To run the tests with a different browser use a comma-separated value as in `BROWSERS='chrome,safari' npm run all`. 

To run tests against a browser in sauce labs, you will need the sauce labs credentials in your `.env`. 

### Specifying Test Files
To run a subset of the tests, specify the path to the test files like this `TEST_FILES='tests/index.js,tests/permissions.js' npm run all`.

Both `BROWSERS` and `TEST_FILES` accept a comma delimited list of entries.

## Writing Tests

### Actions Library
Inside `/actions`, there are "prerecorded" actions and assertions that comprise common actions a user might do with console. To write tests, we can reuse those:

```
import { thread } from '../thread.js'
import { navigateTo } from '../navigation/pages.js'
import { uploadComp } from '../actions/compositions.js'
import { runProcessFromStorage } from '../actions/processes.js'

await thread(t,
  [navigateTo, compositionsPage],
  [uploadComp, testCompName, testComp],
  [navigateTo, processesPage],
  [runProcessFromStorage, alias, testCompName]
```

### Writing New Tests
[Test Cafe Documentation](https://devexpress.github.io/testcafe/documentation/test-api/)

#### Selecting Selectors
When writing tests, we aim to test as much like a user as we can. Additionally, we want to see when expected text changes and we don't want to heavily depend on DOM hierarchy, as it makes the tests more brittle. Thus, when choosing a selector, this is the list of priorities:

1. First, try to key on the words on the screen: `t.click(Selector('button').withText('Kill Process'))`
1. Next, try to find an html element that you're assured will be unique. The problem with this is the structure _may_ change making the tests brittle.
1. Finally, choose a class or other React-specific element. This is likely to be the most brittle.