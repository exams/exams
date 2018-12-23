import { enabledLanguages, localizationData } from '../../Intl/setup';
import { SWITCH_LANGUAGE } from './actionType';

const initLocale = navigator && navigator.language || 'zh';

const initialState = {
  locale: initLocale,
  enabledLanguages,
  ...(localizationData[initLocale] || {}),
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

export { IntlReducer }
