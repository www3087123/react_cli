import React from "react"
import { Route, Routes, useRoutes } from "react-router-dom"
const HomePage = React.lazy(() => import(/* webpackChunkName: "home" */"../pages/home/HomePage"))
const AboutPage = React.lazy(() => import(/* webpackChunkName: "about" */"../pages/about/AbouPage"))
export default function IndexRouter() {
    return <>
        <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/home" element={<HomePage />}></Route>
                <Route path="/about" element={<AboutPage />}></Route>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="*" element={<div>404</div>}></Route>
            </Routes>
        </React.Suspense>


    </>
}
