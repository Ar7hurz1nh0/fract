exports.page = () => {
  return <div>
    <h1>Register</h1>
    <form action="/submit" method="POST">
      <label>Email</label><input name='email'/><br/>
      <label>Password</label><input name='password'/>
      <button type="submit">Submit</button>
    </form>
  </div>
}

exports.props = {
  page: {
    title: 'Register'
  }
}