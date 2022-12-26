import Link from "next/link";
import Header from "../components/header";

const Error = () => {
    return ( 
        <>
        <Header/>
        <div className="container pt-5">
        <div className="row-6 p-5">
            </div>
    <div className="row-6">
        <div className="col-md-12">
            <div className="error-template">
                <h1>
                    Oops!</h1>
                <h2>
                    404 Page Not Found</h2>
                <div className="error-details">
                    Sorry, an error has occured, Requested page not found!
                </div>
                <div className="error-actions">
                    <Link href="/" className="btn btn-success btn-lg"><span className="glyphicon glyphicon-home"></span>
                        Take Me Home </Link>
                </div>
            </div>
        </div>
    </div>
</div>
        </>
     );
}
 
export default Error;