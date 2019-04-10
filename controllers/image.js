const Clarifai = require('clarifai');


const app = new Clarifai.App({
    apiKey: '4cefcee9fd4d4c60b153b4efea8e0219'
});

const handleApi = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with Api'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))       
}

module.exports = {
    handleImage: handleImage,
    handleApi: handleApi
}