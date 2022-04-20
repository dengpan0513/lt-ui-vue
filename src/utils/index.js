/**
 * @description 根据参数生成对应组件的 class
 * @param {String} arguments 参数
 * @returns {String}
 */
export const createClass = function () {
  const classList = Array.from(arguments)
  return classList.join('')
}
