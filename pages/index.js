import Image from "next/image";
import { Inter } from "@next/font/google";
import { toast } from "react-toastify";
import Testimonials from "../components/Testimonials";
import Header from "../components/header";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Formik } from "formik";
import { values } from "lodash";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";


const inter = Inter({ subsets: ["latin"] });

const initialValues = {
  name: "",
  short_name: "",
  address: "",
  status: "",
  url: "",
  image: null,
};
const SUPPORTED_FORMATS = ["image/jpg", "image/png"];

export default function Home() {
  const [firstName, setfirstNameError] = useState(false);
  const [lastName, setlastNameError] = useState(false);
  const [email, emailError] = useState(false);
  const [mobile, mobileError] = useState(false);
  const [vechileNumber, vechileNumberError] = useState(false);
  const [vechileModel, vechileModelError] = useState(false);
  const [emailFormat, emailFormatError] = useState(false);
  const [phFormat, phFormatError] = useState(false);

  const [selectedFileError, setSelectedFileError] = useState(false);
  const [formatImg, setSelectedFileFormatError] = useState(false);
  const [format2Img, setSelectedFileFormat2Error] = useState(false);
  const [imageSize, setImageSizeError] = useState(false);
  const [imageSize2, setImageSize2Error] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrlRc, setImageUrlRc] = useState("");
  const [loader, setLoader] = useState(false);
  const [loaderRc, setLoaderRc] = useState(false);

  const [selectedFile2Error, setSelectedFile2Error] = useState(false);

  let FILE_SIZE = 2097152;
  let SUPPORTED_FORMATS = ["jpeg", "jpg", "png"];
  const validationSchema = Yup.object().shape({
    // firstName: Yup.string().required("First Name is required"),
    // lastName: Yup.string().required("Last Name is required"),
    // mobile: Yup.string()
    //   .required("Phone Number is required")
    //   .matches(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/, "Invalid Number"),
    // email: Yup.string().required("Email is required").email("Email is invalid"),
    // vechileNumber: Yup.string().required("Vehicle Number is required"),
    // vechileModel: Yup.string().required("Vehicle Model is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  let [imageFile, setImageFile] = useState("");

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  // console.log({errors});

  const onSubmit = (data) => {
    // console.log(data?.license[0]);

    const types = ["image/jpeg", "image/png", "image/jpg"];

    let error = false;

    if (data?.firstName === "") {
      setfirstNameError(true);
      error = true;
    } else if (data?.firstName != "") {
      setfirstNameError(false);
    }

    if (data?.lastName === "") {
      setlastNameError(true);
      error = true;
    } else if (data?.lastName != "") {
      setlastNameError(false);
    }

    if (data?.email === "") {
      emailError(true);
      error = true;
    } else if (data?.email != "") {
      emailError(false);
      var validRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (validRegex.test(data?.email)) {
        emailFormatError(false);
      } else {
        error = true;
        emailFormatError(true);
      }
    }

    if (data?.mobile === "") {
      mobileError(true);
      error = true;
    } else if (data?.mobile != "") {
      mobileError(false);

      var validRegexPh = /^\d{10}$/;
      if (validRegexPh.test(data?.mobile)) {
        phFormatError(false);
      } else {
        error = true;
        phFormatError(true);
      }
    }

    if (data?.vechileNumber === "") {
      vechileNumberError(true);
      error = true;
    } else if (data?.vechileNumber != "") {
      vechileNumberError(false);
    }

    if (data?.vechileModel === "") {
      vechileModelError(true);
      error = true;
    } else if (data?.vechileModel != "") {
      vechileModelError(false);
    }

    if (imageUrl === "") {
      setSelectedFileError(true);
      error = true;
    } else {
      setSelectedFileError(false);
    }

    if (imageUrlRc === "") {
      setSelectedFile2Error(true);
      error = true;
    } else {
      setSelectedFile2Error(false);
    }

    if (error === true) {
      return;
    } else {
      console.log(data);
      // return;
      setSelectedFileError(false);
      setlastNameError(false);
      setfirstNameError(false);
      setSelectedFile2Error(false);
      emailError(false);
      mobileError(false);
      vechileNumberError(false);
      vechileModelError(false);
      setSelectedFileFormatError(false);
      setSelectedFileFormat2Error(false);
      setImageSize2Error(false);
      setImageSizeError(false);

      axios
        .post(`${process.env.basePathUrl}driver/driver-request`, {
          first_name: data?.firstName,
          last_name: data?.lastName,
          email: data?.email,
          phone_code: "+91",
          phone: data?.mobile,
          vehicle_number: data?.vechileNumber,
          vehicle_model: data?.vechileModel,
          license_image_url: imageUrl,
          vehicle_rc_image_url: imageUrlRc,
        })
        .then(
          (response) => {
            console.log(response, "res");

            toast.success(response?.data?.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            reset();
            setImageUrlRc("");
            setImageUrl("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          },
          (error) => {
            console.log(error);
            toast.error(error?.response?.data?.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        );
    }
  };

  const close = () => {
    setImageUrl("");
  };

  const closeRc = () => {
    setImageUrlRc("");
  };

  const awsUpload = (event) => {
    setLoader(true);
    setImageUrl(false);

    console.log(event.target.files[0]);
    const types = ["image/jpeg", "image/png", "image/jpg"];
    setSelectedFileError(false);

    if (types.includes(event?.target?.files[0]?.type)) {
      setSelectedFileFormatError(false);
      setSelectedFileError(false);
      if (event?.target?.files[0]?.size >= 1000000) {
        setLoader(false);

        setImageSizeError(true);
        // error = true;
      } else {
        setImageSizeError(false);
        const file = event?.target?.files[0];

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = async () => {
          const reqBody = JSON.stringify({
            file: fileReader.result,
            type: file.type,
          });

          await fetch("/api/fileupload", {
            method: "POST",
            body: reqBody,
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setImageUrl(data.data.image);
              setLoader(false);
            })
            .finally(() => {
              // e.target.reset();
            });
        };
      }
    } else {
      setLoader(false);

      setSelectedFileFormatError(true);
      setSelectedFileError(false);
      setImageSizeError(false);

      // error = true;
    }
  };

  const awsUploadRc = (event) => {
    setLoaderRc(true);
    setImageUrlRc(false);
    console.log(event.target.files[0]);
    const types = ["image/jpeg", "image/png", "image/jpg"];

    setSelectedFile2Error(false);

    if (types.includes(event?.target?.files[0]?.type)) {
      setSelectedFileFormat2Error(false);
      setSelectedFile2Error(false);
      if (event?.target?.files[0]?.size >= 1000000) {
        setImageSize2Error(true);
        setLoaderRc(false);

        // error = true;
      } else {
        setImageSize2Error(false);
        const file = event?.target?.files[0];

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = async () => {
          const reqBody = JSON.stringify({
            file: fileReader.result,
            type: file.type,
          });

          await fetch("/api/fileupload", {
            method: "POST",
            body: reqBody,
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setImageUrlRc(data.data.image);
              setLoaderRc(false);
            })
            .finally(() => {
              // e.target.reset();
            });
        };
      }
    } else {
      setLoaderRc(false);
      setSelectedFileFormat2Error(true);
      setSelectedFile2Error(false);
      setImageSize2Error(false);

      // error = true;
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="banner" id="home">
        <div className="container">
          <div className="row banner_row">
            <div className="col-lg-6 banner_left_col">
              <div className="bnr_left">
                <h1>
                  Dealer at{" "}
                  <span className="brk">
                    <span>your</span> Doorstep.
                  </span>
                </h1>
              </div>
            </div>
            <div className="col-lg-6 banner_right_col">
              <div className="bnr_right">
                <Image
                  src="/images/bnr.svg"
                  alt=""
                  width={500}
                  height={500}
                  quality={100}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="services" id="services">
        <h2>Our Service</h2>
        <div className="serv_list">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="serv_item">
                  <div className="si_hd">
                    <Image
                      src="/images/service-icon.svg"
                      alt=""
                      quality={100}
                      width={500}
                      height={500}
                      loading="lazy"
                    />
                  </div>
                  <div className="si_body">
                    <h2>What we do?</h2>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled
                    it to make a type specimen book.
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="serv_item">
                  <div className="si_hd">
                    <Image
                      src="/images/service-icon.svg"
                      alt=""
                      quality={100}
                      width={500}
                      height={500}
                      loading="lazy"
                    />
                  </div>
                  <div className="si_body">
                    <h2>How we do?</h2>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled
                    it to make a type specimen book.
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="serv_item">
                  <div className="si_hd">
                    <Image
                      src="/images/service-icon.svg"
                      alt=""
                      quality={100}
                      width={500}
                      height={500}
                      loading="lazy"
                    />
                  </div>
                  <div className="si_body">
                    <h2>Where we do?</h2>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled
                    it to make a type specimen book.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="services why_special" id="why_special">
        <h2>Why we are Special</h2>
        <div className="serv_list why_special_list">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="serv_item ws_item">
                  <div className="si_hd ws_hd">
                    <Image
                      src="/images/cus.svg"
                      alt=""
                      quality={100}
                      width={500}
                      height={500}
                      loading="lazy"
                    />
                  </div>
                  <div className="si_body ws_body">
                    <h2>Customer Support</h2>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="serv_item ws_item">
                  <div className="si_hd ws_hd">
                    <Image
                      src="/images/delivery.svg"
                      alt=""
                      quality={100}
                      width={500}
                      height={500}
                      loading="lazy"
                    />
                  </div>
                  <div className="si_body ws_body">
                    <h2>Fast Delivery</h2>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="serv_item ws_item">
                  <div className="si_hd ws_hd">
                    <Image
                      src="/images/full-service.svg"
                      alt=""
                      quality={100}
                      width={500}
                      height={500}
                      loading="lazy"
                    />
                  </div>
                  <div className="si_body ws_body">
                    <h2>Full Service</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rider_detail_center" id="rider_detail">
        <div className="container">
          <div className="rdc_wrapper">
            <div className="rdc_hd">
              <h2>Are you a rider</h2>
              ADD YOUR DETAILS
            </div>
            <div className="row">
              <div className="col-lg-9">
                <div className="rdc_form">
                  <Formik>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row rdc_form_row">
                        <div className="rdc_form_col p-0">
                          <div className="form-group">
                            <input
                              name="firstName"
                              placeholder="First Name"
                              type="text"
                              autoComplete="off"
                              className="form-control"
                              {...register("firstName")}
                            />
                            {firstName && (
                              <div className="error-custom">
                                First Name is required
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="rdc_form_col p-0">
                          <div className="form-group">
                            <input
                              name="lastName"
                              placeholder="Last Name"
                              type="text"
                              autoComplete="off"
                              className="form-control"
                              {...register("lastName")}
                            />
                            {lastName && (
                              <div className="error-custom">
                                Last Name is required
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="rdc_form_col p-0">
                          <div className="form-group">
                            <input
                              name="email"
                              placeholder="Email"
                              type="text"
                              autoComplete="off"
                              className="form-control"
                              {...register("email")}
                            />
                            {email && (
                              <div className="error-custom">
                                Email is required
                              </div>
                            )}
                            {emailFormat && (
                              <div className="error-custom">
                                Inavlid email format
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="rdc_form_col p-0">
                          <div className="form-group">
                            <input
                              name="mobile"
                              placeholder="Phone Number"
                              type="text"
                              autoComplete="off"
                              className="form-control"
                              {...register("mobile")}
                            />
                            {mobile && (
                              <div className="error-custom">
                                Phone Number is required
                              </div>
                            )}
                            {phFormat && (
                              <div className="error-custom">
                                Invalid Phone Number
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="rdc_form_col p-0">
                          <div className="form-group">
                            <input
                              name="vechileNumber"
                              placeholder="Vehicle Number"
                              type="text"
                              autoComplete="off"
                              className="form-control"
                              {...register("vechileNumber")}
                            />
                            {vechileNumber && (
                              <div className="error-custom">
                                Vehicle Number is required
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="rdc_form_col p-0">
                          <div className="form-group">
                            <input
                              name="vechileModel"
                              placeholder="Vehicle Model"
                              type="text"
                              autoComplete="off"
                              className="form-control"
                              {...register("vechileModel")}
                            />
                            {vechileModel && (
                              <div className="error-custom">
                                Vehicle Model is required
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="rdc_form_col p-0">
                          {loader ? (
                           <div className="sweet-loading text-center p-3">
                           <ClipLoader
                             color="#ABCF39"
                             size={100}
                             aria-label="Loading Spinner"
                             data-testid="loader"
                           />
                         </div>
                          ) : (
                            <>
                              {!imageUrl && (
                                <div className="form-group upload">
                                  <div className="file-upload">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="52.313"
                                      height="50.825"
                                      viewBox="0 0 52.313 50.825"
                                    >
                                      <g
                                        id="upload-svgrepo-com"
                                        transform="translate(0 -6.893)"
                                        opacity="0.8"
                                      >
                                        <rect
                                          id="Rectangle_42"
                                          data-name="Rectangle 42"
                                          width="52.313"
                                          height="3.236"
                                          transform="translate(0 54.483)"
                                        />
                                        <path
                                          id="Path_398"
                                          data-name="Path 398"
                                          d="M177.892,13.087V49.629h3.236V13.087l3.71,3.71,2.288-2.288L179.51,6.893l-7.616,7.616,2.288,2.288Z"
                                          transform="translate(-153.353 0)"
                                        />
                                      </g>
                                    </svg>
                                    <input
                                      type="file"
                                      name="license"
                                      className="form-control"
                                      accept="image/*"
                                      onChange={(event) => {
                                        awsUpload(event);
                                      }}
                                      onInput={(event) => {
                                        awsUpload(event);
                                      }}
                                      {...register("license")}
                                    />
                                  </div>

                                  <span>Upload License</span>
                                </div>
                              )}
                            </>
                          )}

                          {imageUrl && (
                            <div className="form-group upload-img">
                              <div className="file-upload-img">
                                <span
                                  className="close closeicon"
                                  onClick={close}
                                >
                                  <svg
                                    width="24px"
                                    height="24px"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g data-name="Layer 2">
                                      <g data-name="close">
                                        <rect
                                          width="24"
                                          height="24"
                                          transform="rotate(180 12 12)"
                                          opacity="0"
                                        />
                                        <path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
                                      </g>
                                    </g>
                                  </svg>
                                </span>
                                <Image
                                  src={imageUrl}
                                  alt="Landscape picture"
                                  width={400}
                                  height={200}
                                  className="pt-3"
                                  quality={100}
                                />
                                <input
                                  type="file"
                                  name="license"
                                  className="form-control"
                                  accept="image/*"
                                  onChange={(event) => {
                                    awsUpload(event);
                                  }}
                                  onInput={(event) => {
                                    awsUpload(event);
                                  }}
                                  {...register("license")}
                                />
                              </div>

                              {/* <span>Upload License</span> */}
                            </div>
                          )}

                          {selectedFileError && (
                            <div className="error-custom">
                              License is required
                            </div>
                          )}
                          {formatImg && (
                            <div className="error-custom">
                              Invalid license image format
                            </div>
                          )}
                          {imageSize && (
                            <div className="error-custom">
                              License image size must be below 1 MB
                            </div>
                          )}
                        </div>
                        <div className="rdc_form_col p-0">
                          {loaderRc ? (
                            <div className="sweet-loading text-center p-3">
                            <ClipLoader
                              color="#ABCF39"
                              size={100}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                          </div>
                          ) : (
                            <>
                              {!imageUrlRc && (
                                <div className="form-group upload">
                                  <div className="file-upload">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="52.313"
                                      height="50.825"
                                      viewBox="0 0 52.313 50.825"
                                    >
                                      <g
                                        id="upload-svgrepo-com"
                                        transform="translate(0 -6.893)"
                                        opacity="0.8"
                                      >
                                        <rect
                                          id="Rectangle_42"
                                          data-name="Rectangle 42"
                                          width="52.313"
                                          height="3.236"
                                          transform="translate(0 54.483)"
                                        />
                                        <path
                                          id="Path_398"
                                          data-name="Path 398"
                                          d="M177.892,13.087V49.629h3.236V13.087l3.71,3.71,2.288-2.288L179.51,6.893l-7.616,7.616,2.288,2.288Z"
                                          transform="translate(-153.353 0)"
                                        />
                                      </g>
                                    </svg>

                                    <input
                                      type="file"
                                      name="vehicleRc"
                                      className="form-control"
                                      accept="image/*"
                                      {...register("vehicleRc")}
                                      onChange={(event) => {
                                        awsUploadRc(event);
                                      }}
                                      onInput={(event) => {
                                        awsUploadRc(event);
                                      }}
                                    />
                                  </div>
                                  <span>Upload Vehicle RC</span>
                                </div>
                              )}
                            </>
                          )}

                          {imageUrlRc && (
                            <div className="form-group upload-img">
                              <div className="file-upload-img">
                                <span
                                  className="close closeicon"
                                  onClick={closeRc}
                                >
                                  <svg
                                    width="24px"
                                    height="24px"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g data-name="Layer 2">
                                      <g data-name="close">
                                        <rect
                                          width="24"
                                          height="24"
                                          transform="rotate(180 12 12)"
                                          opacity="0"
                                        />
                                        <path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
                                      </g>
                                    </g>
                                  </svg>
                                </span>
                                <Image
                                  src={imageUrlRc}
                                  alt="Landscape picture"
                                  width={400}
                                  height={200}
                                  quality={100}
                                  className="pt-3"
                                />
                                <input
                                  type="file"
                                  name="license"
                                  className="form-control"
                                  accept="image/*"
                                  onChange={(event) => {
                                    awsUploadRc(event);
                                  }}
                                  onInput={(event) => {
                                    awsUploadRc(event);
                                  }}
                                  {...register("vehicleRc")}
                                />
                              </div>

                              {/* <span>Upload License</span> */}
                            </div>
                          )}

                          {selectedFile2Error && (
                            <div className="error-custom">
                              Vehicle RC is required
                            </div>
                          )}
                          {format2Img && (
                            <div className="error-custom">
                              Invalid Vehicle rc image format
                            </div>
                          )}

                          {imageSize2 && (
                            <div className="error-custom">
                              Invalid Vehicle rc image size must be below 1 MB
                            </div>
                          )}
                        </div>
                        <div className="rdc_form_col p-0">
                          <div className="form-group">
                            <button type="submit" className="submitBtn">
                              {" "}
                              Submit{" "}
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </Formik>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="form_right">
                  <Image
                    src="/images/form.svg"
                    alt=""
                    quality={100}
                    width={500}
                    height={700}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dwld_app_section">
        <div className="container">
          <div className="row das_row">
            <div className="col-lg-3">
              <div className="da_left">
                <Image
                  src="/images/dowload.svg"
                  alt=""
                  quality={100}
                  width={500}
                  height={720}
                  loading="lazy"
                />
              </div>
            </div>
            <div className="col-lg-9">
              <div className="da_right">
                <div className="app_item">
                  <h2>Download the Bibbit App</h2>
                  <div className="app_detail">
                    <span>Schedule your pickup hassle-free.</span>
                    <span>Fast | Secure | Reasonable</span>
                  </div>
                  <div className="app_icons">
                    <div className="ai_item">
                      <Image
                        src="/images/apple.svg"
                        alt=""
                        quality={100}
                        width={200}
                        height={200}
                        loading="lazy"
                      />
                    </div>
                    <div className="ai_item">
                      <Image
                        src="/images/playstore.svg"
                        alt=""
                        quality={100}
                        width={200}
                        height={200}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
                <div className="app_item">
                  <h2>Download the Bibbit App</h2>
                  <div className="app_detail">
                    <span>Ready to Earn more, join us.</span>
                  </div>
                  <div className="app_icons">
                    <div className="ai_item">
                      <Image
                        src="/images/apple.svg"
                        alt=""
                        quality={100}
                        width={200}
                        height={200}
                        loading="lazy"
                      />
                    </div>
                    <div className="ai_item">
                      <Image
                        src="/images/playstore.svg"
                        alt=""
                        quality={100}
                        width={200}
                        height={200}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Testimonials />
    </div>
  );
}
