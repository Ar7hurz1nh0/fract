import { preact, hooks, html as __html} from '/static/-/mod.js'
const { render: __render, h } = preact
const { body } = document
const thisDocument = document.querySelector('script[data-blob-prefix][data-api-prefix][data-id=__flask_prefix]')
const fP = thisDocument.getAttribute('data-blob-prefix');
const aP = thisDocument.getAttribute('data-api-prefix')
__render(__html`<body/>`, body, body);
window.props = { local: {}}
window.preact = preact
window.hooks = hooks
window.render = function(data) {
    data = data.replaceAll('React', 'preact')
    const start = data.indexOf('exports.props')
    let e = data.slice(start)
    const end = e.search(/^}/m)
    e = data.substring(
      start+e.indexOf('{'),
      start+end+1)
    e = e.split('\n')
      .map(a => a.trim())
      .join('')
    const metadata = JSON.parse(eval(`JSON.stringify(${e})`))
    window.props.local = metadata.local
    data = data.replace(data.substring(start, start+end+1), '').trim()
    const mainFunc = data.indexOf('exports.page')
    data = data.replace(/exports\.page([ =]+)/g, '')
    data = [ data.substring(0, mainFunc), data.substring(mainFunc) ].join('return ')
    e = Function(data)()()
    const time = 'Rendering change took'
    console.time(time);
    let trace;
    try { throw new Error() } catch (e) {
      trace = e.stack?.split('\n');
      trace.shift();
      trace[0] = '';
      trace = trace.join('\n');
    }
    console.log(e.type)
    if (e.type !== 'body') e = h('body', null, e)
    __render(e, document.body, document.body)
    if (metadata?.page?.title) document.title = metadata?.page?.title
    console.log("Render stack trace", trace);
    console.timeEnd(time);
    return metadata
}
const render = window.render
window.redirect = async (href) => {
  try {
    href = new URL(href);
    href = href.pathname.replace(/\/+$/, '');
  } catch {}
  if (href.replace(/\/+$/, '') == window.location.pathname.replace(/\/+$/, '')) return 'destiny is the same as origin';
  href = new URL(window.location.origin + href);
  const fetchRedirect = `Fetch Time to ${href.pathname}`;
  console.time(fetchRedirect);
  console.log('Fetching ', href.pathname);
  const path = fP + href.pathname.replace(/\/+$/, '') + href.search
  fetch(path)
    .then(data => data.text())
    .then(data => {
      const metadata = render(data)
      window.history.pushState(data, "", href.pathname);
      window.history.replaceState({}, metadata?.page?.title || "", location.href.replace(/\/+$/, ''));
      console.timeEnd(fetchRedirect);
    })
  return 'redirected'
}
window.onpopstate = ({ state: e }) => {
  if(e){
    render(data)
    document.title = e.pageTitle;
  }
};
window.submit = async (action, cb = function(){}, body = {}, method = 'GET') => {
  fetch(aP + action, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(data => console.log(data.headers))
    .then(cb)
}

const fetchTime = 'Fetch Initial State';
console.time(fetchTime);
fetch(fP + window.location.pathname + window.location.search)
  .then(data => data.text())
  .then(data => {
    const metadata = render(data);
    window.history.replaceState({}, metadata?.page?.title || "", location.href.replace(/\/+$/, ''));
    console.timeEnd(fetchTime);
  })

document.querySelector("body").addEventListener('click', function(e) {
  let anchor = e.target.closest('a');
  if(anchor !== null) {
    e.preventDefault()
    console.log(anchor)
    redirect(anchor.getAttribute('href'));
  }
  anchor = e.target.closest('form')
  if (anchor !== null) {
    /** TODO: criar window.submit, que fara um fetch ao action do form,
     * em seguida retornando um json com a resposta,
     * podendo ser redirecionado, caso definido */
    e.preventDefault()
    const form = {}
    for (const el of anchor.elements)
      if (el.name) form[el.name] = el.value
    window.form = form
    window.submit(
      anchor.getAttribute('action'),
      anchor.getAttribute('callback'),
      form,
      anchor.getAttribute('method')
    )
  }
}, false);