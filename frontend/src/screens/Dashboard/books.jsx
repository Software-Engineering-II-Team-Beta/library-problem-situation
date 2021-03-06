import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";

import {useSelector} from "react-redux";

import * as api from "../../services/api/index";

import CardBook from "../../components/CardBook";

function Books() {
    const history = useHistory("");
    const {user, token} = useSelector((state) => state.session);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const {data} = await api.book._my({token: token});

            setBooks(data);
        };

        fetchBooks();
    }, []);

    // event of logout button
    async function handleLogout() {
        try {
            const data = await api.auth._logout();
            console.log(data);
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    const h2style = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "100px",
        color: "white",
    };

    const greycircle = {
        backgroundColor: "#a9aeb3",
        width: "128px",
        height: "128px",
        borderRadius: "50%",
    };

    const greencircle = {
        backgroundColor: "#00ff00",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        marginRight: "20px",
    };

    const separator = {
        backgroundColor: "#d9e0e6",
        width: "100%",
        height: "5px",
    };

    const h3style = {
        display: "flex",
        paddingLeft: "10%",
        color: "white",
        marginTop: "20px"
    };

    const astyle = {
        textDecoration: "none",
        // color: "white"
    };

    return (
        <div className="dashboard">
            <div className="sidebar">
                <div className="profilepicture">
                    <div style={greycircle}></div>
                </div>
                <h2 style={h2style}>
                    {" "}
                    <div style={greencircle} />{" "}
                    {user.email ? user.email : 'janedoe@fake.com'}
                </h2>
                <h3 style={h3style} ><a href="/dashboard/books" style={astyle}>Meus livros</a></h3>
                <div style={separator} />
                <h3 style={h3style} ><a href="/dashboard/loans" style={astyle}>Empr??stimos</a></h3>
                <div style={separator} />
                <h3 style={h3style} ><a href="/dashboard/reviews" style={astyle}>Avalia????es</a></h3>
                <div style={separator} />
                <h3 style={h3style} ><a href="/dashboard/groups" style={astyle}>Meus Grupos</a></h3>
                <div style={separator} />
                <h3 style={h3style} ><a href="/dashboard/tags" style={astyle}>Etiquetas</a></h3>
                {/* <input type="button" onClick={handleLogout} value="Logout" /> */}
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    boxSizing: "border-box",
                    alignItems: "center",
                    // justifyContent: "center",
                    width: "100%",
                    height: "100%",
                }}
            >
                <h2
                    style={{
                        color: "black",
                        width: "85%",
                        marginTop: '3%',
                    }}
                >
                    Livros
        </h2>
                <div
                    style={{
                        backgroundColor: "#a9aeb3",
                        display: "flex",
                        width: "85%",
                        height: "5px",
                    }}
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        height: "100%",
                        overflowY: "auto",
                    }}
                >
                    {/* {books !== undefined &&
                        books.map((book, index) => <CardBook key={index} book={book} />)} */}

                    <div className="content">
                        <div className="list-books" style={{height: "auto"}}>
                            {books !== undefined &&
                                books.map((book, index) => (
                                    <CardBook key={index} book={book} setBooks={setBooks} showButtons={true} />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Books;
