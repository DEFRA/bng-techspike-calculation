const xlsx = require('xlsx')
const path = require('path')

module.exports = {
  method: 'GET',
  path: '/calculate',
  handler: (request, h) => {
    try {
      const workbook = xlsx.readFile(path.join(__dirname, '../file/data.xlsm'))
      const wsnames = workbook.SheetNames
      console.log(wsnames)

      const worksheet = workbook.Sheets['Headline Results']
      const data = xlsx.utils.sheet_to_json(worksheet, { header: ['A', 'B', 'C', 'D', 'E'], range: 'F28:J30', blankrows: false, defval: null })
      console.log(data)

      const worksheet2 = workbook.Sheets['D-1 Off-Site Habitat Baseline']
      const data2 = xlsx.utils.sheet_to_json(worksheet2, { header: 1, range: 'D11:AF258', blankrows: false, defval: null })
      const t = data2.filter(obj => obj[2] !== null && obj[2] !== undefined && obj[2] !== '')
      console.log(JSON.stringify(t))
    } catch (err) {
      console.log(err)
    }
    return h.response('ok').code(200)
  }
}
