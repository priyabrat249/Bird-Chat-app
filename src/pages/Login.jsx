
function Register() {
    return (
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">BIRD</span>
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
  