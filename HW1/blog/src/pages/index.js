import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get("http://localhost:4000/categories");
  
        setCategories(response.data);
      })();
    } catch (error) {
      console.log(error)
    }
  }, []);

  return (
    <div>
      <h1>Categories: </h1>

      <br></br>

      <ul>
        {categories.map(({ id, name }) => {
          return (
            <li key={id}>
              <Link href={`/category/${id}`}>{name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
