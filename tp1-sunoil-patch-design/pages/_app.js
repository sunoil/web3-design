import '../public/css/normalize.css';
import '../public/css/webflow.css';
import '../public/css/yield-02a248.webflow.css';
import '../public/css/custom-overrides.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </Head>
      {/* Global background bubbles behind all pages */}
      <div className="global-bubbles" aria-hidden="true">
        <span className="bubble b1" />
        <span className="bubble b2" />
        <span className="bubble b3" />
        <span className="bubble b4" />
        <span className="bubble b5" />
        <span className="bubble b6" />
        <span className="bubble b7" />
        <span className="bubble b8" />
        <span className="bubble b9" />
        <span className="bubble b10" />
      </div>
      <div className="app-root">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
