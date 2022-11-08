import os
from inspect import getmembers, isfunction
from importlib import import_module
from typing import Iterable, List
from react import jsx
from flask import Flask, Response, make_response, render_template, request, copy_current_request_context, after_this_request, send_file, abort, session
JSX = jsx.JSXTransformer()
DEVELOPMENT = False
# When possible, set this to false
# Although you loose the re-render every refresh
# requests after the page is cached are up to 20x faster
# (during testing, the worst case for a cached page was near the same latency as the best case of a non cached one)
Path = os.getcwd()
app = Flask(__name__)
apiPrefix = '/api'
flaskPrefix = "/__flask_page_blob"

def readDir(path, extension) -> List[str]:
  files = []
  for (pathwalk, _, filenames) in os.walk(Path + '/templates/' + path + '/'):
    for filename in filenames:
      filename = pathwalk + '/' + filename
      if filename.endswith(extension):
        files.append(filename
          .replace(Path, '')
          .replace('\\', '/')
          .replace('//', '/')
        )
  return files

pageCache = dict()

def createRoute(route: str, filePath: str = '') -> None:
  name = route.replace('/', '_')
  pageCache[name] = None
  def renderHTML(**kwargs):
    res = None
    if DEVELOPMENT or pageCache[name] == None:
      res = render_template(filePath)
      res = JSX.transform_string(res)
      if not DEVELOPMENT:
        pageCache[name] = res
        print('Cached', name)
    else: res = pageCache[name]
    props = res[res.find('exports.props'):-1]
    res = res.replace(props, ('{\nlocal:'+str(kwargs)+',').join(props.split('{', 1)))
    res = Response(res)
    res.headers['Content-Type'] = 'text/jsx'
    return res
  renderHTML.__name__ = name
  app.route(route)(renderHTML)
  rawRoute = route.removeprefix(flaskPrefix)
  def injector(**_): return render_template(
    'injector.html',
    flaskPrefix=flaskPrefix,
    flaskApiPrefix=apiPrefix
    )
  injector.__name__ = rawRoute.replace('/', '_')
  app.route(rawRoute)(injector)

def createApiRoute(route: str, module: str) -> None:
  ROUTE: List[List[str | function]] = getmembers(import_module(module), isfunction)
  METHODS = [r[0] for r in ROUTE]
  ROUTE = [r[1] for r in ROUTE]
  def api():
    METHOD = request.method.swapcase()
    if METHODS.__contains__(METHOD):
      response: List[Response] = [Response()]
      response[0].redirectTo = None
      response[0].send = send_file
      response[0].end = abort
      response[0].next = after_this_request
      def Redirect(location: str):
        response[0].redirectTo = location
      def RES(data: Iterable[bytes] | bytes | Iterable[str] | str | None = None):
        newRes = make_response(data)
        response[0].response = newRes.response
        response[0].headers['Content-Type'] = newRes.content_type
        response[0].content_type = newRes.content_type
      response[0].res = RES
      response[0].redirect = Redirect
      fun = ROUTE[METHODS.index(METHOD)]
      fun = fun.__get__(response[0], response[0].__class__)
      setattr(response[0], fun.__name__, fun)
      req = request
      req.session = session
      copy_current_request_context(fun(req=req))
      if METHODS.__contains__('next'):
        copy_current_request_context(ROUTE[METHODS.index('next')]())
      if response[0].redirectTo != None:
        response[0].headers['Form-Redirect'] = response[0].redirectTo
      return response[0]
  api.__name__ += route.replace('/', '_')
  app.route(route, methods=METHODS)(api)

for file in readDir('api', '.py'):
  createApiRoute(
    apiPrefix + file
      .removeprefix('/templates/api')
      .removesuffix('.py')
      .replace('index', '')
      .replace('//', '/')
      .removesuffix('/') + '/',
    file
      .removeprefix('/')
      .removesuffix('.py')
      .replace('/', '.')
  )

for file in readDir('pages', '.jsx'):
  createRoute(
    flaskPrefix + file
      .removeprefix('/templates/pages')
      .removesuffix('.jsx')
      .replace('index', '')
      .replace('//', '/')
      .replace('[', '<')
      .replace(']', '>')
      .removesuffix('/') + '/',
    file.removeprefix('/templates/'),
  )

@app.route('/test', methods=['post', 'put'])
def test():
  return request.method

if __name__ == '__main__':
  app.run(debug=DEVELOPMENT)