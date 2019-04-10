export const upper = value => value && value.toUpperCase();
export const lower = value => value && value.toLowerCase();
export const onlyNumber = (value) => { return !value ? value : value.replace(/[^\d]/g, ''); };
export const trimSpace = (value) => { return !value ? value : value.replace(/\s/g, ''); };
export const trimInitialSpace = (value) => { return !value ? value : value.replace(/^\s/, ''); };
export const onlyNumberAndDecimal = (value) => { return !value ? value : value.replace(/[^\d.]/g, ''); };
export const onlyAlphabets = (value) => { return !value ? value : value.replace(/[^a-z]/gi, ''); };
export const onlyAlphabetsWithSpace = (value) => { return !value ? value : value.replace(/[^a-z ]/gi, ''); };
