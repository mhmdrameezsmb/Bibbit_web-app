import Image from "next/image";
import Link from "next/link";
import React from "react";
function Footer() {
  return (
    <>
      <div className="footer_section">
        <div className="container">
          <div className="row foo_row">
            <div className="col-lg-8">
              <div className="row foo_row_row">
                <div className="col-lg-4 foo_col">
                  <div className="foo_col_in">
                    <Image
                      src="/images/bibit-black.svg"
                      alt=""
                      quality={100}
                      width={200}
                      height={200}
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="col-lg-4 foo_col">
                  <div className="foo_col_in">
                    <h3>Contact</h3>
                    <ul>
                      <li>
                        <span>4390 US-1, Suite 110</span>{" "}
                        <span>Princeton, NJ 08540</span>
                      </li>
                      <li>
                        <span>1-609-331-9194 / 1-609-919-9816</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 foo_col">
                  <div className="foo_col_in">
                    <h3>Links</h3>
                    <ul>
                      <li>
                        <span>
                          <a href="#home">Home</a>
                        </span>
                      </li>
                      <li>
                        <span>
                          <a href="#services">Our Service</a>
                        </span>
                      </li>
                      <li>
                        <span>
                          <a href="#why_special">Why we are Special?</a>{" "}
                        </span>
                      </li>
                      <li>
                        <span>
                          <a href="#rider_detail">Become a Rider</a>
                        </span>
                      </li>
                      <li>
                        <span>
                          <a href="#testimonials">Testimonials</a>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 align-self-center">
              <div className="foo_col_in">
                <ul>
                  <li>
                    <span>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.{" "}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="foo_at_bottom">
        <div className="container">
          <div className="fai">
            <div className="foo_left">
              <span>Copyright © 2022 BIbbit. All Rights Reserved.</span>
            </div>
            <div className="foo_right">
              <ul>
                <li>
                  <Link href={"/terms-of-use"}>Terms of Use</Link>
                </li>
                <li>
                  <Link href={"/privacy-policy"}>Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
