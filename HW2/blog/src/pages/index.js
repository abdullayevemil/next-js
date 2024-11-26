import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Categories({ categories }) {
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

export async function getStaticProps() {
  const res = await axios.get("http://localhost:4000/categories");

  return {
    props: {
      categories: res.data,
    },
  };
}
