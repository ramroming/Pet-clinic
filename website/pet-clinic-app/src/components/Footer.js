import react from "react";

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
                        <p className="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, odio ullam quisquam necessitatibus est ad omnis, hic doloremque dolorem molestiae voluptates vel minus nihil vitae cum! At aspernatur deserunt nemo.</p>

                        {/* third flex item */}

                        <div className="social flex-row gap-16p  ">
                            <i className="fab fa-facebook">
                                <a href=""></a>
                            </i>
                            <i className="fab fa-instagram">
                                <a href=""></a>
                            </i>
                            <i className="fab fa-twitter">
                                <a href=""></a>
                            </i>
                        </div>
                    </div>
                    {/* second flex child */}
                    <div className="footer-item flex-col   gap-24p">
                        {/* first item */}
                        <p className="footer-title">Working Hours</p>
                        {/* second item */}
                        <p className="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos dolor pariatur distinctio. Aut deleniti voluptas reiciendis mollitia, illum molestiae corporis?</p>
                        {/* third item */}
                        <div className="flex-col">

                            {/* first flex */}
                            <div className="flex-row fjust-between">
                                <p className="content">Monday - Friday:</p>
                                <p className="content">9:00 - 17:00</p>
                            </div>

                            {/* second flex */}
                            <div className="flex-row fjust-between">
                                <p className="content">Monday - Friday:</p>
                                <p className="content">9:00 - 17:00</p>
                            </div>
                            {/* third flex */}

                            <div className="flex-row fjust-between">
                                <p className="content">Monday - Friday:</p>
                                <p className="content">9:00 - 17:00</p>
                            </div>
                        </div>
                    </div>

                    {/* third flex child */}
                    <div className="footer-item flex-col gap-24p">

                        <p className="footer-title">Contact</p>

                        <div className="flex-row gap-8p">
                            <i class="fas fa-envelope"></i>
                            <p className="content">info@petverse.com</p>
                        </div>

                        <div className="flex-row gap-8p">
                            <i class="fas fa-map-pin"></i>
                            <p className="content">Turkey, Karabük</p>
                        </div>

                        <div className="flex-row gap-8p">
                            <i class="fas fa-phone-alt"></i>
                            <p className="content">009082764241</p>
                        </div>
                    </div>

                    {/* fourth flex child */}
                    <div className="footer-item flex-col"
                        style={
                            {alignSelf: "center"}
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
