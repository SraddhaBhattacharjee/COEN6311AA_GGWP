import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:8080/users/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
      })
    })
    .then(res => res.json())
    .then(data => {
        history.push('/home', data)
    })
    .catch(err => console.log(err))

    console.log('form submitted')
}

  return (
    <>
      <section className='showcase login'>
        <div className='showcase-overlay'>
          <form className='form-controls'>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Your email address'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input type='password' name='password' id='password' 
            placeholder='Password' required  onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit' onClick={handleSubmit}>Log In</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Login
