import React from "react";
import { FaEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import axios from "axios";



const Cards = ({modal,setModal, tasks, setTasks,updatedTask, setUpdatedTask, setReadOnly}) => {
const deleteTask = async (id) => {
  try {
    await axios.delete(`http://localhost:1000/api/delete-task/${id}`)
    
    setTasks(tasks.filter(task => task._id !== id));
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

const handleUpdate = (id, title, desc) =>{
  setModal("fixed");
  setUpdatedTask({id: id, title: title,desc: desc});
  setReadOnly(false);
  
}
const handleView = (id, title, desc) => {
  setModal("fixed");
  setUpdatedTask({ id, title, desc });
  setReadOnly(true);
  

};
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {tasks && tasks.map((items, i) => (
        <div key={items._id || i} className="flex flex-col justify-between bg-gray-800 rounded-xl p-4">
          <div>
            <h3 className="font-semibold text-xl">{items.title}</h3>
            <p className="text-gray-300 my-2">{items.desc}</p>
          </div>
          <div className="mt-4 w-full flex">
            <div className="w-full flex justify-around text-xl font-semibold">
                <button onClick={() => handleView(items._id, items.title, items.desc)}><FaEye /></button>
                <button onClick={()=> handleUpdate(items._id, items.title, items.desc)}><FaRegEdit /></button>
                <button onClick={() => deleteTask(items._id)}><MdOutlineDeleteOutline /></button>
                
            </div>
          </div>
        </div>
      ))}
      <button onClick={()=>{
        setModal("fixed");
        setUpdatedTask({ id: "", title: "", desc: "" });
        setReadOnly(false);
        
      }} className="flex flex-col justify-center items-center bg-gray-800 rounded-xl p-4 hover:scale-105 hover:cursor-pointer transition-all duration-300">
        
        <IoAddCircleOutline className="text-3xl"/>
        <h2 className="text-2xl text-gray-300"> Add Task </h2>
      </button>
    </div>
  );
};

export default Cards;
