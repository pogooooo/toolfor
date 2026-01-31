import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Sidebar from './components/SideBar.jsx'
import ToolFor from './pages/ToolFor.jsx'
import FantasyNameGenerator from './pages/generators/FantasyNameGenerator.jsx'

import {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

    const [headerInfo, setHeaderInfo] = useState("")

    const updateHeaderInfo = (info) => {
        setHeaderInfo(info)
    }

    return (
        <Router className="app">
            <div className="display">
                <Sidebar></Sidebar>
                <div className="content">
                    <Header headerInfo={headerInfo} />
                    <Routes>
                        <Route path="/" element={<ToolFor updateHeaderInfo={updateHeaderInfo} />}></Route>
                        <Route path="/fantasyNameGenerator" element={<FantasyNameGenerator updateHeaderInfo={updateHeaderInfo} />}></Route>
                    </Routes>
                </div>
            </div>
        </Router>
    )
}

export default App
