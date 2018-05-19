/* eslint-disable */
let result = []
let nameKeys = []
let childKeys = []

export function format(data, naKeys, chKeys) {
  result = [{}, {}, {}, {}]
  nameKeys = naKeys
  childKeys = chKeys
  return formatData(data)
}

function formatData(data = []) {
  if (!data) return
  for (let j = 0; j < data.length; j++) {
    const weight = j + 1 + ''
    const item = data[j]
    const name = item[nameKeys[0]]
    result[0][weight] = { label: name, key: weight, value: weight }

    formatLevel1(item[childKeys[0]], weight)
  }

  return result
}

function formatLevel1(data = [], w) {
  if (!data) return
  for (let j = 0; j < data.length; j++) {
    const weight = w + '-' + (j + 1)
    const item = data[j]
    const name = item[nameKeys[1]]
    result[1][weight] = { label: name, key: weight, value: weight }

    formatLevel2(item[childKeys[1]], weight)
  }
}

function formatLevel2(data = [], w) {
  if (!data) return
  for (let j = 0; j < data.length; j++) {
    const weight = w + '-' + (j + 1)
    const item = data[j]
    const name = item[nameKeys[2]]
    result[2][weight] = { label: name, key: weight, value: weight }

    formatLevel3(item[childKeys[2]], weight)
  }
}

function formatLevel3(data = [], w) {
  if (!data) return
  for (let j = 0; j < data.length; j++) {
    const weight = w + '-' + (j + 1)
    const item = data[j]
    const name = item[nameKeys[3]]
    result[3][weight] = { label: name, key: weight, value: weight }

    // if (childKeys[3]) {
    //   formatLevel4(item[childKeys[3]], weight)
    // }
  }
}

// function formatLevel4(data = [], w) {
//   if (!data) return
//   for (let j = 0; j < data.length; j++) {
//     const weight = w + '-' + (j + 1)
//     const item = data[j]
//     const name = item[nameKeys[4]]
//     result[4][weight] = { label: name, key: weight, value: weight }
//   }
// }
