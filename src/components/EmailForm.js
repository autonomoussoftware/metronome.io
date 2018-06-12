import React from 'react'

const EmailForm = () => (
  <div class="sendgrid">
    <div id="sendgrid-subscription-widget" class="sendgrid-subscription-widget" >
      <form id="sg-widget" data-token="ad8b1f4cd2963a816efc51879519201e" onsubmit="return false;">
        <div class="sg-response" id="sg-response"></div>
        <div class="row justify-content-center no-gutters">
          <div class="col col-sm-4">
            <input id="sg_email" class="email" type="email" name="sg_email" placeholder="Email Address" required />
          </div>
          <div class="col col-sm-4">
            <input type="submit" id="sg-submit-btn" class="btn" value="SIGN UP FOR UPDATES" />
          </div>
        </div>
      </form>
    </div>
  </div>
)

export default EmailForm
