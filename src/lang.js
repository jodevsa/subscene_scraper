'use strict';

const languageSet = {
    'arabic': '2',
    'brazillianportuguese': '4',
    'danish': '10',
    'dutch': '11',
    'english': '13',
    'farsi/persian': '46',
    'finnish': '17',
    'french': '18',
    'hebrew': '22',
    'indonesian': '44',
    'italian': '26',
    'norwegian': '30',
    'romanian': '33',
    'spanish': '38',
    'swedish': '39',
    'vietnamese': '45',
    'albanian': '1',
    'armenian': '73',
    'azerbaijani': '55',
    'basque': '74',
    'belarusian': '68',
    'bengali': '54',
    'big5 code': '3',
    'bosnian': '60',
    'bulgarian': '5',
    'bulgarian/english': '6',
    'burmese': '61',
    'catalan': '49',
    'chinesebg code': '7',
    'croatian': '8',
    'czech': '9',
    'dutch/english': '12',
    'english/german': '15',
    'esperanto': '47',
    'estonian': '16',
    'georgian': '62',
    'german': '19',
    'greek': '21',
    'greenlandic': '57',
    'hindi': '51',
    'hungarian': '23',
    'hungarian/english': '24',
    'icelandic': '25',
    'japanese': '27',
    'korean': '28',
    'kurdish': '52',
    'latvian': '29',
    'lithuanian': '43',
    'macedonian': '48',
    'malay': '50',
    'malayalam': '64',
    'manipuri': '65',
    'mongolian': '72',
    'pashto': '67',
    'polish': '31',
    'portuguese': '32',
    'punjabi': '66',
    'russian': '34',
    'serbian': '35',
    'sinhala': '58',
    'slovak': '36',
    'slovenian': '37',
    'somali': '70',
    'tagalog': '53',
    'tamil': '59',
    'telugu': '63',
    'thai': '40',
    'turkish': '41',
    'urdu': '42',
    'ukrainian': '56',
};

/** @description map string language with it's subscene langCode.
 * @param {string} lang - location to save file.
   @return {boolean}
 */
function getLanguageCode(lang) {
    let l = lang.toLowerCase().trim();
    if (languageSet[l] != undefined) {
        return languageSet[l];
    } else {
        return false;
    }
}

module.exports = getLanguageCode;
