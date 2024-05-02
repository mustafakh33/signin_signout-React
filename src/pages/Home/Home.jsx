import Header from "./../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Firebase/Config";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import Loading from "../../components/Loading/Loading";
import Error404 from '../Error404/Error404';
const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  
  const sendAgain = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("Email verification sent!");
      // ...
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
  // sign in
  if (user) {
    // sign in without email verification
    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOM" />
          </Helmet>

          <Header />

          <main>
            <p>welcome: {user.displayName} <span>🧡</span></p>
            <p>we send you an email to verify your account</p>
            <button onClick={() => {
                sendAgain()
              }} className="delete">send again</button>
          </main>

          <Footer />
        </>
      );
    }
    // (sign in && verified email) => navigate(/)
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOM" />
          </Helmet>

          <Header />

          <main>
            <p>welcome: {user.displayName} <span>🧡</span></p>
          </main>

          <Footer />
        </>
      );
    }
  }
  // not sign in
  if (!user) {
    return (
      <>
        <Helmet>
          <title>HOME Page</title>
          <meta name="description" content="HOME" />
        </Helmet>

        <Header />
        <main>
          <p className="pls">
            Please{" "}
            <Link style={{ fontSize: "30px" }} to="/signin">
              sign in
            </Link>{" "}
            to continue... <span>🧡</span>
          </p>
        </main>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Helmet>
        <title>HOME Page</title>
        <meta name="description" content="HOMEEEEEEEEEEEE" />
      </Helmet>

      <Header />

      {user && (
        <main>
          welcome: {user.displayName} <span>🧡</span>
        </main>
      )}

      {!user && (
        <main>
          <p className="pls">
            Please{" "}
            <Link style={{ fontSize: "30px" }} to="/signin">
              sign in
            </Link>{" "}
            to continue... <span>🧡</span>
          </p>
        </main>
      )}

      <Footer />
    </>
  );
};

export default Home;
