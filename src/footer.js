import React from "react";

export default function Footer() {
    return (
        <footer>
            <p className="copyright">© 2020 Speedköbra - All rights reserved</p>
            <div className="logos">
                <a href="https://www.instagram.com/speedkobra/">
                    <img
                        src="/insta.png"
                        alt=""
                        className="social-logo"
                        target="_blank"
                    />
                </a>
                <a href="https://www.facebook.com/speedkobra666">
                    <img
                        src="/fb.png"
                        alt=""
                        className="social-logo"
                        target="_blank"
                    />
                </a>
                <a href="https://www.youtube.com/channel/UC57goUK4nTrwOGdhchCw8TA">
                    <img
                        src="/you.png"
                        alt=""
                        className="social-logo"
                        target="_blank"
                    />
                </a>
                <a href="https://open.spotify.com/artist/6bwLhL6tsar6mpLQTvnxr9">
                    <img
                        src="/spotify.png"
                        target="_blank"
                        className="social-logo bc"
                    />
                </a>
            </div>
        </footer>
    );
}
