import React from 'react'

export default function () {
  return (
    <div className="media-kit">
      <div id="top" className="site-section">
        <div id="top-particle"></div>
        <div className="container">
          <h1 lang="en" className="text-center extra-bold">Media Kit</h1>
        </div>
      </div>

      <div className="about site-section">
        <div className="bottom-rider"></div>
        <div className="container">
          <p className="lead">Download the entire Metronome Media Kit <a href="/download/Metronome_Media_Kit.zip">here</a>, or view our individual resources and materials below.</p>

          <h2>Brand Resources</h2>

          <div className="row">
            <div className="col-sm-4">
              <h4>Logo</h4>
              <img className="img-fluid" src="../images/media-logo.png" alt="Logo"/>
              <p><a className="dl-link" href="/download/Metronome_logo.zip" lang="en">Download &raquo;</a></p>
            </div>
            <div className="col-sm-4">
              <h4>Jeff Garzik</h4>
              <img className="img-fluid" src="../images/media-jeff-garzik.jpg" alt="Jeff Garzik"/>
              <p><a className="dl-link" href="/download/JeffGarzik.zip" lang="en">Download Photo & Bio &raquo;</a></p>
            </div>
            <div className="col-sm-4">
              <h4>Matthew Roszak</h4>
              <img className="img-fluid" src="../images/media-matt-roszak.jpg" alt="Matthew Roszak"/>
              <p><a className="dl-link" href="/download/MatthewRoszak.zip" lang="en">Download Photo & Bio &raquo;</a></p>
            </div>
          </div>

          <hr/>

          <h2>Additional Information</h2>

          <div className="row">
            <div className="col-sm-4">
              <h4>Frequently Asked Questions</h4>
              <img className="img-fluid" src="../images/media-kit-faq.png" alt=""/>
              <p><a href="/download/FAQ.pdf" target="_blank" lang="en" className="dl-link">Download FAQ &raquo;</a></p>
            </div>
            <div className="col-sm-4">
              <h4>Metronome Fact Sheet</h4>
              <img className="img-fluid" src="../images/media-kit-fact-sheet.png" alt=""/>
              <p><a href="/download/Fact_Sheet.pdf" target="_blank" lang="en" className="dl-link">Download Fact Sheet &raquo;</a></p>
            </div>
            <div className="col-sm-4">
              <h4>About Metronome Infographic</h4>
              <img className="img-fluid" src="../images/media-kit-infographic.png" alt="Logo" />
              <p><a href="/download/Infographic.pdf" target="_blank" lang="en" className="dl-link">Download Infographic &raquo;</a></p>
            </div>
          </div>

          <hr/>

          <h2>Press Releases</h2>

          <div className="row">
            <div className="col-sm-12 col-md-6 col-xl-4">
              <h4>Bloq Announces Metronome / 10.24.17</h4>
              <p>World's First Cross-Blockchain Cryptocurrency - New Digital Asset Delivers Next-Generation Levels of Self-Governance and Reliability</p>
              <p><a href="/press" className="btn">READ MORE</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
