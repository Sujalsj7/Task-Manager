import React, { useEffect, useState } from 'react'
import InputData from '../components/Home/InputData';
import Cards from "../components/Home/Cards";
import axios from "axios";


const AllTasks = () => {
    const [modal, setModal] = useState("hidden")
    const [tasks, setTasks] = useState([])
    const [readOnly, setReadOnly] = useState(false);
    const [updatedTask,setUpdatedTask] = useState({
      id:"",
      title:"",
      desc:"",
    });


    useEffect(() => {
      const fetchTasks = async () => {
          try {
              const response = await axios.get(`http://localhost:1000/api/get-tasks`);
              setTasks(response.data);
              console.log(response.data);
          } catch (error) {
              console.error("Error fetching tasks:", error);
          }
      };
      fetchTasks();
  }, [updatedTask]);
    
  return (
    <>
        <div>
            <div className='w-full flex items-end'></div>
            <Cards modal={modal} setModal={setModal} tasks={tasks} setTasks={setTasks} setUpdatedTask={setUpdatedTask} setReadOnly={setReadOnly}/>
        </div>
        <InputData modal={modal} setModal={setModal}  tasks={tasks} setTasks={setTasks}   updatedTask={updatedTask} setUpdatedTask={setUpdatedTask} readOnly={readOnly}/>
    </>
  )
}

export default AllTasks