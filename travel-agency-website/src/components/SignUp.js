import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const SignUp = () => {

  const [firstname, setFirstname] = React.useState('')
  const [lastname, setLastname] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [dob, setDob] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [password2, setPassword2] = React.useState('')
  const history = useHistory()
  const [selectedValue, setSelectedValue] = useState("USER");

  function UserDropDown({ selectedValue, setSelectedValue }) {



    const handleDropdownChange = (eventKey, event) => {
        setSelectedValue(eventKey);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Dropdown onSelect={handleDropdownChange} className='m-2' style={{width: "100%"}}>
                <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{width: "100%"}}>
                    {selectedValue}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                        <Dropdown.Item key="0" eventKey="USER" >USER</Dropdown.Item>
                        <Dropdown.Item key="1" eventKey="AGENT">AGENT</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}


  const handleSubmit = (e) => {
    e.preventDefault()
    if(password === password2) {
    fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstname,
        lastName: lastname,
        email,
        dateOfBirth: dob,
        password,
        type: selectedValue
      })
    })
    .then(res => res.json())
    .then(data => {
        history.push('/login', data)
    })
    .catch(err => console.log(err))

    console.log('form submitted')
  }
}

  return (
    <>
      <section className='showcase login'>
        <div className='showcase-overlay'>
          <form className='form-controls'>
            <input
              type='text'
              name='firstname'
              id='firstname'
              placeholder='First Name'
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
             <input
              type='text'
              name='lastname'
              id='lastname'
              placeholder='Last Name'
              onChange={(e) => setLastname(e.target.value)}
              required
            />
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Your email address'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
             <input
              type='date'
              name='dob'
              id='dob'
              placeholder='Date of Birth'
              onChange={(e) => setDob(e.target.value)}
              required
            />
            
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Choose your password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type='password'
              name='password2'
              id='password2'
              placeholder='Confirm your password'
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
            <UserDropDown  selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
            <button type='submit' onClick={handleSubmit}>Create Your Account</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default SignUp
