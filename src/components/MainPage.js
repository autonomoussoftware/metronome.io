import React from 'react'
import { connect } from 'react-redux'

import AuctionInProgress from './AuctionInProgress'
import TokenSaleCountdown from './TokenSaleCountdown'

function MainPage ({ currentAuction, genesisTime, loading }) {
  const now = Date.now()
  const auctionsStarted = genesisTime * 1000 <= now
  const isInitialAuction = currentAuction === 0
  const loadingAuctionStatus = loading

  return (
    <div>
      <div id="top" className="site-section">
        <div id="top-particle"></div>
        <div className="container">

          <h1 lang="en" className="text-center">
            <img className="img-fluid" src="images/metronome-logo-purple.png" alt="Metronome" />
            <br />
            <em>The</em> Built-to-Last Cryptocurrency
            <br />
            <span>Self-Governance. Reliability. Portability.</span>
          </h1>

          {auctionsStarted
            ? isInitialAuction
              ? loadingAuctionStatus
                ? <div>Loading status</div>
                : <AuctionInProgress />
              : <div>buy button</div>
            : <TokenSaleCountdown />}

          {!auctionsStarted &&
            <div className="mailchimp">
              {/* Begin MailChimp Signup Form */}
              <div id="mc_embed_signup">
                <form action="https://bloq.us16.list-manage.com/subscribe/post?u=d664bfca56b2d1c386e0cbe5c&amp;id=7837b91f1d" method="post"
                  id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" rel='noopener noreferrer' noValidate>
                  <div className="row justify-content-center no-gutters">
                    <div className="col col-sm-4">
                      <input type="email" value="" name="EMAIL" className="required email" id="mce-EMAIL" placeholder="Email Address" />
                    </div>
                    <div className="col col-sm-4">
                      <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                        <input type="text" name="b_d664bfca56b2d1c386e0cbe5c_7837b91f1d" tabIndex="-1" value="" />
                      </div>
                      <input type="submit" value="SIGN UP FOR UPDATES" name="subscribe" id="mc-embedded-subscribe" className="btn" style={{ display: 'flex' }} />
                    </div>
                  </div>
                </form>
              </div>
              {/* End mc_embed_signup */}
            </div>
          }

          <div className="text-center social">
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
      </div>

      <div id="about" className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-sm-11">
              <h2 lang="en">Introducing Metronome</h2>
              <p className="lead" lang="en" style={{ fontSize: 28 }}>Metronome ("Metronome" or "MET") is a new cryptocurrency focused on making greater decentralization possible and
                delivering institutional-class endurance.</p>

              <p>Metronome builds off the lessons learned from previous cryptocurrencies and optimizes for self-governance, long-term
                reliability, and maximum portability. Built by leading figures in the space and supported by a diverse array
                of partners and advisors, Metronome is engineered to meet and exceed the high standards of the cryptocurrency
                community.
              </p>

              <p>
                <strong>In developing an enduring cryptocurrency, Metronome is founded on three key design principles:</strong>
              </p>
            </div>
          </div>
          <div className="row key-goals">
            <div className="col-sm-4">
              <div className="key-goals__item">
                <img src="images/icon-self-governance.png" alt="" />
                <p>
                  <strong lang="en">Self-Governance</strong>
                  <br />
                  <span lang="en">with no undue influence from founders after initial launch and public access &mdash; contract governance starts
                    at launch.</span>
                </p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="key-goals__item">
                <img src="images/icon-stability.png" alt="" />
                <p>
                  <strong lang="en">Reliability</strong>
                  <br />
                  <span lang="en">and predictability where issuance and supply are immutable</span>
                </p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="key-goals__item">
                <img src="images/icon-portability.png" alt="" />
                <p>
                  <strong lang="en">Portability</strong>
                  <br />
                  <span lang="en">to enable maximum decentralization, even across different blockchains</span>
                </p>
              </div>
            </div>
          </div>

          <p lang="en">As the first cryptocurrency capable of being exported and imported across chains, Metronome will be initially issued
            on Ethereum with Ethereum Classic, Rootstock on Bitcoin, and Qtum support expected to follow. Such portability will
            allow users to select the chain that suits their requirements for management and security, or even upgrade the MET
            contract if needed. With the main goal of Metronome being a cryptocurrency that is built to last, portability furthers
            this goal by freeing Metronome from the fate of any one chain.</p>

          <p lang="en">Metronome will not be controlled by any party after launch&mdash;not even its authors&mdash;as it is completely autonomous.
            Metronome authors plan to continue to help by building an ongoing open-source community to support developers and
            users, but Metronome authors will have no access or control after the initial auction.</p>

          <p>
            <a href="/press/" className="btn" lang="en">View the press release</a>
          </p>
        </div>
      </div>
      {/* /about */}

      <div id="video" className="site-section">
        <div className="container squeeze">
          <div id="owners-manual" className="row align-items-center">
            <div className="col-md">
              <a href="https://github.com/autonomoussoftware/documentation/blob/master/owners_manual/owners_manual.md" target="_blank" rel='noopener noreferrer'>
                <img className="img-fluid" src="images/owners-manual.png" alt="Owners Manual" />
              </a>
            </div>
            <div className="col-md video-copy">
              <h2>Owner&apos;s Manual</h2>
              <p lang="en" className="extra-light">Like with any other asset or technology, it&apos;s important for users to know how Metronome works&mdash;the
                <a href="https://github.com/autonomoussoftware/documentation/blob/master/owners_manual/owners_manual.md" target="_blank" rel='noopener noreferrer'>
                  <strong style={{ color: '#7e61f8', fontWeight: 600 }}>Owner&apos;s Manual</strong>
                </a>, along with the documents and information referenced therein, is required reading for any Metronome owner. </p>
              <p style={{ paddingTop: 20 }} />
              <a className="btn" href="https://github.com/autonomoussoftware/documentation/blob/master/owners_manual/owners_manual.md" target="_blank" rel='noopener noreferrer'>Read the owner&apos;s manual</a>
            </div>
          </div>

          <div className="video-wrapper">
            <iframe src="https://player.vimeo.com/video/268585326" width="640" height="360" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>

        <div className="skewed-bg"></div>
        <div className="color-fill"></div>
      </div>

      <div id="token-sale" className="site=section chart-data">
        <div className="container squeeze">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <h2 lang="en" style={{ marginBottom: 20 }}>Token Sale</h2>
              <p lang="en" className="extra-light">Metronome will be offered to the public via an autonomous descending price auction. Its authors will receive a
                one-time retention of 20% (2 million) of the initial MET supply. 100% of the proceeds from the initial auction
                will be used to provide long term support for the community.</p>
              <p className="extra-light">The initial supply auction will last up to 7 days. After 7 days or when all MET in the initial supply are sold,
                the auction will end.</p>
            </div>
            <div className="col-sm-4 text-center">
              <img src="images/pie-chart-auction-proceeds.png" alt="Pie Chart Auction Proceeds" />
              <img src="images/pie-chart.png" alt="Pie Chart" />
            </div>
          </div>
        </div>
      </div>

      <div id="timeline" className="site-section">
        <div className="container">
          <h2 className="text-center" lang="en">Timeline</h2>
          <div className="swipe text-center">
            <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
            <span lang="en">Swipe</span>
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </div>
          <div className="timeline">
            <div className="time-line-slide">
              <img className="dotted-line" src="images/timeline-line.png" alt="" />
              <div className="time-note top one">
                <div className="date" lang="en">03.01.2017</div>
                <div className="note" lang="en">Metronome idea</div>
              </div>
              <div className="time-note bottom two">
                <div className="date" lang="en">05.24.2017</div>
                <div className="note" lang="en">Partnership with New Alchemy formed</div>
              </div>
              <div className="time-note top three">
                <div className="date" lang="en">08.01.2017</div>
                <div className="note" lang="en">Smart contract development begins</div>
              </div>
              <div className="time-note bottom four active">
                <div className="date" lang="en">10.24.2017</div>
                <div className="note" lang="en">Metronome website and Owner&apos;s Manual published</div>
              </div>
              <div className="time-note top five">
                <div className="date" lang="en">June 2018</div>
                <div className="note" lang="en">Metronome Initial Supply Auction</div>
              </div>
              <div className="time-note bottom six">
                <div className="date" lang="en">Q3 2018</div>
                <div className="note" lang="en">First cross-chain launch on ETC</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="team" className="site-section">
        <div className="top-triangle"></div>
        <div className="container squeeze">
          <h2 id="team-content" className="text-center" lang="en">Team</h2>

          <p lang="en" className="text-center">A project as advanced and ambitious as Metronome requires known, proven talent and leadership in cryptocurrencies—people
            who uniquely understand the engineering and marketplace challenges.</p>

          <div className="row justify-content-sm-center team-grid">
            <div className="col-12 col-sm-6 col-lg-4 team-grid-member">
              <img src="images/team-jeff-garzik.png" alt="Jeff Garzik" />
              <h3>Jeff Garzik</h3>
              <p lang="en">CEO &amp; Co-Founder,
                <br />Chief Designer</p>
            </div>

            <div className="col-12 col-sm-6 col-lg-4 team-grid-member">
              <img src="images/team-matthew-roszak.png" alt="Matthew Roszak" />
              <h3>Matthew Roszak</h3>
              <p lang="en">Chairman & Co-Founder </p>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 team-grid-member">
              <img src="images/team-peter-vessenes.png" alt="Peter Vessenes" />
              <h3>Peter Vessenes</h3>
              <p lang="en">Chief Cryptographer</p>
            </div>

            <div className="col-12 col-sm-6 col-lg-4 team-grid-member">
              <img src="images/team-ryan-condron.png" alt="Ryan Condron" />
              <h3>Ryan Condron</h3>
              <p lang="en">Principal Engineer</p>
            </div>

            <div className="col-12 col-sm-6 col-lg-4 team-grid-member">
              <img src="images/team-troy-benjegerdes.png" alt="Troy Benjegerdes" />
              <h3>Troy Benjegerdes</h3>
              <p lang="en">Principal Engineer</p>
            </div>

            <div className="col-12 col-sm-6 col-lg-4 team-grid-member">
              <img src="images/team-jordan-kruger.png" alt="Jordan Kruger" />
              <h3>Jordan Kruger</h3>
              <p lang="en">Data Scientist</p>
            </div>

            <div className="col-12 col-sm-6 col-lg-4 team-grid-member">
              <img src="images/team-gabriel-montes.png" alt="Gabriel Montes" />
              <h3>Gabriel Montes</h3>
              <p lang="en">Engineering Lead</p>
            </div>

            <div className="col-12 col-sm-6 col-lg-4 team-grid-member">
              <img src="images/team-pablo-enrici.png" alt="Pablo Enrici" />
              <h3>Pablo Enrici</h3>
              <p lang="en">Software Engineer</p>
            </div>

            <div className="col-12 col-sm-6 col-lg-4 team-grid-member">
              <img src="images/team-ignacio-anaya.png" alt="Ignacio Anaya" />
              <h3>Ignacio Anaya</h3>
              <p lang="en">Software Engineer</p>
            </div>

            <div className="col-12 col-sm-6 col-lg-4 team-grid-member">
              <img src="images/team-jaclyn-kramer.png" alt="Jaclyn Kramer" />
              <h3>Jaclyn Kramer</h3>
              <p lang="en">Marketing</p>
            </div>

            <div className="col-12 col-sm-6 col-lg-4 team-grid-member">
              <img src="images/team-dariusz-jakubowski.png" alt="Dariusz Jakubowski" />
              <h3>Dariusz Jakubowski</h3>
              <p lang="en">Community Advocate</p>
            </div>

            <div className="col-12 col-sm-6 col-lg-4 team-grid-member">
              <img src="images/team-steve-beauregard.png" alt="Steve Beauregard" />
              <h3>Steve Beauregard</h3>
              <p lang="en">Partnerships</p>
            </div>

            <div className="col-12 col-sm-6 col-lg-4 team-grid-member">
              <img src="images/team-ted-parvu.png" alt="Ted Parvu" />
              <h3>Ted Parvu</h3>
              <p lang="en">Infrastructure</p>
            </div>

            <div className="col-12 col-sm-6 col-lg-4 team-grid-member">
              <img src="images/team-matt-lam.png" alt="Matt Lam" />
              <h3>Matt Lam</h3>
              <p lang="en">Blockchain Strategist</p>
            </div>

            <div className="col-12 col-sm-6 col-lg-4 team-grid-member">
              <img src="images/team-iwona-zdanowicz.png" alt="Iwona Zdanowicz" />
              <h3>Iwona Zdanowicz</h3>
              <p lang="en">Administrative</p>
            </div>
          </div>

          <h2 className="advisors text-center" lang="en">Advisors</h2>
          <div className="row justify-content-sm-center team-grid">
            <div className="col-12 col-sm-6 col-lg-4 team-grid-member">
              <img src="images/advisor-gustav-simonsson.png" alt="Gustav Simonsson" />
              <h3>Gustav Simonsson</h3>
              <p lang="en">Orchid Labs Co-founder &amp; Former Ethereum Core Dev</p>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 team-grid-member">
              <img src="images/advisor-jim-newsome.png" alt="Jim Newsome" />
              <h3>Jim Newsome</h3>
              <p lang="en">Delta Strategy & Former CFTC Chairman</p>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 team-grid-member">
              <img src="images/advisor-don-tapscott.png" alt="Don Tapscott" />
              <h3>Don Tapscott</h3>
              <p lang="en">Blockchain Research Institute</p>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 team-grid-member">
              <img src="images/advisor-vinny-lingham.png" alt="Vinny Lingham" />
              <h3>Vinny Lingham</h3>
              <p lang="en">Civic</p>
            </div>

            <div className="col-12 col-sm-6 col-lg-4 team-grid-member">
              <img src="images/advisor-don-wilson.png" alt="Don Wilson" />
              <h3>Don Wilson</h3>
              <p lang="en">DRW</p>
            </div>

            <div className="col-12 col-sm-6 col-lg-4 team-grid-member">
              <img src="images/advisor-william-mougayar.png" alt="William Mougayar" />
              <h3>William Mougayar</h3>
              <p lang="en">Token Summit</p>
            </div>
          </div>

          <p>&nbsp;</p>
          <h2 lang="en" className="text-center">Partners</h2>
          <div className="row partners justify-content-center align-items-center">
            <div className="col-sm-4 text-center">
              <img src="images/part-new-alchemy.png" alt="" />
            </div>
          </div>

          <p>&nbsp;</p>
          <h2 lang="en" className="text-center">Strategic Advisors</h2>
          <div className="row partners justify-content-center align-items-center">
            <div className="col-sm-4 text-center">
              <img src="images/part-perkins-cole.png" alt="" />
            </div>
            <div className="col-sm-4 text-center">
              <img src="images/part-delta-strategy-group.png" alt="" />
            </div>
            <div className="col-sm-4 text-center">
              <img src="images/part-smith-crown.png" alt="" />
            </div>
            <div className="col-sm-4 text-center">
              <img src="images/part-zeppelin-solutions.png" alt="" />
            </div>
            <div className="col-sm-4 text-center">
              <img src="images/part-jaxx.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div id="news" className="site-section">
        <div className="container squeeze news-content">
          <h2 className="text-center" lang="en" style={{ marginBottom: 50 }}>Latest News</h2>
          <div className="row">
            <div className="col-sm text-center">
              <a href="https://www.bloomberg.com/news/articles/2017-10-24/bitcoin-pioneer-says-new-coin-to-work-on-multiple-blockchains"
                target="_blank" rel='noopener noreferrer' />
              <img src="images/news-bloomberg.png" alt="Bloomberg" />
              <h3>
                <a href="https://www.bloomberg.com/news/articles/2017-10-24/bitcoin-pioneer-says-new-coin-to-work-on-multiple-blockchains"
                  target="_blank" rel='noopener noreferrer'>Bitcoin pioneer says new coin to work on many blockchains</a>
              </h3>
            </div>
            <div className="col-sm text-center">
              <a href="http://fortune.com/2017/10/24/bitcoin-metronome/" target="_blank" rel='noopener noreferrer'>
                <img src="images/news-fortune.png" alt="Fortune" />
              </a>
              <h3>
                <a href="http://fortune.com/2017/10/24/bitcoin-metronome/" target="_blank" rel='noopener noreferrer'>Bitcoin alums announce new digital currency Metronome</a>
              </h3>
            </div>
            <div className="col-sm text-center">
              <a href="https://www.reuters.com/article/us-bloq-token-funding/u-s-blockchain-start-up-bloq-to-launch-bitcoin-like-token-idUSKBN1CT2G1"
                target="_blank" rel='noopener noreferrer'>
                <img src="images/news-reuters.png" alt="Reuters" />
              </a>
              <h3>
                <a href="https://www.reuters.com/article/us-bloq-token-funding/u-s-blockchain-start-up-bloq-to-launch-bitcoin-like-token-idUSKBN1CT2G1"
                  target="_blank" rel='noopener noreferrer'>U.S. blockchain start-up Bloq to launch bitcoin-like token
                </a>
              </h3>
            </div>
            <div className="col-sm text-center">
              <a href="https://www.americanbanker.com/news/bitcoin-pioneers-cryptocurrency-alternative-allows-for-multiple-networks" target="_blank" rel='noopener noreferrer'>
                <img src="images/news-american-banker.png" alt="American Banker" />
              </a>
              <h3>
                <a href="https://www.americanbanker.com/news/bitcoin-pioneers-cryptocurrency-alternative-allows-for-multiple-networks" target="_blank" rel='noopener noreferrer'>Bitcoin pioneer challenges cryptocurrency status quo</a>
              </h3>
            </div>
            <div className="col-sm text-center">
              <a href="http://strategiccoin.com/the-thousand-year-coin-how-metronome-will-change-the-face-of-digital-currency-2/" target="_blank" rel='noopener noreferrer'>
                <img src="images/news-strategic-coin.png" alt="Strategic Coin" />
              </a>
              <h3>
                <a href="http://strategiccoin.com/the-thousand-year-coin-how-metronome-will-change-the-face-of-digital-currency-2/" target="_blank" rel='noopener noreferrer'>The Thousand Year Coin: How Metronome Will Change the Face of Digital Currency</a>
              </h3>
            </div>
          </div>
          <h2 className="text-center" lang="en" style={{ margin: '50px 0' }}>As Featured In</h2>
          <div className="row">
            <div className="col-sm-4 text-center">
              <img src="images/featured-new-york-times.png" alt="New York Times" />
            </div>
            <div className="col-sm-4 text-center">
              <img src="images/featured-yahoo-finance.png" alt="Yahoo Finance" />
            </div>
            <div className="col-sm-4 text-center">
              <img src="images/featured-economic-times.png" alt="Economic Times" />
            </div>
            <div className="col-sm-4 text-center">
              <img src="images/featured-business-insider.png" alt="Business Insider" />
            </div>
            <div className="col-sm-4 text-center">
              <img src="images/featured-us-news-world-report.png" alt="US News and World Report" />
            </div>
            <div className="col-sm-4 text-center">
              <img src="images/featured-coindesk.png" alt="CoinDesk" />
            </div>
          </div>

        </div>
      </div>

      <div id="bottom" className="site-section">
        <div className="top-triangle"></div>
        <div className="container">
          <h2 className="text-center join-discussion">Connect + Collaborate</h2>
          <div className="text-center social">
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
      </div>
      <script src="/js/home.js"></script>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    currentAuction: state.auction.status.currentAuction,
    genesisTime: state.auction.status.genesisTime,
    loading: state.auction.loading
  }
}

export default connect(mapStateToProps)(MainPage)
