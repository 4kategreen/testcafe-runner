import { SECOND } from './constants.js'

/**
 * @function wait
 * Wait until time has elapsed before returning
 *
 * @param t { testcafe }
 * @param secs { Int } (the number of seconds to wait)
 */
export let wait = async (t, secs) => {
  await t
    .wait(secs * SECOND)
  return t
}

/**
 * @function waitUntilExists
 * Wait until the provided selector matches an element on the page.
 *
 * @param t { testcafe }
 * @param selector { String | Selector}
 * @param timeout { Int } (Number of seconds to wait for assertion until failing.)
 */
export let waitUntilExists = async (t, selector, timeout = 120) => {
  await t
    .expect(selector.exists).ok(`selector no longer exists`, {timeout: timeout * SECOND})
  return t
}

/**
 * @function waitUntilNotExists
 * Wait until the provided selector does not match any element on the page.
 *
 * @param t { testcafe }
 * @param selector { String | Selector}
 * @param timeout { Int } (Number of seconds to wait for assertion until failing.)
 */
export let waitUntilNotExists = async (t, selector, timeout = 120) => {
  await t
    .expect(selector.exists).notOk(`selector no longer exists`, {timeout: timeout * SECOND})
  return t
}
