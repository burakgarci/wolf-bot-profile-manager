import { WOLF, OnlineState, Language } from 'wolf.js'
import { readFile } from 'fs/promises'
import accounts from './accounts.js'

const about = `About
this
bot`

const status = 'Unofficial bot by John Doe'

const avatar = await readFile('./bot.jpg')

async function updateProfile(email, password, nickname) {
  const api = new WOLF()
  await new Promise(resolve => {
    api.on('ready', async () => {
      console.log(`Ready: ${email} - ${api.currentSubscriber.nickname} (${api.currentSubscriber.id})`)
      api.setOnlineState(OnlineState.ONLINE)
      // api.group.joinById()
      await api.update({
        nickname,
        avatar,
        status,
        about,
        langauge: Language.ENGLISH
        // urls: ['https://wolf.burak.ga'],
      })
      resolve()
    })
    api.login(email, password)
  })
}

(async function () {
  for (const acc of accounts) {
    await updateProfile(acc.email, acc.password, acc.nickname)
  }
  console.log('All accounts updated!')
})()
