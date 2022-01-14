import React, { useState } from 'react';

function App() {
    const [searchQuery, setSearchQuery] = useState("");
    const [data, setData] = useState([]);
    const [message, setMessage] = useState("Enter a term below to search wikipedia.")
    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    }
    const fetchData = () => {
        let searchQueryString = searchQuery.toString();
        let url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${searchQueryString};`
        fetch(url)
            .then(response => response.json())
            .then(myJson => {
                console.log(myJson);
                let myData = myJson.query.search;
                console.log(myData);
                    let map1 = myData.map(item => {
                    let myObj = {};
                    let str = item.snippet.replace(/(<span class="searchmatch">|<\/span>|&quot;)/gi, "");
                    //console.log(str);
                    myObj.title = item.title;
                    myObj.snippet = str + "...";
                    //myObj.snippet = item.snippet;
                    myObj.id = item.pageid;
                    return myObj;
                })
                setData(map1);
            })
            .catch(err => {
                setData({
                    error: "There was an error with your internet connection"
                });
            });

    };

    const handleClick = (e) => {
        e.preventDefault();
        if (searchQuery !== "") {
            fetchData();
        } else {
            setMessage("Please enter a search term below.")
        }
    }



    return (
    <div className="wrapper">
        <div className="search">
            <h1>Wikipedia Viewer</h1>
            <p>{message}</p>
            <Form handleClick={handleClick} fetchData={fetchData} handleChange={handleChange}/>
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
            <button onClick={props.handleClick}>Submit</button>
        </form>
    )
}

const Entries = (props) => {
    if (props.data.length === 0) {
        return (
            <div className="empty-search">
                <h3>No entries</h3>
                <p>Submit a search in the box to the left.</p>
            </div>
        )
    } else if (props.data.error != null) {
        return (
        <div className="empty-search">
            <h3>Error</h3>
            <p>{props.data.error}</p>
        </div>
        )
    } else {

        let entryList = props.data.map(item => {
            let url = 'https://en.wikipedia.org/?curid=' + item.id;
            return (

                <a key={item.title} href={url} target="_blank" rel="noreferrer">
                    <div className="entry">
                        <h3>{item.title}</h3>
                        <p>{item.snippet}</p>
                    </div>
                </a>

            )
        })
        return (
            <div>
                {entryList}
            </div>
        )
    }

}

export default App;
