exports.notFound404 = (req, res, next) => {
  res.status(404).render('not-found', {docTitle:"404 Page not found", path:''})
}
