import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = (props) => {

  const [credentials, setCredentials] = useState({name:"",email: "", password: "",cpassword:""}) 
      let history = useNavigate();

      const handleSubmit = async (e) => {
          e.preventDefault();
          if (credentials.password !== credentials.cpassword) {
            props.showAlert('Passwords do not match', 'danger');
            return;
          }
          const response = await fetch("http://localhost:5000/api/auth/createuser", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({name:credentials.name,email: credentials.email, password: credentials.password})
          });
          const json = await response.json()
          console.log(json);
          if (json.success){
              // Save the auth token and redirect
              localStorage.setItem('token', json.authtoken);
              
              props.showAlert(" signup successfully", "success");
              history('/login')

          }
          else{
            props.showAlert(" invalid cradentials", "danger");

          }
        
      }
    const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
  return (
    <div className="container mt-5">
      
        <h2 >login to continue iNoteBook</h2>
     <form onSubmit={handleSubmit}>
     <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              value={credentials.name}
              id="name"
              name="name"
              onChange={onChange}
              minLength={5}
              required
              
            />
            </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              value={credentials.email}
              id="email"
              name="email"
              onChange={onChange}
              aria-describedby="emailHelp"

            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={credentials.password}
              name="password"
              id="password"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              onChange={onChange}
              name="cpassword"
              id="cpassword"
              minLength={5}
              required
              
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Sign UP
          </button>
        </form>

  </div>
  )
}

export default Signup