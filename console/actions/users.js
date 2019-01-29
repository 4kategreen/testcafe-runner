import { Selector } from 'testcafe'

const SECOND = 1000

/**
 * @function addAdminUser
 * Add an admin user to console
 *
 * @param t {testcafe}
 * @param user {String}
 * @param pass {String}
 */
export let addAdminUser = async (t, user, pass) => {
  await t
    .click(Selector('a[href="/users"]'))
    .click(Selector('main').find('button'))
    .typeText('input[name="email"]', user)
    .typeText('input[name="password"]', pass)
    .typeText('input[name="confirm_password"]', pass)
    .click(Selector('input[label="Administrator Rights"]').sibling()) // because of course, react
    .click(Selector('button').withText(/add user/i))

  return t
}

/**
 * @function addBasicUser
 * Add an admin user to console. Only difference is
 * you don't click the admin rights checkbox.
 *
 * @param t {testcafe}
 * @param user {String}
 * @param pass {String}
 */
export let addBasicUser = async (t, user, pass) => {

  await t
    .click(Selector('a[href="/users"]'))
    .click(Selector('main').find('button'))
    .typeText('input[name="email"]', user)
    .typeText('input[name="password"]', pass)
    .typeText('input[name="confirm_password"]', pass)
    .click(Selector('button').withText(/add user/i))

  return t
}

export let assertFailedLogin = async (t) => {
  await t
    .expect(Selector('aside').withText(/Invalid login credentials/i).exists).ok()
    .wait(2 * SECOND)

  return t
}

export let assertSuccessfulLogin = async (t) => {
  await t.expect(Selector('h1').withText(/Managed Processes/).exists).ok()

  return t
}

/**
 * @function changePasswordFromProfile
 * This change password is for the profile route only. It's
 * different because this one prompts for your current 
 * password while the user page doesn't.
 *
 * @param t {testcafe}
 * @param oldPass {String}
 * @param newPass {String}
 */
export let changePasswordFromProfile = async (t, oldPass, newPass) => {
  await t
    .click(Selector('button').withText(/User/))
    .click(Selector('button').withText(/Change Password/i))
    .typeText('input[name="current_password"]', oldPass)
    .typeText('input[name="new_password"]', newPass)
    .typeText('input[name="new_password_confirm"]', newPass)
    .click(Selector('button').withText(/save password/i))
    .wait(2 * SECOND)

  return t
}

/**
 * @function changePasswordFromUserPage
 * This change password doesn't prompt for the current
 * password but requires a user to select who to change.
 *
 * @param t {testcafe}
 * @param user {String}
 * @param newPass {String}
 */
export let changePasswordFromUserPage = async (t, user, newPass) => {
  await t
    .click(Selector('.rt-td').withText(user))
    .click(Selector('button').withText(/edit user/i))
    .click(Selector('button').find('span').withText(/change password/i))
    .typeText('input[name="password"]', newPass)
    .typeText('input[name="confirm_password"]', newPass)
    .click(Selector('button').withText(/save password/i))
    .wait(2 * SECOND)

  return t
}
  
/**
 * @function deleteUser
 * Delete a user
 * 
 * @param t {testcafe}
 * @param user {String}
 */
export let deleteUser = async (t, user) => {
  let userTableEntry = Selector('a').withExactText(user)

  await t
    .click(Selector('span').withExactText('Remove User'))
    .click(Selector('aside footer button[type="submit"]'))

  return t
}

/**
 * @function login
 * Log in
 *
 * @param t {testcafe}
 * @param user {String}
 * @param pass {String}
 */
export let login = async (t, user, pass) => {
  await t
    .typeText('input[name="email"]', user, { replace: true })
    .typeText('input[name="password"]', pass, { replace: true })
    .click(Selector('button[type="submit"]').withText(/sign in/i))

  return t
}

/**
 * @function logout
 * Log out
 *
 * @param t {testcafe}
 */
export let logout = async (t) => {
  await t
    .click(Selector('button').withText(/user/i))
    .click(Selector('button').withText(/sign out/i))
    .wait(2 * SECOND)

  return t
}
