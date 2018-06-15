import React from 'react'

const returnFalse = () => false

const EmailForm = () => (
  <div className="sendgrid">
    <div id="sendgrid-subscription-widget" className="sendgrid-subscription-widget" >
      <form id="sg-widget" data-token="ad8b1f4cd2963a816efc51879519201e" onSubmit={returnFalse}>
        <div className="sg-response" id="sg-response"></div>
        <div className="row justify-content-center no-gutters">
          <div className="col col-sm-4">
            <input id="sg_email" className="email" type="email" name="sg_email" placeholder="Email Address" required />
          </div>
          <div className="col col-sm-4">
            <input type="submit" id="sg-submit-btn" className="btn" value="SIGN UP FOR UPDATES" />
          </div>
        </div>
      </form>
    </div>
  </div>
)

export default EmailForm
