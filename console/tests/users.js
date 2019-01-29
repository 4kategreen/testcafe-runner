import { Selector } from 'testcafe'

import { 
  adminUser, 
  basicUser 
} from '../config.js'
import { SECOND } from '../../lib/constants.js'
import { 
  nonexistentEmailAddress,
  password 
} from '../../lib/generators.js'
import { 
  navigateTo, 
  processesPage 
} from '../navigation/pages.js'
import { thread } from '../../lib/thread.js'

import { 
  addAdminUser, 
  addBasicUser,
  assertFailedLogin,
  assertSuccessfulLogin,
  changePasswordFromProfile,
  changePasswordFromUserPage, 
  login, 
  logout 
} from '../actions/users.js'

let adminUsername = nonexistentEmailAddress()
let basicUsername = nonexistentEmailAddress()
let oldPass = password()
let newPass = password()

fixture `User Administration`

test
  .before(async t => {
    await t
      .useRole(adminUser.role)
      .click('a[href="/users"]')

    let rows = Selector('.rt-tbody')
    let rowSnapshot = await rows()
    t.ctx.adminTestUsers = rowSnapshot.childElementCount
  })
  ('Add Admin and Edit User from User and Profile Pages', async t => {
    let newestPass = 'yet another password'
    let row = Selector('.rt-tbody')
    let assertSuccessfulLogin = async (t) => {
      await t.expect(Selector('h1').withText(new RegExp(adminUsername)).exists).ok()
      return t
    }

    await thread(t
     [addAdminUser, adminUsername, oldPass],
     [changePasswordFromUserPage, adminUsername, newPass],
     logout,
     [login, adminUsername, oldPass],
     assertFailedLogin,
     [login, adminUsername, newPass],
     assertSuccessfulLogin,
     [changePasswordFromProfile, newPass, newestPass],
     logout,
     [login, adminUsername, newPass],
     assertFailedLogin,
     [login, adminUsername, newestPass],
     assertSuccessfulLogin,
    )
  })

  test
    .before(async t => {
      await t
        .useRole(adminUser.role)
        .click('a[href="/users"]')

      let rows = Selector('.rt-tbody')
      let rowSnapshot = await rows()
      t.ctx.basicTestUsers = rowSnapshot.childElementCount
    })
    ('Add and Edit Basic User from User and Profile Pages', async t => { 
      let row = Selector('.rt-tbody')
      let newestPass = password()

      let assertUserAdded = async (t, username, rowCount) => {
        let row = Selector('.rt-tbody')

        await t
          .expect(row.withText(username).exists).ok()
          .expect(row.childElementCount).eql(rowCount + 1)

        return t
      }

      await thread(t, 
        [addBasicUser, basicUsername, oldPass],
        [assertUserAdded, basicUsername, t.ctx.basicTestUsers],
        [changePasswordFromUserPage, basicUsername, newPass],
        [navigateTo, processesPage],
        logout,
        [login, basicUsername, oldPass],
        assertFailedLogin,
        [login, basicUsername, newPass],
        assertSuccessfulLogin,
        [changePasswordFromProfile, newPass, newestPass],
        logout,
        [login, basicUsername, newPass],
        assertFailedLogin,
        [login, basicUsername, newestPass],
        assertSuccessfulLogin
      )
    })
