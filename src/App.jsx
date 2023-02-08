import React from "react"
import IndexRouter from "./router/IndexRouter"
import { Link } from "react-router-dom"
export default function App() {
    return <>
        <ul>
            <li>
                <Link to="/home">home</Link>
            </li>
            <li>
                <Link to="/about">about</Link>
            </li>
        </ul>
        <IndexRouter />

    </>
}