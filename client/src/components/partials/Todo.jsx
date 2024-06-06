import moment from 'moment/moment'
import React from 'react'
import { DeleteTodoApi, MarkTodoApi } from '../../services/api.js'
import { ToastContainer, toast } from 'react-toastify';

function Todo({ todo, setrefreshList }) {

    const handleDelete = async () => {
        const result = await DeleteTodoApi({
            todo_id: todo._id
        })

        if (result.data.status === 200) {

            setrefreshList(new Date())
            toast('Deleted Successfully');
        }
        else {
            toast('Failed to Delete, please try again..');
        }
    }

    const handleMarkTodo = async () => {
        const result = await MarkTodoApi({
            todo_id: todo._id
        })

        if (result.data.status === 200) {

            setrefreshList(new Date())
            toast(result.data.message);
        }
        else {
            toast('Failed to Mark, please try again..');
        }
    }



    return (
        <div className="col-sm-3 mx-3 my-2 alert bg-light">

            <div className="card-header" style={{ marginBottom: '10px' }}>
                {todo.isCompleted
                    ? <span style={{ color: 'green', fontWeight: 'bold' }}>Completed</span>
                    : <span style={{ color: 'red', fontWeight: 'bold' }}>Not Completed</span>
                }
            </div>

            <div className="card-body" style={{ padding: '15px' }}>
                <h4 className='card-title' style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '1.2rem',
                    color: '#333',
                    borderBottom: '2px solid #eee',
                    paddingBottom: '5px',
                    marginBottom: '10px',
                    textDecoration: todo.isCompleted ? 'line-through' : 'none'
                }}>
                    {todo.desc}
                </h4>

                <p className='card-text' style={{
                    fontSize: '0.9rem',
                    color: '#666',
                    fontStyle: 'italic',
                    marginTop: '5px'
                }}>
                    {moment(todo.date).fromNow()}
                </p>
            </div>

            <div className='actionButtons' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className='deleteButton'>
                    <button style={{ background: 'grey' }} onClick={handleDelete}>Delete</button>
                </div>
                <div className='markTodo'>
                    <button onClick={handleMarkTodo} style={{ background: '#a86b32' }}> {todo.isCompleted ? 'Mark Uncomplete' : 'Mark Complete'} </button>
                </div>
            </div>

        </div>
    )
}

export default Todo