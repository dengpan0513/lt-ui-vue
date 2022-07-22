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

/**
 * @description 删除对象中属性值为 undefined 的属性
 * @param {Object} object
 * @returns {Object}
 */
export const deleteUndefinedKeys = object => {
  for (const key in object) {
    if (object[key] === undefined) {
      delete object[key]
    }
  }
}
