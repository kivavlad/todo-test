/**
 * Генератор чисел с шагом 1
 * @returns {Number}
 */
export const generateCode = (function (start = 0) {
    return () => ++start;
}());

/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @returns {String}
 */
export function plural(value: number, variants: any = {}, locale = 'ru-RU') {
  const key = new Intl.PluralRules(locale).select(value);
  return `${value} ${variants[key]}` || '';
}
