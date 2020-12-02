const fs = require('fs');
const handlebars = require('handlebars');
const handlebarsWax = require('handlebars-wax');
// const addressFormat = require('address-format');
const moment = require('moment');
const Swag = require('swag');
const i18n = require('roddeh-i18n');

var locale = "en";

try {
  window.Swag.registerHelpers(handlebars);
} catch (e) {
  Swag.registerHelpers(handlebars);
}

de = i18n.create({
  values:{
    "Projects": "Projekte",
    "Education": "Ausbildung",
    "Volunteer": "Ehrenamt",
    "Publications": "Veröffentlichungen",
    "Skills": "Kenntnisse",
    "Languages": "Sprachen",
    "I can help with": "Womit ich helfen kann:"
  }
});

en = i18n.create({
  values:{
    "Projects": "Projects",
    "Education": "Education",
    "Volunteer": "Volunteer",
    "Publications": "Publications",
    "Skills": "Skills",
    "Languages": "Languages",
  }
});

handlebars.registerHelper({
  removeProtocol: url => url.replace(/.*?:\/\//g, ''),
  concat: (...args) => args.filter(arg => typeof arg !== 'object').join(''),
  join: (list, divider) => list.join(divider),
  // Arguments: {address, city, subdivision, postalCode, countryCode}
  // formatAddress: (...args) => addressFormat(args).join(' '),
  formatAddress: (...args) => args.filter(arg => typeof arg !== 'object').join(' '),
  formatDate: date => moment(date).format('MM/YYYY'),
  i18n: (str) => (locale === "en") ? en(str) : de(str),
  ifEquals: (arg1, arg2, options) => (arg1 == arg2) ? options.fn(this) : options.inverse(this),
  // lowercase: s => s.toLowerCas(),
});

function render(resume) {
  locale = "$RESUME_LOCALE";
  const dir = `${__dirname}/src`;
  const css = fs.readFileSync(`${dir}/style.css`, 'utf-8');
  const resumeTemplate = fs.readFileSync(`${dir}/$RESUME_FILE`, 'utf-8');

  const Handlebars = handlebarsWax(handlebars);

  Handlebars.partials(`${dir}/partials/**/*.{hbs,js}`);

  return Handlebars.compile(resumeTemplate)({
    style: `<style>${css}</style>`,
    resume,
  });
}

module.exports = {
  render,
};
