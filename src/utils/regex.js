import { htmlEntities, reservedCharacters } from '@consts/html';

export const getHTMLTagRegex = (tagName, options = 'g') =>
  new RegExp(`<${tagName}>(.*?)</${tagName}>`, options);

export const getHTMLEntityRegex = (options = 'g') =>
  new RegExp(Object.keys(reservedCharacters).join('|'), options);

export const getReservedCharacterRegex = (options = 'g') =>
  new RegExp(Object.keys(htmlEntities).join('|'), options);