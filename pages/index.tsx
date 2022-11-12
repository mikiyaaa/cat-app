// import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import styles from '../styles/Home.module.css'

import type { GetServerSideProps } from 'next';

interface SearchCatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface IndexPageProps {
  initialImageUrl: string;
}

const fetchCatImage = async ():Promise<SearchCatImage> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const result = await res.json();
  // console.log(result[0]);
  return result[0];
}

export default function Home({ initialImageUrl }: IndexPageProps) {

  const [imageUrl, SetImageUrl] = useState(initialImageUrl);


  const handleClick = async () => {
    const catImage = await fetchCatImage();
    SetImageUrl(catImage.url);
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh"
    }}>
      <h1>CAT API APP</h1>
      <img src={imageUrl}
        style={{
          display: "block",
          width: "400px",
          margin: "20px"
        }}
      />
      <button onClick={handleClick}>Today's Cat</button>
    </div>
  )
}

// SSR（サーバーサイドレンダリング）
export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  const catImage = await fetchCatImage();

  return {
    props: {
      initialImageUrl: catImage.url,
    }
  }
};