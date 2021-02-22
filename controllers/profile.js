const handleProfileGet = (db) => (request, response) => {
  const { id } = request.params;
  db.select('*').from('users').where({id: id})
    .then(user => {
      if (user.length) {
        response.json(user[0])
      } else {
        response.status(400).json('not found')
    }
   })
  .catch(error => res.status(400).json('error getting user'))
}

module.exports = {
  handleProfileGet: handleProfileGet
}