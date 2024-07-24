const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const generateContract = (project, filmmaker, investor) => {
    const templatePath = path.join(__dirname, '../templates/contractTemplate.ejs');
  const template = fs.readFileSync(templatePath, 'utf-8');
  
  const data = {
    project: {
      name: project.name,
      description: project.description,
      smartContractDetails: {
        roi: project.smartContractDetails.roi,
        dateOfRoi: new Date(project.smartContractDetails.dateOfRoi).toDateString(),
        flopPlan: project.smartContractDetails.flopPlan
      }
    },
    filmmaker: {
      firstName: filmmaker.firstName,
      lastName: filmmaker.lastName,
      idNumber: filmmaker.idNumber
    },
    investor: {
      name: investor.name,
      idNumber: investor.idNumber,
      investmentAmount: investor.investmentAmount
    }
  };

  return ejs.render(template, data);
};

module.exports = generateContract;
