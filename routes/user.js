const express = require('express');
const router = express.Router();
const common = require('../common');

const axios = require('axios');

router.get('/logout', function(req, res, next) {
  var userInfo = req.session.userInfo;
  if (userInfo) {
    req.session.userInfo = null;
  }
  res.send({success: true});
});

router.get('/gitlab_callback', function(req, res, next) {

  if (req.query.error) {
    res.send(req.query);
    return
  }

  let {code} = req.query;

  axios.post(common.gitlab.host + '/oauth/token', {
    client_id: common.gitlab.appId,
    client_secret: common.gitlab.secret,
    code: code,
    grant_type: 'authorization_code',
    redirect_uri: common.gitlab.redirectUri
  })
  .then(function (response) {
    if(response.data.access_token) {
      console.log(response.data.access_token)
      axios.get(common.gitlab.host + '/api/v4/user', {
        params: {
          access_token: response.data.access_token
        }
      })
      .then(function(userInfo) {
        req.session.userInfo = {data: userInfo.data, meta: {type: 'gitlab', uid: 'gitlab' + userInfo.data.id}};
        res.redirect('/login')
      })
      .catch(function(error) {
        res.status(500).send(JSON.stringify(error));
      })
    }
  })
  .catch(function (error) {
    res.status(500).send({data: error.response.error_description});
  });

});

module.exports = router;
