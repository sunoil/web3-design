import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <div data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className ="navbar-logo-left-18 w-nav">
      <div className ="navbarcontainer-13 w-container">
        <div className ="navbar-content-14">
          <Link href="/" legacyBehavior>
            <a className="logo-link" aria-label="Home">
              <Image
                src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/68492fb235b07b4bcd6d03c1_Color-text-v2-2-(f)-3.png"
                loading="lazy" width="181.10003662109375" height="63.6773681640625" alt="TwoPiR logo"
                className ="color-text-v2-2-f-4" />
            </a>
          </Link>
          <nav role="navigation" className ="navbar-menu-14 w-nav-menu">
            <Link href="/my-deposit" legacyBehavior>
              <a className ="navbar w-nav-link"><div className ="text-166">Stake</div></a>
            </Link>
            <a href="#" className ="navbar w-nav-link is-static" onClick={(e) => e.preventDefault()}>
              <div className ="text-166">My deposit</div>
            </a>
            <a href="#" className ="navbar w-nav-link" onClick={(e) => e.preventDefault()}>
              <div className ="text-166">Docs</div>
            </a>
          </nav>
        </div>
        <div className ="w-nav-button">
          <div className ="w-icon-nav-menu"></div>
        </div>
      </div>
    </div>
  );
}


