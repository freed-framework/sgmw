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
  for (let j = 0; j < data.length; j++) {
    const weight = (j + 1) * 100000
    const item = data[j]
    const name = item[nameKeys[0]]
    result[0][weight] = { label: name, key: weight, value: weight }

    formatLevel1(item[childKeys[0]], weight)
  }
  return result
}

function formatLevel1(data = [], w) {
  for (let j = 0; j < data.length; j++) {
    const weight = w + (j + 1) * 10000
    const item = data[j]
    const name = item[nameKeys[1]]
    result[1][weight] = { label: name, key: weight, value: weight }

    formatLevel2(item[childKeys[1]], weight)
  }
}

function formatLevel2(data = [], w) {
  for (let j = 0; j < data.length; j++) {
    const weight = w + (j + 1) * 1000
    const item = data[j]
    const name = item[nameKeys[2]]
    result[2][weight] = { label: name, key: weight, value: weight }

    formatLevel3(item[childKeys[2]], weight)
  }
}

function formatLevel3(data = [], w) {
  for (let j = 0; j < data.length; j++) {
    const weight = w + (j + 1) * 100
    const item = data[j]
    const name = item[nameKeys[3]]
    result[3][weight] = { label: name, key: weight, value: weight }
  }
}
