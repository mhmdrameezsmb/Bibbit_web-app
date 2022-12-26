import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/footer'
import Header from '../components/header'
import '../scss/styles.scss'
import '../styles/animate.css'
import '../styles/globals.css'


export default function App({ Component, pageProps }) {

  return (

    
    <>
<meta charSet="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
  
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
   
    <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
  integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
  crossOrigin='anonymous'
/>
<link
  rel="stylesheet"
  type="text/css"
charSet='UTF-8'
  href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
/>
<link
  rel="stylesheet"
  type="text/css"
  href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
/>

    
    {/* <ToastContainer limit={1} /> */}
   
    <title>Bibit Web</title>
    <div className='main-body'>
    <ToastContainer limit={1} />

      <Component {...pageProps} />
      <Footer/>
      </div>

      </>
  )
}
