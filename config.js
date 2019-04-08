let config = {
  gitlab: {
    host: 'http://10.191.6.229:10080',
    appId: 'e4adcedfc3dfb5637871fbf5cdba2f788bf710a5536908546e50b8b7d56d4837',
    secret: '321113ab713d09a50e8d4d04989fd76836f4f78ba04bc71c8618e82089f56300',
    redirectUri: 'http://10.191.18.218:3000/api/user/gitlab_callback'
  },
  db: process.env.NODE_ENV === "production" ? '../db-file.json' : 'db/db-file.json'
}

module.exports = config;