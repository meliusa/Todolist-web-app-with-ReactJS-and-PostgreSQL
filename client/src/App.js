import ListHeader from './components/ListHeader'
import Auth from './components/Auth'
import { useEffect, useState } from 'react'
import ListItem from './components/ListItem'
import { useCookies } from 'react-cookie'

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  const [tasks, setTasks] = useState(null)
  const [filterCondition, setFilterCondition] = useState('')

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
      const json = await response.json()
      setTasks(json)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (authToken) {
      getData()
    }
  }, [])

  const handleFilter = (condition) => {
    setFilterCondition(condition)
  }

  const filteredTasks = tasks?.filter((task) => task.condition === filterCondition)

  return (
    <div className='app'>
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listName={'TO DO LIST'} getData={getData} />
          
          <div className='user-container'>
            <p className='user-email'>HI! {userEmail}</p>
            <div className='button-container'>
              <button className="condition" onClick={() => handleFilter('progress')}>Progress</button>
              <button className="condition" onClick={() => handleFilter('completed')}>Completed</button>
            </div>
          </div>
          {filteredTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </>
      )}
      <p className='copyright'>COPYLEFT © BY MNH</p>
    </div>
  )
}

export default App
