import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import MainContent from '../../components/MainContent/MainContent';
import { Helmet  } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/Config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from 'react';
import Loading from "../../components/Loading/Loading";
import Error404 from '../Error404/Error404';

const About = () => {
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
    if (user) {
      if (user.emailVerified) {
        
  return (
    <>
         <Helmet>
        <title>HTML Page</title>
        <meta name="description" content="About" />
      </Helmet>
    <Header />
    <MainContent pageName="About Page"  />   
    <Footer />
  </>
  );
      }
    }

}

export default About;
