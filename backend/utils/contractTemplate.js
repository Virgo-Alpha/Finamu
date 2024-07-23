const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'contractTemplate.ejs');

const generateContract = (project, filmmaker, investor) => {
  const data = {
    project,
    filmmaker,
    investor,
  };

  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, data, (err, str) => {
      if (err) {
        return reject(err);
      }
      resolve(str);
    });
  });
};

module.exports = generateContract;
