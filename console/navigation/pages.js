import { Selector } from 'testcafe'

// Go to a page by clicking its link in the sidebar
export let navigateTo = async (t, page) => {
  await t.click(page.link)
  return t
}

// Dismiss the current modal by clicking the 'X' in the top right corner
export let closeModal = async (t) => {
  await t
    .click(Selector('aside button').withText(/Close/))
  return t
}

class Page {
  constructor(name, path, title) {
    this.name = name
    this.link = Selector(`a[href="${path}"]`)
    this.path = path
    this.title = title
  }

  assertUserCanSee(user) {
    test(`${user.admin ? 'admin' : 'basic'} user can view ${this.name}`, async t => {
      await t
        .useRole(user.role)
        .expect(this.link.exists).ok()
        .click(this.link)
        .expect(Selector('main').find('h1').innerText).eql(this.title)
    })
  }

  assertUserCannotSee(user) {
    test(`${user.admin ? 'admin' : 'basic'} user cannot view ${this.name}`, async t => {
      await t
        .useRole(user.role)
        .expect(this.link.exists).notOk()
    })
  }

  assertAfterNavigation(user, description, cb) {
    test(`${user.admin ? 'admin' : 'basic'} user ${description}`, async t => {
      await t
        .useRole(user.role)
        .click(this.link)

      return cb(t)
    })
  }
}

export const accountsPage = new Page("accounts", "/accounts", "Accounts")
export const compositionsPage = new Page("compositions", "/compositions", "Compositions")
export const processesPage = new Page("processes", "/processes", "Managed Processes")
export const rbacPage = new Page("rbac", "/rbac", "RBAC Policy")
export const usersPage = new Page("users", "/users", "Users")
export const validationsPage = new Page("validations", "/validations", "Validations")
