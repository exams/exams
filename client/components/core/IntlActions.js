import { localizationData } from '../../Intl/setup';

// Export Constants
export const SWITCH_LANGUAGE = 'SWITCH_LANGUAGE';

export function switchLanguage(newLang) {
    localStorage.setItem('locale', newLang)
  return {
    type: SWITCH_LANGUAGE,
    ...localizationData[newLang],
  };
}
