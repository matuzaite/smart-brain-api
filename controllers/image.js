const { json } = require('body-parser');
const Clarifai = require('clarifai');
const { request, response } = require('express');

const app = new Clarifai.App({
  apiKey: '755d7bedf8a24271bfd2f15a25b20f0e'
});
const handleApiCall = (request, response) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, request.body.input)
    .then(data => {
      response.json(data);
    })
  .catch(error => response.status(400).json('unable API'))
};

const handleImage = (request, response, db) => {
  const { id } = request.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      response.json(entries[0]);
    })
  .catch(err => response.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage: handleImage,
  handleApiCall
}