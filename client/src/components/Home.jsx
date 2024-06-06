import React, { useEffect,useState} from 'react'
import Header from './partials/Header.jsx'
import {useNavigate} from 'react-router-dom';
import Todo from './partials/Todo.jsx'
import AddTodoModal from './partials/AddTodoModal.jsx'
import { getTodoListApi, getToken } from '../services/api.js'
import { ToastContainer, toast } from 'react-toastify';


function Home() {
  const navigation = useNavigate();
  const [searchText, setsearchText] = useState("");
  const [list, setlist] = useState([])
  const [refreshList, setrefreshList] = useState()
  const [FilteredList, setFilteredList] = useState([])

    useEffect(() => {
      if(!getToken()){
        navigation('/login');
      }
      fetchTodoList()
    
    }, [refreshList])

    useEffect(() => {
      if(searchText===''){
        setFilteredList(list)
      }
      else{
        const filterList = list.filter(todo => todo.desc.toLowerCase().includes(searchText.toLowerCase().trim()))
        setFilteredList(filterList)
      }
    }, [list,searchText])
    



    async function fetchTodoList(){
      const result = await getTodoListApi();
      // console.log('todolist', result)
      if(result.status === 200 && result.data.status===200){
        setlist(result.data.data.todos.reverse());
      }
    }

  return (
    <div>
      <Header searchText={searchText} setsearchText={setsearchText} />
      <ToastContainer/>
      <div className='container'>
        <div className='row justify-content-md-center mt-4'>
        {
          FilteredList.map((todo)=><Todo todo={todo} key={todo._id} setrefreshList={setrefreshList} />)
        }

        {
          FilteredList.length === 0 && <div className='NotFoundTodos'>
            No todos
          </div>
        }

        </div>
      </div>

      <div className='' style={{ position: 'fixed', right: 50, bottom: 50, zIndex: 1030 }}>
        <button type='button'
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          className='btn btn-outline-light'>
          Add
        </button>
      </div>

     <AddTodoModal setrefreshList={setrefreshList} />
    </div>
  )
}

export default Home