import React from 'react';
import footerLogo from "@assets/images/logo.png"

//Footer
const Footer = ()=>{
  return(
<footer className="footer-style">
  <div className="container">
    <div className="row">
      <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 footer-right">
        <img src={footerLogo} alt="footer logo" className="img-responsive footer-logo" />
        <p>1234567 345678</p>
        <p>© 2010 - 2017. All rights reserved.</p>
      </div>
    </div>
</div>

</footer>
)
}
export default Footer;
