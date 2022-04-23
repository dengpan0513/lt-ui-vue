module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/components/$1'
  }
}
