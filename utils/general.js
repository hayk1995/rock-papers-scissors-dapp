import cryptoRandomInt from 'crypto-random-int';
import { utils } from 'ethers';

export const getSalt = async () => cryptoRandomInt(0, 2 ** 32 - 1);

export const storeValue = (key, value) => {
  localStorage.setItem(key, value);
};

export const solidityKeccak256 = (types,values) => {
  return utils.solidityKeccak256(types, values);
}

export const getValue = (key) => localStorage.getItem(key);

export const equalsIgnoreCase = (str1, str2) => str1 !== undefined && str2 !== undefined && str1.toUpperCase() === str2.toUpperCase();

export const isBlank = (str) => str == undefined || str.trim() === '';

export const isDecimal = (str) => !isNaN(str) && !isNaN(parseFloat(str));

export const isInRange = (val, start, end) => val >= start && val <= end;
