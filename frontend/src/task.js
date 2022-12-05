import React, { useEffect } from 'react';
import axios from 'axios';


const Task = () => {
    const [input, setInput] = React.useState('')
    const [task, getTask] = React.useState([]);
    const getTasklist = () => {
        axios.get('http://localhost:4000/tasks')
        .then(res => res.data)
        .then(data => getTask(data))
    }
    useEffect(() => {
        getTasklist() 
    }, [task]);
    const submitthedata = () => {
     axios.post('http://localhost:4000/addTask', {
        task: input
     })
     getTasklist()
     setInput('');
    }
    const taskdelete = (id) => {
        axios.delete(`http://localhost:4000/deleteTask/${id}`);
        getTasklist();
       
        }
    return (
        <div>
             <form onSubmit={submitthedata}>
                <input value={input} onChange = {e => setInput(e.target.value)}/>
                <button>Submit</button>
             </form>
              {task.map((item) => {
                   return (
                    <div>
                    {item.task}
                    <button onClick={() => taskdelete(item.id)}>delete</button>
                    </div>
                   )
              })}

        </div>
    )
}

export default Task;