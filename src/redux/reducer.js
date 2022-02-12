
export default function Reducer (preState, action) {
  // 在action中拿到type和data
  const {type, data} = action
  switch (type) {
    case 'store':
      return data
    case 'list':
      return data
    default:
      return preState
  }
}