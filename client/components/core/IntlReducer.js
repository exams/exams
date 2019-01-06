import { enabledLanguages, localizationData } from '../../Intl/setup';
import { SWITCH_LANGUAGE } from './actionType';

let locale = 'zh'
const settingLocale = localStorage.getItem('locale')
if (settingLocale){
    locale = settingLocale
}else {
    const initLocale = navigator && navigator.language
    locale = initLocale && initLocale.split('-')[0] || 'zh';
}


const initialState = {
  locale: locale,
  enabledLanguages,
  ...(localizationData[locale] || {}),
};

const IntlReducer = (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_LANGUAGE: {
      const { ...actionWithoutType } = action;
      return { ...state, ...actionWithoutType };
    }

    default:
      return state;
  }
};

export default IntlReducer
