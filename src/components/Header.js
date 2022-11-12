import React, { useEffect, useState } from 'react';
import { Button, Nav } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { connectWallet } from '../utils'


const Header = ({ }) => {

    const [isWalletConnected, setIsWalletConnect] = useState(false);
    const [walletId, setWalletId] = useState("");



    async function handleConnectWallet() {
        console.log("connecting to wallet...");
        try {
            let res = await connectWallet()
            console.log('connected wallet res:', res);

            setWalletId(res['walletId'])
            setIsWalletConnect(true)
        } catch (err) {
            console.log(err);
        }
    }
    return (

        <nav className="navbar fixed-top navbar-expand-lg navbar-dark p-md-3">
            <div className="container">
            <Nav.Link as={Link} to="/"className="navbar-brand fs-3" href="emissions"><strong> Emisyon Zinciri</strong></Nav.Link >
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="mx-auto"></div>
                    <ul className="navbar-nav fs-6">
                        {isWalletConnected ?
                            <>
                                <li className="nav-item mx-3">
                                    <Nav.Link as={Link} to="/emissions" className="nav-link text-white">Emisyonlar</Nav.Link>
                                </li>
                                <li className="nav-item mx-3">
                                    <Nav.Link as={Link} to="/orderHistory" className="nav-link text-white">Veriler</Nav.Link>
                                </li>
                                <li className="nav-item mx-3">
                                    <a onClick={() => { }} className="nav-link text-white" href="#">{walletId}</a>
                                </li>

                            </>
                            :

                            <>
                                <li className="nav-item mx-3">
                                    <a onClick={() => { handleConnectWallet(); }} className="nav-link text-white border border-white" href="#">Zincire Bağlan</a>
                                </li>
                            </>

                        }

                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Header