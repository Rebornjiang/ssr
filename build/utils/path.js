const path = require('path')


function resolvePath(query) {
  return path.resolve(process.cwd(), query)
}


module.exports = resolvePath