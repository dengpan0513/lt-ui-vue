const importSVG = require.context('./svgs', false, /\.svg$/)
const importAllSVG = r => r.keys().map(r)
importAllSVG(importSVG)
