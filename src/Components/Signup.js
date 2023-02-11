import React ,{useState}from 'react'
import { useNavigate } from 'react-router-dom';
export default function Signup(props) {
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    const navigate = useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const {name,email,password}=credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({name,email,password}) // body data type must match "Content-Type" header
        });
        const json = await response.json()
        console.log(json)
        if (json.success){
            localStorage.setItem('token',json.authToken);
            // history("/");
            navigate('/')
            props.showAlert("Succesfully account created","success")

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
        <h2>Create an acocount to  use iNotebook</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" name="email"onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" name="password"onChange={onChange}  minLength={5} placeholder="Password" required/>
        </div>
        <div className="form-group">
            <label htmlFor="cpassword">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" onChange={onChange} name ="cpassword"placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}
