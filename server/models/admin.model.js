const mongoose = require('mongoose');
const { Schema, model: _model } = mongoose;

const requiredString = { type: String, required: true };
const requiredUniqueString = { type: String, required: true, unique: true };
const collectionName = 'admin-data';

const DataModel = new Schema(
  {
    email: requiredUniqueString,
    password: requiredString,
  },
  { collection: collectionName } 
);

const model = _model(collectionName, DataModel);

module.exports = model;