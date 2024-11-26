import axios from "axios";
import Link from "next/link";

export default function CategoryDetails({ category, posts }) {
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
                  <Link href={`/category/${category.id}/post/${id}`}>
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

export async function getStaticPaths() {
  const categoriesResponse = await axios.get(
    `http://localhost:4000/categories`
  );

  const paths = categoriesResponse.data.map((category) => {
    return {
      params: {
        categoryId:  `${category.id}`,
      }
    }
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const categoryResponse = await axios.get(
    `http://localhost:4000/categories?id=${params.categoryId}`
  );

  const postsResponse = await axios.get(
    `http://localhost:4000/posts?categoryId=${params.categoryId}`
  );

  return {
    props: {
      category: categoryResponse.data,
      posts: postsResponse.data,
    },
  };
}
