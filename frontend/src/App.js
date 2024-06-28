import React from 'react';
import Home from './pages/Home';
import AllTasks from "./pages/AllTasks";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <div className='bg-gray-900 text-white min-h-screen p-2 relative'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<AllTasks />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App