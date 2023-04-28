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
  const switcher = document.querySelector("[data-i18n-switcher]");
  switcher.value = initialValue;
  switcher.onchange = (e) => {
    // Set the locale to the selected option[value]
    setLocale(e.target.value);
    localStorage.setItem("locale", e.target.value);
  };
}

// Load translations for the given locale and translate
// the page to this locale
async function setLocale(newLocale) {
  if (newLocale === locale) return;
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
