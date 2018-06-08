import React from 'react'

function MainFooter () {
  return (
    <footer className="footer site-section" role="footer">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md">
            <h3 lang="en">Resources:</h3>
            <ul>
              <li>
                <a href="https://github.com/autonomoussoftware/documentation/blob/master/owners_manual/owners_manual.md" target="_blank" rel='noopener noreferrer'>Owner{'\''}s Manual</a>
              </li>
              <li>
                <a href="https://github.com/autonomoussoftware/documentation/blob/master/FAQ.md" target="_blank" rel='noopener noreferrer'>Metronome FAQ</a>
              </li>
              <li>
                <a href="https://github.com/autonomoussoftware" target="_blank" rel='noopener noreferrer'>GitHub</a>
              </li>
              <li>
                <a href="/media-kit">Media Kit</a>
              </li>
            </ul>
          </div>
          <div className="col-md">
            <h3 lang="en">Connect + Collaborate</h3>
            <div className="social">
              <a href="https://github.com/autonomoussoftware" target="_blank" rel='noopener noreferrer'>
                <i className="fa fa-github" aria-hidden="true"></i>
              </a>
              <a href="https://t.me/metronometoken" target="_blank" rel='noopener noreferrer'>
                <i className="fa fa-telegram" aria-hidden="true"></i>
              </a>
              <a href="https://twitter.com/MTNToken" target="_blank" rel='noopener noreferrer'>
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </a>
              <a href="https://www.reddit.com/r/metronometoken" target="_blank" rel='noopener noreferrer'>
                <i className="fa fa-reddit-alien" aria-hidden="true"></i>
              </a>
              <a href="https://www.facebook.com/MetronomeToken/" target="_blank" rel='noopener noreferrer'>
                <i className="fa fa-facebook" aria-hidden="true"></i>
              </a>
              <a href="https://medium.com/@MetronomeToken" target="_blank" rel='noopener noreferrer'>
                <i className="fa fa-medium" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          <div className="col-md">
            <h3 lang="en">Additional Info:</h3>
            <ul>
              <li>
                <a href="privacy/">Privacy Policy</a>
              </li>
              <li>
                All Rights Reserved.
              </li>
              <li>
                Site Design by <a href="http://www.thinkonramp.com/" target="_blank" rel='noopener noreferrer'>Onramp</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default MainFooter
