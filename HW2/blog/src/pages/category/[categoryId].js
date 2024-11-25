import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import NotFound from "./[...slug]";

export default function CategoryDetails({ categoryId }) {
  const [category, setCategory] = useState({});

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      (async () => {
        const categoryResponse = await axios.get(
          `http://localhost:4000/categories?id=${categoryId}`
        );

        setCategory(categoryResponse.data[0]);

        const postsResponse = await axios.get(
          `http://localhost:4000/posts?categoryId=${categoryId}`
        );

        setPosts(postsResponse.data);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      {category && posts ? (
        <div>
          <h1>{category.name}</h1>

          <br></br>

          <ul>
            {posts.map(({ id, title }) => {
              return (
                <li key={id}>
                  <Link href={`/category/${categoryId}/post/${id}`}>
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>
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
      categoryId: query.categoryId,
    },
  };
}
