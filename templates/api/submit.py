def post(self, req):
  body = req.get_json()
  if body['email'] == 'aaa@aaa.com':
    self.res({'idade': 17, 'nome': 'Pedro'})
  else: self.res({ 'error:': 'invalid email'})
  self.redirect('/')