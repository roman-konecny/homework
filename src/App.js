import React, {useState} from 'react';
import Axios from 'axios';
import './App.css';
import Table from './components/table'



const App = () => {
  const exampleEmail = "homework@enmon.tech";
  const examplePass = "VerySecretPassword";

  const [loading, setLoading] = useState(false)
  const [proces, setProces] = useState("Loading")
  const [dta, setDta] = useState()

  const login = async () => {

    setLoading(true)
    const payload = JSON.stringify({
      email: exampleEmail,
      password: examplePass
    })

    try {

	setProces("sending request with payload ...")    
      const response = await Axios.post("https://dev.enmon.tech/auth/login", payload ,{
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const accessToken = response.data.accessToken

	setProces("sending token...")
      const data = await Axios.get("https://dev.enmon.tech/api/meters", {
        headers: {
          'authorization': `Bearer ${accessToken}`
        }
      })

  setDta(data.data.result)
	setProces("Data received!")

    }

    catch (error){
      console.log(error) 
    }
    setLoading(false)
  }

  if (dta) {

    return (
      <div className="pre-table">
        <Table props={dta}/>
      </div>
      )

  } else{

    if (loading) {

      return(
        <div className="wrapper">
          <h1>{proces}</h1>
        </div>
    )

    } else{

      return (
        <div className="wrapper">
          <button onClick={login}>Log In</button>
        </div>
      )

    }
  }
}

export default App
