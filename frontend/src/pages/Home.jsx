import React from 'react';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col gap-4">
        <div className="  rounded-xl p-4 flex flex-col justify-between">
        
        <div>
        <h2 className="my-2 text-4xl font-semibold flex justify-center">Task Manager</h2>
        <hr />
      </div>
        </div>
        <div className="border border-gray-500 rounded-xl p-4"><Outlet/></div>
    </div>
    
  );
}

export default Home;