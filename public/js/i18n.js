const defaultLocale = "en";
let locale = localStorage.getItem("locale") || defaultLocale;
let translations;

// ...

// When the page content is ready...
document.addEventListener("DOMContentLoaded", async () => {
  translations = await fetchTranslationsFor(locale);
  setLocale(locale);
  bindLocaleSwitcher(locale);

});

// ...

// Whenever the user selects a new locale, we
// load the locale's translations and update
// the page
function bindLocaleSwitcher(initialValue) {
  const switcher = document.querySelectorAll("[data-i18n-switcher]");
  if(!switcher) return;
 // switcher.value = initialValue;
  switcher.forEach(s=>{
    s.onclick = (e) => {
      // Set the locale to the selected option[value]
      let t = e.target;
      if(t instanceof HTMLParagraphElement||t instanceof HTMLImageElement)
        t=t.parentElement;
      setLocale(t.dataset.value);
      localStorage.setItem("locale", t.dataset.value);
    };
  })

}

// Load translations for the given locale and translate
// the page to this locale
async function setLocale(newLocale) {
  // if (newLocale === locale) return;
  translations = await fetchTranslationsFor(newLocale);
  locale = newLocale;
  translatePage();
}

// Retrieve translations JSON object for the given
// locale over the network
async function fetchTranslationsFor(newLocale) {
  const response = await fetch(`../translations/${newLocale}.json`);
  return await response.json();
}

// Replace the inner text of each element that has a
// data-i18n-key attribute with the translation corresponding
// to its data-i18n-key
function translatePage() {
  document.querySelectorAll("[data-i18n-key]").forEach(translateElement);
}

// Replace the inner text of the given HTML element
// with the translation in the active locale,
// corresponding to the element's data-i18n-key
function translateElement(element) {
  const key = element.getAttribute("data-i18n-key");
  const translation = translations[key];
  element.innerText = translation;
}

document.querySelectorAll("[data-i18n-switcher]").forEach(function(element) {
  element.addEventListener('click', function(e) {
    window.location.href = '/home';
  }, false);
});
