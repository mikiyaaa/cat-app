import { useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Dimmer, Loader } from 'semantic-ui-react'

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
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const catImage = await fetchCatImage();
    setImageUrl(catImage.url);

    setIsLoading(false);
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
      {/* Loadingか画像か */}
      {
        isLoading ? (
          <Dimmer active>
            <Loader size='big'>Loading</Loader>
          </Dimmer>
        ) : (
          <img src={imageUrl}
            style={{
              display: "block",
              width: "400px",
              margin: "20px"
            }}
          />
          )
        }
      <button onClick={handleClick}>Today`s Cat</button>
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