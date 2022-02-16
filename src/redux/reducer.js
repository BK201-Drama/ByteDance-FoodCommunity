const initState = ''
export default function Reducer(preState = initState, action){
  // 在action中拿到type和data
  const {type, data} = action;
  switch (type) {
    case 'input':
      return data;
    default:
      return data;
  }
}