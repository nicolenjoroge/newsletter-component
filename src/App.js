import { useState } from "react";
import "./App.css";
import * as yup from 'yup';

function App() {
  const [emailData, setEmailData] = useState({
    email: ""
  });

  //form validation and error handling
  const [error, setError] = useState();

  const validateEmail = yup.object ({
    email: yup.string().email().required()
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{ 
      await validateEmail.validate(emailData, {abortEarly:false});
      alert("Email submitted");
    }
    catch (error) {
      const newError = {}

      error.inner.forEach((error) => {
        newError[error.path] = error.message
      });

      setError(newError);
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setEmailData({
      [name] : value
    })
  }
 
  return (
    <div className="card-container">
      <div className="content">
        <div>
          <h1>Level Up Your FrontEnd Skills</h1>
        </div>
        <div>
          <p>
            Sign up for our free newsletter to receive weekly coding challenges
            that will help you improve your frontend development skills
          </p>
        </div>
          <form onSubmit={handleSubmit}>
          <div className="sub">
          <input type="email" placeholder="Enter your email address" name="email" value={emailData.email} onChange={handleChange}/>
          <input type="submit" value="Subscribe" />
          </div>
          </form>
        <div className="check">
          <input type="checkbox" />
          <p>
            By checking this box you agree to receive our weekly newsletter
            containing coding challenges, tips, and other related content. You
            may unsubscribe from the newsletter anytime.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
