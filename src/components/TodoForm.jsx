import axios from 'axios'
import React, {  useState } from 'react'
import { server } from '../main'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import TodoItem from './TodoItem'


const TodoForm = () => {
  

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  


  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/todos/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/todos/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/todos`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTitle("");
      setDescription("");
      toast.success(data.message);
      await getallfunTask()
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getallfunTask=async()=>{
await axios.get(`${server}/todos`, {
        withCredentials: true,
      })
      .then((res) => {
        (setTasks(res.data));
      
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }

  useEffect(() => {
    getallfunTask()
  }, [refresh]);

 


  return (
    
    <div className="container mx-auto p-4">
    <div>
      <section className="mb-8">
        <form onSubmit={submitHandler} className="flex items-center">
          <input
            type="text"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mr-2 p-2 rounded border"
          />
          <input
            type="text"
            placeholder="Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mr-2 p-2 rounded border"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Add Task
          </button>
        </form>
      </section>
      </div>

      <section className="todosContainer">
        {tasks && tasks.map((i) => (
          <TodoItem
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
            key={i._id}
          />
        ))}
      </section>
    </div>
    
  );
};

export default TodoForm;