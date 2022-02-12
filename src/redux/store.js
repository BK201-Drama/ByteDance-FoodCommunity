/**
 * 该文件专门用于暴露一个store对象，整个应用只有一个store对象
 */

// 引入createStore，专门用于创建redux中最为核心的redux对象
import { createStore } from 'redux';

// 引入为后续组件服务的reducer
import Reducer from './reducer';

// 暴露store
export default createStore(Reducer);