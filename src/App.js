import PageContainer from "./pages/PageContainer";
import { HashRouter } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <PageContainer />
    </HashRouter>
  );
}

export default App;