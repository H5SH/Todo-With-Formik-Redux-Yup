import { React,useState } from 'react'
import { Formik, Form, Field } from 'formik'
import {object, string, date} from 'yup'
import './App.css'
import todosStore from './Redux/todoReducer'
import { addTodo, deleteTodo } from './Redux/todoReducer'


function App() {

  const [refresh, setRefresh] = useState(false)
  
  let todoSchema = object({
    title: string()
    .min(2, "To Short!")
    .max(20, "Too Long!")
    .required("Required"),
    work: string()
    .min(5, "Too Short")
    .max(50, "Too Long")
    .required("Required"),
    date: date().default()
  })

  console.log(todosStore.getState())

  function del(todo){
    todosStore.dispatch(deleteTodo(todo))
    setRefresh(!refresh)
  }

  return (
    <>
      <div>
        <h3>ADD New Todo</h3>
        <Formik
        initialValues={{title: '', work: '', date: ''}}
        validationSchema={todoSchema}
        onSubmit={values => {
          todosStore.dispatch(addTodo(values))
          setRefresh(!refresh)
        }}
        >
          {({errors, touched})=> (
            <Form>
              <Field name='title' />
              {errors.title && touched.title ? (
                <div>{errors.title}</div>
              ): <div>Required</div>}
              <Field name="work" />
              {errors.work && touched.work ? (
                <div>{errors.work}</div>
              ):<div>Required</div>}
              <Field type="date" name="date" />
              {errors.date && touched.work ? (
                <div>{errors.date}</div>
              ):null}
              <button type='submit'>Submit</button>
            </Form>
          )}
        </Formik>
        <h3>Works Todo</h3>
        {refresh ? <div>
         {todosStore.getState().todos.map(todo => (
          <div>
            <h4>{todo.payload.title}</h4>
            <h5>{todo.payload.work}</h5>
            <h5>{todo.payload.date}</h5>
            <button onClick={()=> del(todo.payload)}>Delete</button>
            </div>
        ))}</div>:<div>
        {todosStore.getState().todos.map(todo => (
          <div>
            <h4>{todo.payload.title}</h4>
            <h5>{todo.payload.work}</h5>
            <h5>{todo.payload.date}</h5>
            <button onClick={()=> del(todo.payload)}>Delete</button>
            </div>
        ))}</div>
}
      </div>
    </>
  )
}

export default App
