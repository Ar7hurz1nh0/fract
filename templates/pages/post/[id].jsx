exports.page = () => {
  return (<div>
    <h1>This is a blog post</h1>
    <p>{window.props.local.id.toUpperCase()}</p>
  </div>
  )
}

exports.props = {
  page: {
    title: 'Blog Post'
  }
}