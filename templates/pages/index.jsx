function Foo() {
  return 'Bar'
}

exports.page = () => {
  let isLoginOpen = false
  let [a, setA] = hooks.useState('This is a variable text')
  const obj = {
    a: 1,
    b: 2,
    c: 3
  }
  setTimeout(() => setA(a + " that has changed on runtime after 2 sec"), 2000)
  return (
    <div>
      <h1>Hello World!</h1>
      <h3>This is the index file</h3>
      <div>{ Object.entries(obj).map(a => <p>{a[0]}: {a[1]}</p>)}</div>
      { isLoginOpen ? (<div></div>) : null }
      <p>{a}</p>
      <p>Foo: {Foo()}</p>
      <a href="/login">Login Page</a>
    </div>
  )
}

exports.props = {
  page: {
    title: 'Index Page'
  }
}