import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';


export default function Login(props) {
    const [credentials, setCredentials] = useState({email:"",password:""
    })
    // let history = useNavigate();
    const navigate = useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}) // body data type must match "Content-Type" header

          });
          const json = await response.json()
          console.log(json)
          if (json.success){
                localStorage.setItem('token',json.authToken);
                // history("/");
                props.showAlert("Login successfully","success")
                navigate('/')

          }
          else{
            props.showAlert("invalid credential","danger")

          }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }
  return (
    <div className='container mt-2'>
       <h2 >Login to continue to iNotebook</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" value={credentials.email} id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange}/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" value={credentials.password} id="password" name="password" placeholder="Password" onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}
