import React, { useEffect, useState } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { connectWallet } from '../utils'
import { ethers, Signer } from 'ethers'


const Header = ({ setProvider, setSigner, setSignerAddress }) => {

    const [isWalletConnected, setIsWalletConnect] = useState(false);
    const [walletId, setWalletId] = useState("");

    const [isDark, setIsDark] = useState(false);




    useEffect(() => {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 70) {
                setIsDark(true)
            } else {
                setIsDark(false)
            }
        });
    }, []);

    const connectWalletHandler = async () => { //digi
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(provider);
            const addresses = await provider.send("eth_requestAccounts");
            const signer = provider.getSigner();
            setSignerAddress(addresses[0]);
            setWalletId("0x..." + addresses[0].slice(-3))
            setIsWalletConnect(true)

            setSigner(signer);
            console.log("ok: ", addresses[0], addresses[0].slice(-3));
        } else {
            console.log("nok");


        }
    };

    return (

        <nav id="navbar" className={"navbar fixed-top navbar-expand-lg navbar-dark p-md-3 " + (isDark ? 'header-dark' : '')}>
            <div className="container align-middle align-items-center">
                <Navbar.Brand as={Link} to="/"><img
                    src={require('../img/tr_logo_white.png')}
                    width="190"
                    height="70"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                /></Navbar.Brand>
                <div style={{ height: "60px", width: "3px, " }} className="vertical-header vr mt-2"></div>

                <Nav.Link as={Link} to="/" className="ms-3 navbar-brand fs-5 align-middle align-items-center" href="emissions">
                    <div className='my-auto'><strong>  Emisyon Zinciri</strong></div>
                </Nav.Link >
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
                                    <Nav.Link as={Link} to="/emissions" className="nav-link text-white">Emisyon Takiplerim</Nav.Link>
                                </li>
                                <li className="nav-item mx-3">
                                    <Nav.Link as={Link} to="/data" className="nav-link text-white">Veriler</Nav.Link>
                                </li>
                                <li className="nav-item mx-3">
                                    <a onClick={() => { }} className="nav-link text-white" href="#">{walletId}</a>
                                </li>

                            </>
                            :

                            <>
                                <li className="nav-item mx-3">
                                    <a onClick={() => { connectWalletHandler(); }} className="nav-link text-white border border-white" href="#">Zincire Bağlan</a>
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