import { Role, Selector } from 'testcafe'

export let rootUrl = ''

let createUser = (name, password, admin=false) => {
  return {
    admin: admin,
    name: name,
    password: password,
    role: Role(rootUrl, async t => {
      await t
        .typeText('input[name="email"]', name)
        .typeText('input[name="password"]', password)
        .click('button[type="submit"]')
        .expect(Selector('div[class^="HeaderPage-location"]').find('h1').innerText).eql('Managed Processes', 'Login Successful')
        .wait(5000) // Give the backend time to persist the session before trying to restore state. Otherwise the state restore from `useRole` fails.
    }, {
      preserveUrl: true
    })
  }
}

export let adminUser = createUser('casey@fugue.co', 'casey@fugue.co', true)
export let basicUser = createUser('casey+basic@fugue.co', 'casey+basic@fugue.co', false)