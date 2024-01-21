import logo from "../img/logo.ico"

function Register() {
    return (
      <div className="formContainer">
        <div className="formWrapper">
        <div className="logo">
            <img src={logo} alt="" />
          </div>
          <span className="title">Log In</span>
          <form>
            <input type="email" placeholder="email"/>
            <input type="password" placeholder="password" />
                    
            <button>Log In</button>
          </form>
          <p>Don't have an  account? Register</p>
        </div>
      </div>
    );
  }
  
  export default Register;
  