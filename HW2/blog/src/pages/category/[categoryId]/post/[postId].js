import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PostDetails({ postId }) {
  const [post, setPost] = useState([]);

  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get(
          `http://localhost:4000/posts?id=${postId}`
        );

        setPost(response.data[0]);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      {post ? (
        <div>
          <h1>{post.title}</h1>

          <br></br>

          <h3>{post.description}</h3>

          <br></br>

          <h4>{post.text}</h4>
        </div>
      ) : (
        <h1>Such category or post does not exist</h1>
      )}
    </div>
  );
}

export async function getServerSideProps({ query }) {
  return {
    props: {
      postId: query.postId,
    },
  };
}
