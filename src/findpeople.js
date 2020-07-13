import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FindPeople(props) {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState("");
    const [users, setUsers] = useState([]);

    useEffect((event) => {
        axios.get("/users").then((response) => {
            console.log("RECENT USERS: ", response.data);
            setUsers(response.data);
        });
    }, []);

    useEffect(() => {
        let abort;
        if (search != "") {
            (async () => {
                const { data } = await axios.get(`/results/${search}.json`);
                if (!abort) {
                    setResults(data);
                    console.log("SEARCH RESULTS: ", results);
                    console.log("SEARCH: ", search);
                }
            })();
        }
        return () => {
            abort = true;
        };
    }, [search]);

    if (search == "") {
        return (
            <div>
                <div className="find-people">
                    <h1>Find People</h1>
                    <h3>Check out who just joined</h3>
                </div>
                <div className="users-container">
                    {users.map((each, index) => (
                        <Link key={index} to={`/user/${each.id}`}>
                            <div className="user">
                                <p className="name">
                                    {each.first} {each.last}
                                </p>
                                <img
                                    src={each.imgurl || "/notyet.png"}
                                    className="res-avatar"
                                />
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="search">
                    <h3>Are you looking for someone in particular?</h3>
                    <input
                        type="text"
                        placeholder="Search for Users"
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div className="find-people">
                    <h1>Find People</h1>
                    {(results.length > 0 && (
                        <h3>Your search results for "{search}"</h3>
                    )) ||
                        (!results.length && (
                            <h3 className="error">
                                No matching results for "{search}"
                            </h3>
                        ))}
                </div>
                {(results.length != 0 && (
                    <div className="results-container">
                        {results.map((each, index) => (
                            <Link key={index} to={`/user/${each.id}`}>
                                <div className="user">
                                    <p className="name">
                                        {each.first} {each.last}
                                    </p>
                                    <img
                                        src={each.imgurl || "/notyet.png"}
                                        className="res-avatar"
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                )) ||
                    (!results.length && (
                        <div className="results-container">
                            <img
                                className="no-results-img"
                                src="/nojobsfound.png"
                            />
                        </div>
                    ))}

                <div className="search">
                    <h3>Are you looking for someone in particular?</h3>
                    <input
                        type="text"
                        placeholder="Search for Users"
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>
            </div>
        );
    }
}
