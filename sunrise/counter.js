import { Selector } from 'testcafe'

import { thread } from '../lib/thread.js'

fixture `Counter`
  .page `http://localhost:8080/`

let clickButton = async (t) => {
  await t
    .click(Selector('button'))
  return t
}

let assertCount = async (t, count) => {
  await t.expect(Selector('strong').innerText).eql(`${count}`)
  return t
}

let assertEven = async (t) => {
  await t.expect(Selector('span').withText(/even number/i).exists).ok()
  return t
}

let assertNotEven = async (t) => {
  await t.expect(Selector('span').withText(/even number/i).exists).notOk()
  return t
}

test('Counter increments when clicked', async t => {
  await thread(
    t,
    [assertCount, 0],
    clickButton,
    [assertCount, 1]
  )
})

test('Even only displayed for even numbers', async t => {
  await thread(
    t,
    assertEven,
    clickButton,
    assertNotEven,
    clickButton,
    assertEven
  )
})
