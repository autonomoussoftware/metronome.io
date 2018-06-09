import { connect } from 'react-redux'
import { NavHashLink } from 'react-router-hash-link'
import { NavLink } from 'react-router-dom'
import React from 'react'

function PageHeader ({ isDailyAuction }) {
  return (
    <header>
      <nav className="navbar navbar-expand-xl navbar-dark fixed-top">
        <div className="container">
          <NavHashLink to="/#start" smooth data-target=".navbar-collapse.show" className="navbar-brand">
            <img src="images/logo.png" alt="Metronome" />
          </NavHashLink>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ml-auto">
              <li data-target=".navbar-collapse.show" className="nav-item" id="n-about">
                <NavHashLink to="/#about" smooth activeClassName="active" className="nav-link" lang="en">About</NavHashLink>
              </li>
              <li className="nav-item">
                <NavLink to="/features" activeClassName="active" className="nav-link" lang="en">Features</NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://github.com/autonomoussoftware/documentation/blob/master/owners_manual/owners_manual.md" id="s-owners-manual" lang="en" target="_blank" rel="noopener noreferrer">Owner&apos;s Manual</a>
              </li>
              <li data-toggle="collapse" data-target=".navbar-collapse.show" className="nav-item">
                <NavHashLink to="/#token-sale" smooth activeClassName="active" className="nav-link" lang="en">Token Sale</NavHashLink>
              </li>
              <li data-toggle="collapse" data-target=".navbar-collapse.show" className="nav-item">
                <NavHashLink to="/#timeline" smooth activeClassName="active" className="nav-link" lang="en">Timeline</NavHashLink>
              </li>
              <li data-toggle="collapse" data-target=".navbar-collapse.show" className="nav-item">
                <NavHashLink to="/#team-content" smooth activeClassName="active" className="nav-link" lang="en">Team</NavHashLink>
              </li>
              <li className="nav-item">
                <NavLink to="/media-kit" activeClassName="active" className="nav-link" lang="en">Media Kit</NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://github.com/autonomoussoftware/documentation/blob/master/FAQ.md" target="_blank" rel="noopener noreferrer" lang="en">FAQ</a>
              </li>
              {isDailyAuction && <li className="nav-item">
                <NavLink to="/auctions" activeClassName="active" className="nav-link" lang="en">Auction</NavLink>
              </li>}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

const mapStateToProps = state => state.auction.status

export default connect(mapStateToProps)(PageHeader)