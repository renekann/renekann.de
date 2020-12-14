if (localStorage.getItem('language') == null) {
  var userLang = navigator.language || navigator.userLanguage;
  var languageCode = userLang.split("-")[0].toLowerCase();

  localStorage.setItem('language', languageCode);
  redirect(languageCode);
}

function redirect(actuallang) {

  var path = window.location.pathname
  var protocol = window.location.protocol
  var baseUrl = window.location.hostname
  var newPath = "/en"

  if (path.includes(actuallang)) {
    return
  }

  switch (actuallang) {
    case 'de':
      newPath = '/de';
      break;
    default:
      newPath = '/en';
      break;
  }

  window.location.replace(protocol + "//" + baseUrl + newPath);
}
