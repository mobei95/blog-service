module.exports = class BaseController {
  random(min = 100000, max = 999999) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
};
