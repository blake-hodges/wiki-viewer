import React, { useState } from 'react';

function App() {
    const [searchQuery, setSearchQuery] = useState("");
    const [data, setData] = useState([
        {
            title: "Entries",
            snippet: "Please wait for entries"
        }
    ]);
    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    }
    let entries = [];
    const fetchData = (e) => {
        e.preventDefault();
        console.log(searchQuery)
        let url = "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=" + searchQuery.toString();
        fetch(url)
            .then(response => response.json())
            .then(myJson => {
                console.log(myJson);
                let myData = myJson.query.search;
                let map1 = myData.map(item => {
                    let myObj = {};
                    myObj.title = item.title;
                    myObj.snippet = item.snippet;
                    return myObj;
                })
                setData(map1);

            })

    };



    return (
    <div>
        <h1>Wikipedia Viewer</h1>
        <a href="https://en.wikipedia.org/wiki/Special:Random" target="_blank" rel="noreferrer">Random Wikipedia Page</a>
        <form>
            <label htmlFor="search">Search</label>
            <input type="text" id="search" name="search" onChange={handleChange} />
            <button onClick={fetchData}>Submit</button>
        </form>
        <p>{searchQuery}</p>
        <div>
            {data.map(item => {
                return(
                <div key={item.title}>
                    <h3>{item.title}</h3>
                    <p dangerouslySetInnerHTML={{__html: item.snippet}}></p>
                </div>
                )
            })}
        </div>
    </div>
  );
}



export default App;
