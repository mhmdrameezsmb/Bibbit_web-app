import HeaderSub from "../components/headerSub";
import axios from "axios";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";






const Termsofuse = (props) => {

    
  const [rawHTML, setHtml] = useState("");

  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  
  

  useEffect(() => {
    setLoading(true);
    const res = axios
      .get(`${process.env.basePathUrl}page/terms/webview`)
      .then(function (response) {
        setHtml(response?.data);
        setLoading(false);
      })
      .catch(function (error) {
        // console.log(error);
      });
  }, []);

 

 
  return (
    <>
      <HeaderSub />

      <div className="container" style={{ height: "500px" }}>
        <div className="contentSection text-left">
          {loading && (
            <div className="sweet-loading text-center mt-5">
              <ClipLoader
                color="#ABCF39"
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}

          <div dangerouslySetInnerHTML={{ __html: rawHTML }}></div>
        </div>
      </div>
    </>
  );
};

export default Termsofuse;
