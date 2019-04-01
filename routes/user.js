const express = require('express');
const router = express.Router();
const http = require('http');
const config = require('../config');

const axios = require('axios');

/* GET users listing. */
router.get('/login', function(req, res, next) {
  var userInfo = req.session.userInfo;

  if (!userInfo) {
    res.redirect(`${config.gitlab.host}/oauth/authorize?client_id=${config.gitlab.appId}&redirect_uri=${config.gitlab.redirectUri}&response_type=code&scope=read_user`);
  } else {
    res.render('logged')
  }
});

router.get('/gitlab_callback', function(req, res, next) {
  let {code} = req.query;
  
  axios.post(config.gitlab.host + '/oauth/token', {
    client_id: config.gitlab.appId,
    client_secret: config.gitlab.secret,
    code: code,
    grant_type: 'authorization_code',
    redirect_uri: config.gitlab.redirectUri
  })
  .then(function (response) {
    if(response.data.access_token) {
      console.log(response.data.access_token)
      axios.get(config.gitlab.host + '/api/v4/user', {
        params: {
          access_token: response.data.access_token
        }
      })
      .then(function(userInfo) {
        req.session.userInfo = userInfo.data;
        res.redirect('/user/login')
      })
      .catch(function(error) {
        res.status(500).send({data: error.message});
      })
    }
  })
  .catch(function (error) {
    res.status(500).send({data: error.response.error_description});
  });

});

module.exports = router;
