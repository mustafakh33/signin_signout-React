import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./profile.css";
import { Helmet } from "react-helmet-async";

import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/Config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import {deleteUser } from "firebase/auth";
import Moment from "react-moment";
import Loading from "../../components/Loading/Loading";
const Profile = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
    if (user) {
      if (!user.emailVerified) {
        navigate("/");
      }
    }
  });
  const DeleteBTN = () => {
    deleteUser(user).then(() => {
      // User deleted.
    }).catch((error) => {
      // An error ocurred
      // ...
    });
  }

  if (loading) {
    return (
      <Loading/>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    return (
      <>
        <Helmet>
          <title>Profile Page</title>
          <meta name="description" content="prfile" />
        </Helmet>
        <Header />

        <main className="profile">
          <h6>Email: {user.email}</h6>
          <h6>UserName: {user.displayName}</h6>
          <h6>
            Last Sign-in:{" "}
            <Moment ago fromNow date={user.metadata.lastSignInTime} />
          </h6>
          <h6>
            Account Created:{" "}
            <Moment fromNow date={user.metadata.creationTime} />
          </h6>
          <button
          onClick={()=>{
            DeleteBTN();
          }}
            className="delete"
          >
            Delete account
          </button>
        </main>
        <Footer />
      </>
    );
  }
};

export default Profile;
