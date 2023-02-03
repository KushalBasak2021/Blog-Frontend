import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

const Write = () => {
  const { user } = useContext(Context);

  const [post, setPost] = useState({
    title: "",
    desc: "",
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setPost((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newPost = {
      title: post.title,
      desc: post.desc,
      username: user.username,
    };

    // console.log(newPost);

    if (file) {
      // const data = new FormData();
      // const filename = Date.now() + file.name;
      // data.append("name", filename);
      // data.append("file", file);

      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);
            // addProduct(product, dispatch);
            newPost = { ...newPost, photo: downloadURL };
            // console.log(newPost);
            const postBlog = async () => {
              try {
                const res = await axios.post(
                  "https://blog-app-backend-pgpv.onrender.com/api/posts",
                  newPost
                );
                console.log(res);
                window.location.replace(`/`);
              } catch (err) {
                console.log(err);
              }
            };
            postBlog();
          });
        }
      );
    } else {
      try {
        const res = await axios.post(
          "https://blog-app-backend-pgpv.onrender.com/api/posts",
          newPost
        );
        console.log(res);
        window.location.replace(`/`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            name="title"
            value={post.title}
            onChange={handleChange}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            name="desc"
            value={post.desc}
            onChange={handleChange}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default Write;
