/**
 * @description 根据参数生成对应组件的 class
 * @param {String} arguments 参数
 * @returns {String}
 */
export const createClass = function () {
  const classList = Array.from(arguments)
  return classList.join('')
}

/**
 * @description 验证参数是否是给定数组中存在的项
 * @param {String} value
 * @param {Array} validArray
 * @returns {Boolean}
 */
export const oneOf = (value, validArray) => {
  return validArray.includes(value)
}
