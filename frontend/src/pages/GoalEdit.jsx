import { useState, useEffect } from 'react'
import { useNavigate, useLocation} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateGoal } from '../features/goals/goalSlice'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import {  reset } from '../features/auth/authSlice'



function GoalEdit() {
  const { goals, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.goals
  )
  const [text, setText] = useState('')
  const location = useLocation()
  const { from } = location.state


  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      navigate('/')
      
    }

    
  }, [goals, isError, isSuccess, message, navigate, dispatch])

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(updateGoal(from, { text }))
    dispatch(reset())
    setText('')
    
  }
  if (isLoading) {
    return <Spinner />
  }
  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Edit Goal</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Update Goal
          </button>
        </div>
      </form>
    </section>
  )
}

export default GoalEdit