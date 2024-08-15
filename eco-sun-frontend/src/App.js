import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './componants/Home';
import Login from './componants/Login';
import Signup from './componants/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
