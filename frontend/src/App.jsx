import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");


  useEffect(()=>{
    fetchBooks();
  },[])
  const fetchBooks = async()=>{
    try{
      const response = await fetch("http://127.0.0.1:8000/api/books/");
      if(!response.ok){
        console.log("Error fetching")
      }else{
        const data= await response.json();
        setBooks(data);
      }

    }catch(err){
      console.log(err);
    }

    
  }
  const addBook = async()=>{
    const bookData={
      title,
      release_year:releaseYear,
    }
    const response = await fetch("http://127.0.0.1:8000/api/books/create/",{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(bookData)

    })
    const data = await response.json();
    console.log(data);
    setBooks(b=>[...b,data]);
    setTitle('')
    setReleaseYear('');
  }
  

  return (
    <>
      <h1>Book Website</h1>
      <div>
        <input type="text" placeholder='book title..' value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="number" placeholder='release year...' value={releaseYear} onChange={(e) => setReleaseYear(Number(e.target.value))}/>
        <button onClick={addBook}>Add Book</button>
      </div>
      {books.map((book)=>
        <div key={book.id}>
          <p>Title:{book.title}</p>
          <p>releaseYear:{book.release_year}</p>
        </div>
      )}
    </>
  )
}

export default App
