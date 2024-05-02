import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signin.css";
import { auth } from "../../Firebase/Config";
const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [resetPass, setResetPass] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [fireBaseError, setFireBaseError] = useState("");
  const [showForm, setShowForm] = useState("");
  const [showSendEmail, setshowSendEmail] = useState(false);
  const forgotPassword = () => {
    setShowForm("show-forgot-password");
  }
  const signInBTN = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        setHasError(true);
        switch (errorCode) {
          case "auth/invalid-email":
            setFireBaseError("Wrong Email");
            break;
          case "auth/user-not-found":
            setFireBaseError("Wrong Email");
            break;
          case "auth/wrong-password":
            setFireBaseError("Wrong Password");
            break;
          case "auth/too-many-requests":
            setFireBaseError(
              "Too many requests, please try aganin later"
            );
            break;
          default:
            setFireBaseError("Please check your email & password");
            break;
        }
      });
  }
  return (
    <>
      <Helmet>
        <title>Signin Page</title>
        <meta name="description" content="Signin" />
      </Helmet>
      <Header />
      <main>
        <form className={`forgot-password ${showForm}`}>
          <div
            onClick={() => {
              setShowForm("");
            }}
            className="close"
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
          <input onChange={(e)=>{setResetPass(e.target.value)}} required type="email" placeholder="E-mail:" />
          <button
            onClick={(e) => {
              e.preventDefault();
              sendPasswordResetEmail(auth, resetPass)
                .then(() => {
                 setshowSendEmail(true);
                  
                })
                .catch((error) => {
                  const errorCode = error.code;
                  console.log(errorCode);
                  // ..
                });
            }}
          >
            Reset email
          </button>
          {showSendEmail && (
            <p className="check-email">
              please check your email to reset your password
            </p>
          )}
        </form>

        <form>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            type="email"
            placeholder="E-mail:"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            type="password"
            placeholder="Password:"
          />
          <button
            onClick={(e) => {
              signInBTN(e)
            }}
          >
            Sign in
          </button>
          <p className="account">
            Don't have an account <Link to="/signup">Sign-up</Link>
          </p>
          <p
            onClick={() => {
              forgotPassword();
            }}
            className="forgot-pass"
          >
            forgot password?
          </p>
          {hasError && <h5>{fireBaseError}</h5>}
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Signin;
