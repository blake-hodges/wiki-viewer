import React, { useState } from 'react';

function App() {
    const [searchQuery, setSearchQuery] = useState("");
    const [data, setData] = useState([
        {
            title: "No entries",
            snippet: "Submit a search in the box to the left."
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
                    myObj.id = item.pageid;
                    return myObj;
                })
                setData(map1);

            })

    };



    return (
    <div className="wrapper">
        <div className="search">
            <h1>Wikipedia Viewer</h1>
            <p>Enter a term below to search wikipedia.</p>
            <Form handleChange={handleChange} fetchData={fetchData} />
            <p>Click <a href="https://en.wikipedia.org/wiki/Special:Random" target="_blank" rel="noreferrer">here</a> to discover a new page on Wikipedia.</p>
        </div>
        <div className="entries">
            <Entries data={data}/>
        </div>
    </div>
  );
}

const Form = (props) => {
    return (
        <form className="form">
            <label htmlFor="search">Search</label>
            <input type="text" id="search" name="search" onChange={props.handleChange} />
            <button onClick={props.fetchData}>Submit</button>
        </form>
    )
}

const Entries = (props) => {
    return (
    <div>
    {/*render data depending on if request data has been received*/}
        {props.data.map(item => {
            let url = 'https://en.wikipedia.org/?curid=' + item.id;
            if (props.data) {

            } else {

            }
            return(

                <a key={item.title} href={url} target="_blank" rel="noreferrer">
                    <div className="entry">
                        <h3>{item.title}</h3>
                        <p dangerouslySetInnerHTML={{__html: item.snippet + "..."}}></p>
                    </div>
                </a>

            )
        })}
    </div>
    )
}

export default App;
