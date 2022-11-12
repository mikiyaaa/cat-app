// import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {

  const fetchCatImage = async () => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const result = await res.json();
    // console.log(result[0]);
    return result[0];
  }

  const handleClick = async () => {
    const catImage = await fetchCatImage();
    console.log(catImage);
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
      <img src='https://cdn2.thecatapi.com/images/ebv.jpg' 
        style={{
          display: "block",
          width: "400px",
          height: "60%",
          margin: "100px"
        }}
      />
      <button onClick={handleClick}>Today's Cat</button>
    </div>
  )
}
