import { addLocaleData } from 'react-intl';
import Intl from 'intl';
import areIntlLocalesSupported from 'intl-locales-supported';

import 'intl/locale-data/jsonp/zh';
import zh from 'react-intl/locale-data/zh';
import zhData from './localizationData/zh';

import 'intl/locale-data/jsonp/en';
import en from 'react-intl/locale-data/en';
import enData from './localizationData/en';

// list of available languages
export const enabledLanguages = [
  'zh',
  'en',
];

export const localizationData = {};

if (global.Intl) {
  // Determine if the built-in `Intl` has the locale data we need.
  if (!areIntlLocalesSupported(enabledLanguages)) {
    // `Intl` exists, but it doesn't have the data we need, so load the
    // polyfill and patch the constructors we need with the polyfill's.
    global.Intl.NumberFormat = Intl.NumberFormat;
    global.Intl.DateTimeFormat = Intl.DateTimeFormat;
  }
} else {
  // No `Intl`, so use and load the polyfill.
  global.Intl = Intl;
}

// use this to allow nested messages, taken from docs:
// https://github.com/yahoo/react-intl/wiki/Upgrade-Guide#flatten-messages-object
function flattenMessages(nestedMessages = {}, prefix = '') {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value; // eslint-disable-line no-param-reassign
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
}

// bring in intl polyfill, react-intl, and app-specific language data
addLocaleData(zh);
localizationData.zh = zhData;
localizationData.zh.messages = flattenMessages(localizationData.zh.messages);

addLocaleData(en);
localizationData.en = enData;
localizationData.en.messages = flattenMessages(localizationData.en.messages);



