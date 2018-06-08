import React from 'react'

export default function () {
  return (
    <div className="features">
      <div id="top" className="site-section">
        <div id="top-particle"></div>
        <div className="container">
          <h1 lang="en" className="text-center extra-bold">Metronome&acute;s Unique Features</h1>
        </div>
      </div>

      <div className="about site-section">
        <div className="container">
          <div className="row">
            <div className="col-sm-11">
              <p className="lead" lang="en">Metronome&acute;s core design principles of self-governance, reliability, and portability are supported by a host of innovative features.</p>
              <h3>Self-Governance</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-3">
              <ol>
                <li>No undue founder influence following launch</li>
                <li>Resistant to individual or community influence discord, disagreement, or misinterpretation</li>
                <li>Public access to all sale opportunities</li>
              </ol>
            </div>
            <div className="col-md-6 col-lg-3">
              <ol className="start-4">
                <li>100% on-chain, decentralized, and auditable</li>
                <li>Auction sale price determined by descending price auction</li>
              </ol>
            </div>
            <div className="col-xs-2 col-md-6 col-lg-6 illustration">
              <img src="../images/features-illustration-1.png" alt=""/>
            </div>
          </div>

          <div className="row reversed">
            <div className="col-xs-2 col-md-6 col-lg-6 illustration order-2 order-md-1">
              <img src="../images/features-illustration-2.png" alt=""/>
            </div>
            <div className="col-md-6 col-lg-3 order-1 order-md-2 reliability">
              <h3>Reliability</h3>
              <ol>
                <li>Predictable issuance and token supply</li>
                <li>New MET minted daily ad infinitum, at the rate that is the greater of (i) 2,880 MET per day, or (ii) an annual rate equal to 2.0000% of the then-outstanding supply per year</li>
              </ol>
            </div>
            <div className="col-md-6 col-lg-3 order-2 order-md-3 portability">
              <h3>Portability</h3>
              <ol>
                <li lang="en">Cross-blockchain portability allows provable export to and import from different contracts or blockchains:
                  <ul>
                    <li><span lang="en">Provides exit for users from chains for any reason</span></li>
                    <li><span lang="en">Further protects the cryptocurrency from management issues and instability</span></li>
                  </ul></li>
                <li>Enables a migration path to future blockchains as the ledger technology platform matures, acting as a key value proposition for the long-term viability of all digital currencies</li>
              </ol>
              <p>&nbsp;</p>
              <p>&nbsp;</p>
            </div>
          </div>
        </div>
        <div className="dark-angle"></div>

      </div>

      <div className="other-features site-section">
        <div className="container">

          <div className="row">
            <div className="col-md-4 order-2 order-md-1 additional">
              <h3>Additional Features</h3>
              <ol>
                <li>Settlement times shared with underlying chain - Initially settled in 15 to 30 seconds</li>
                <li>Mass pay - allowing multiple payments to be sent in one batch</li>
                <li>Subscriptions - allowing recurring payments between users</li>
                <li>ERC20-compliant
                  <ul>
                    <li style={{ listStyle: 'none', paddingLeft: '20px', color: '#525252' }}>With additional custom functionality  for enhanced decentralization exchange and security features</li>
                  </ul>
                </li>
              </ol>
            </div>
            <div className="col-md-3 order-3 order-md-2 additional">
              <p>&nbsp;</p>
              <p><strong>For a more comprehensive explanation of these features and other aspects of Metronome, please see the <a href="https://github.com/autonomoussoftware/documentation/blob/master/owners_manual/owners_manual.md" target="_blank" rel="noopener noreferrer">Owner&acute;s Manual</a>.</strong></p>
            </div>
            <div className="col-md-5 order-1 order-md-3">
              <img className="illustration-last" src="../images/features-illustration-3.png" alt=""/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
