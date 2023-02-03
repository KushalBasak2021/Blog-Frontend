import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get(
        "https://blog-app-backend-pgpv.onrender.com/api/categories"
      );
      setCategories(res.data);
    };

    getCategories();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://media.istockphoto.com/id/508379027/photo/fox-glacier-hiking-up-the-glacier-new-zealand.jpg?s=612x612&w=is&k=20&c=rd8Sdzsg5j4UNvZnAEh7Oav9N5q3m3rsplYE35m6f1c="
          alt=""
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
          expedita nobis, officiis non veniam odio ab impedit eos tempore cum
          dolorem repudiandae!
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {categories.map((category, i) => (
            <Link to={`/?cat=${category.name}`} className="link">
              <li className="sidebarListItem" key={i}>
                {category.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
