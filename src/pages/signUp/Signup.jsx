import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { auth } from "../../Firebase/Config";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../../components/Loading/Loading";
import Error404 from '../Error404/Error404';

const Signup = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [hasError, setHasError] = useState(false);
  const [fireBaseError, setFireBaseError] = useState("");

    // (sign in && verified email) => navigate(/)
    useEffect(() => { 
      if (user) {
        if (user.emailVerified) {
          navigate("/");
        }
      }
    });
  const signUpBtn = (e) => { 
    e.preventDefault();
                createUserWithEmailAndPassword(auth, email, password)
                  .then((userCredential) => {
                    // Signed up
                    const user = userCredential.user;
                    console.log(user);
                    sendEmailVerification(auth.currentUser).then(() => {
                      console.log("Email verification sent!");
                    });
                    updateProfile(auth.currentUser, {
                      displayName: userName,
                    })
                      .then(() => {
                        navigate("/");
                      })
                      .catch((error) => {
                        console.log(error);
                      });

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

  // loading
  if (loading) {
    return (
      <Loading/>
    );
  }
  // error
  if (error) {
    return(
      <Error404 />
    )
  }

  // sign in without email verification
  
if(user){
  if (!user.emailVerified) {
    return (
          <div>
            <Header />
            <main>
              <p>we send you an email to verify your account</p>
              <button className="delete">send again</button>
            </main>
            <Footer />
          </div>
        );
  }
}


  // not sign in
  if (!user) {
    return (
      <>
        <Helmet>
          <title>Signup Page</title>
          <meta name="description" content="Signup" />
        </Helmet>
        <Header />
        <main>
          <form>
            <p style={{ fontSize: "23px", marginBottom: "22px" }}>
              Create a new account <span>🧡</span>{" "}
            </p>
            <input
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              required
              type="text"
              placeholder="UserName:"
            />
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
                signUpBtn(e);
              }}
            >
              Sign up
            </button>
            <p className="account">
              Already have an account <Link to="/signin">Sign-in</Link>
            </p>
            {hasError && <h5>{fireBaseError}</h5>}
          </form>
        </main>
        <Footer />
      </>
    );
  }

};

export default Signup;
