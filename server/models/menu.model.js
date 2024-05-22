const mongoose = require('mongoose');
const { Schema, model: _model } = mongoose;

const requiredString = { type: String, required: true };
const requiredUniqueString = { type: String, required: true, unique: true };
const collectionName = 'menu-data';

const DataModel = new Schema(
  {
    name: requiredUniqueString,
    description: requiredString,
    image: requiredString,
    price: requiredString,
    disabled: { type: Boolean, required: true }
  },
  { collection: collectionName } 
);

const model = _model(collectionName, DataModel);

module.exports = model;