
const Footer = () => {
  return (
    <>
      <div className="footer">

        <div className="footer-items flex-col gap-24p ">

          {/* first flex child */}
          <div className="footer-item  flex-col  gap-24p">

            {/* first flex item */}
            <p className="footer-title">What is
              <span>&nbsp;Petverse</span>?
            </p>

            {/* second flex item */}
            <p className="content">In our clinic, we look after your pets with love and care, your pet's favorite place is going to be our clinic!
                            forget about worrying that your pet is going to be stressed to visit the clinic, it will be a relaxing and fun experience!</p>

            {/* third flex item */}

            <div className="social flex-row gap-16p  ">

              <a href="https://wwww.facebook.com" target='_blank' rel="noreferrer nofollow"><i className="my-social fab fa-facebook"></i></a>
              <a href="https:///www.instagram.com" target='_blank' rel="noreferrer nofollow"><i className="my-social fab fa-instagram"></i></a>
              <a href="https://www.twitter.com" target='_blank' rel="noreferrer nofollow"><i className="my-social fab fa-twitter"></i></a>

            </div>
          </div>
          {/* second flex child */}
          <div className="footer-item flex-col   gap-24p">
            {/* first item */}
            <p className="footer-title">Working Hours</p>
            {/* second item */}
            <p className="content">Our working hours during the week and the weekend:</p>
            {/* third item */}
            <div className="flex-col">

              {/* first flex */}
              <div className="flex-row fjust-between">
                <p className="content">Monday - Friday:</p>
                <p className="content">9:00 - 18:00</p>
              </div>

              {/* second flex */}
              <div className="flex-row fjust-between">
                <p className="content">Saturday - Sunday:</p>
                <p className="content">9:00 - 18:00</p>
              </div>
              {/* third flex */}

              {/* <div className="flex-row fjust-between">
                <p className="content">Sunday:</p>
                <p className="content">9:00 - 11:00</p>
              </div> */}
            </div>
          </div>

          {/* third flex child */}
          <div className="footer-item flex-col gap-24p">

            <p className="footer-title">Contact</p>

            <div className="flex-row gap-8p">
              <i className="fas fa-envelope"></i>
              <p className="content">info@petverse.com</p>
            </div>

            <div className="flex-row gap-8p">
              <i className="fas fa-map-pin"></i>
              <p className="content">Turkey, Karabük</p>
            </div>

            <div className="flex-row gap-8p">
              <i className="fas fa-phone-alt"></i>
              <p className="content">009082764241</p>
            </div>
          </div>

          {/* fourth flex child */}
          <div className="footer-item flex-col"
            style={
              { alignSelf: "center" }
            }>
            <p className="fancy">Powered By
              <span>&nbsp;&copy;&nbsp;R&R</span>
            </p>

          </div>

        </div>


      </div>
    </>
  )
}
export default Footer;
