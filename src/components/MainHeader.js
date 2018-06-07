import React from 'react'
import { Link } from 'react-router-dom'

export default function () {
  return (
    <header>
      <nav className="navbar navbar-expand-xl navbar-dark fixed-top">
        <div className="container">
          <a data-toggle="collapse" data-target=".navbar-collapse.show" className="navbar-brand" href="#start">
            <img src="images/logo.png" alt="Metronome" />
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">

            <div className="dropdown language-switcher">
              <button className="btn btn-language dropdown-toggle" type="button" id="languageDropdown" data-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false" lang="en">
                Languages
              </button>
              {/* <div className="dropdown-menu" aria-labelledby="languageDropdown">
                <a className="dropdown-item" href="#" onclick="window.lang.change('en'); return false;">English</a>
                <a className="dropdown-item" href="#" onclick="window.lang.change('li'); return false;">Lorem Ipsum</a>
                <a className="dropdown-item" href="#" onclick="window.lang.change('lx'); return false;">Language X</a>
              </div> */}
            </div>
            <ul className="navbar-nav ml-auto">
              <li data-toggle="collapse" data-target=".navbar-collapse.show" className="nav-item" id="n-about">
                <a className="nav-link" href="#about" lang="en">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/features" lang="en">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://github.com/autonomoussoftware/documentation/blob/master/owners_manual/owners_manual.md" id="s-owners-manual" lang="en" target="_blank" rel="noopener noreferrer">Owner's Manual</a>
              </li>
              <li data-toggle="collapse" data-target=".navbar-collapse.show" className="nav-item">
                <a className="nav-link" href="#token-sale" id="s-token-sale" lang="en">Token Sale</a>
              </li>
              <li data-toggle="collapse" data-target=".navbar-collapse.show" className="nav-item">
                <a className="nav-link" href="#timeline" id="s-timeline" lang="en">Timeline</a>
              </li>
              <li data-toggle="collapse" data-target=".navbar-collapse.show" className="nav-item">
                <a className="nav-link" href="#team-content" id="s-team" lang="en">Team</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/media-kit" lang="en">Media Kit</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://github.com/autonomoussoftware/documentation/blob/master/FAQ.md" target="_blank" rel="noopener noreferrer" lang="en">FAQ</a>
              </li>
              <li className="nav-item">
                <Link to="/auctions" className="nav-link" lang="en">Auctions</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
