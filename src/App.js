import PageContainer from "./pages/PageContainer";
import Login from "./pages/login/Login";
import Sign from "./pages/sign/Sign";
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} exact/>
        <Route path="/sign" element={<Sign />} exact/>
        <Route path="*" element={<PageContainer />} exact/>
      </Routes>
    </HashRouter>
  );
}

export default App;