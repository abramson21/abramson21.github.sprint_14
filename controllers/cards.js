const Card = require('../models/card');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((card) => {
      if (card.length === 0){
        return res.status(404).send({ message: 'База данных cards пуста! '})
      }
      return res.send({ data: card })
    })
    .catch((error) => res.status(500).send({ message: error.message }));
  }

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const {name, link} = req.body;
  Card.create({name, link, owner})
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Не удается создать карточку' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
  .then((card) => {
    console.log(card);
    if (card === null){
      return res.status(404).send({ message: 'Данной карточки нет!'})
    }
    return res.send({ data: card })
  })
  .catch((error) => res.status(500).send({ message: error.message }));
}