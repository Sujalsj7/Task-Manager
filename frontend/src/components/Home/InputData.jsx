import React, { useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const InputData = ({ modal, setModal, setTasks, updatedTask, setUpdatedTask, readOnly }) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setTitle(updatedTask.title);
        setDesc(updatedTask.desc);
    }, [updatedTask]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "title") {
            setTitle(value);
        } else if (name === "desc") {
            setDesc(value);
        }
    };

    const handleSubmit = async () => {
        if (!title || !desc) {
            setError('Both fields are required.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:1000/api/create-task`, { title, desc });
            const newTask = response.data.task;
            setTasks(prevTasks => [...prevTasks, newTask]);
            setTitle('');
            setDesc('');
            setModal('hidden');
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const handleUpdate = async () => {
        if (!title || !desc) {
            setError('Both fields are required.');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:1000/api/update-task/${updatedTask.id}`, { title, desc });
            const updatedTaskData = response.data;
            setTasks(prevTasks => prevTasks.map(task => task._id === updatedTaskData._id ? updatedTaskData : task));
            setTitle('');
            setDesc('');
            setModal('hidden');
            setUpdatedTask({  title: "", desc: "" });
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <>
            <div className={`${modal} top-0 left-0 bg-gray-800 opacity-50 h-screen w-full`}></div>
            <div className={`${modal} top-0 left-0 flex items-center justify-center h-screen w-full`}>
                <div className="w-3/6 bg-gray-900 h-[50vh] p-4 rounded">
                    <div className="my-1 flex justify-end text-2xl">
                        <button
                            onClick={() => {
                                setModal("hidden");
                                setUpdatedTask({  title: "", desc: "" });
                            }}
                        >
                            <RxCross2 />
                        </button>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={title}
                        onChange={handleInputChange}
                        className="px-3 py-2 rounded w-full bg-gray-700 my-2"
                        disabled={readOnly}
                    />
                    <textarea
                        name="desc"
                        cols={5}
                        rows={5}
                        placeholder="Enter Description"
                        value={desc}
                        onChange={handleInputChange}
                        className="px-3 py-2 rounded w-full bg-gray-700"
                        disabled={readOnly}
                    ></textarea>
                    <div className="w-full flex justify-center">
                        {!readOnly && (
                            <>
                                {updatedTask.id === "" ? (
                                    <button onClick={handleSubmit} className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold my-2">
                                        Submit
                                    </button>
                                ) : (
                                    <button onClick={handleUpdate} className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold my-2">
                                        Update
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default InputData;
