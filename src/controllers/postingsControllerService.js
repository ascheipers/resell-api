'use strict'

const models = require('../../models');
const { Op } = require('sequelize');

module.exports.getpostings = function getpostings(req, res, next) {
  let category = req.category.value;
  let location = req.location.value;
  let date = req.date.value;

  try {
    location = JSON.parse(location);
  } catch (error) {
    location = undefined;
  }
  try {
    if (date != undefined && date != null) {
      date = new Date(date);
      date.setHours(0,0,0,0);
    } else {
      date = undefined;
    }
  } catch (error) {
    date = undefined;
  }

  if (!( location != undefined
    && 'street' in location
    && 'city' in location
    && 'country' in location
    && typeof(location.street) === 'string'
    && typeof(location.city) === 'string'
    && typeof(location.country) === 'string'
    )) {
    location = null;
  }

  const searchFields = {};
  let useSearch = false;

  if (category != undefined && category != null) {
    searchFields.category = category;
    useSearch = true;
  }
  if (location != undefined && location != null) {
    searchFields.location_street = location.street;
    searchFields.location_city = location.city;
    searchFields.location_country = location.country;
  }
  if (date != undefined && date != null) {
    searchFields.createdAt = {
      [Op.gte]: date,
      [Op.lt]: new Date(date.getTime() + 60 * 60 * 24 * 1000)
    };
    useSearch = true;
  }

  if (useSearch) {
    models.Posting.findAll({ where: searchFields }).then(postings => {
      res.send(postings);
    });
  } else {
    models.Posting.findAll().then(postings => {
      res.send(postings);
    });
  }
};

module.exports.postpostings = function postpostings(req, res, next) {
  const postingData = req.undefined.value;
  postingData.creator = req.loggedInUser;

  models.Posting.create(postingData).then(posting => {
    res.send({ ...posting.toJSON(), images: [] });
  });
};