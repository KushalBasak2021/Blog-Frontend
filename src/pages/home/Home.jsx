import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import ClipLoader from "react-spinners/ClipLoader";
import "./home.css";

import axios from "axios";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(
        "https://blog-app-backend-pgpv.onrender.com/api/posts" + search
      );
      // console.log(res.data);
      setPosts(res.data);
      setLoading(false);
    };

    fetchPost();
  }, [search]);

  console.log(loading);

  return (
    <>
      {loading ? (
        <div className="loader">
          <ClipLoader />
        </div>
      ) : (
        <>
          <Header />
          <div className="home">
            <Posts posts={posts} />
            <Sidebar />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
