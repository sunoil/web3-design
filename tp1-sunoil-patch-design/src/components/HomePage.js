// src/components/HomePage.js
import React from 'react';

const HomePage = () => {
  return (
    <div className="desktop---2">
      <div data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="navbar-logo-left w-nav">
        <div className="navbarcontainer w-container">
          <div className="navbar-content">
            <div className="navbar-brand">
              <div className="text-3">TwoPiR</div>
            </div>
            <nav role="navigation" className="navbar-menu w-nav-menu">
              <a href="#" className="navbar-link w-nav-link">
                <div className="text-4">Stake</div>
              </a>
              <a href="#" className="navbar-link w-nav-link">
                <div className="text-4">My deposit</div>
              </a>
              <a href="#" className="navbar-link w-nav-link">
                <div className="text-4">Docs</div>
              </a>
            </nav>
          </div>
          <div className="w-nav-button">
            <div className="w-icon-nav-menu"></div>
          </div>
        </div>
      </div>
      <div className="hero-heading-left">
        <div className="container">
          <div className="column">
            <div className="column">
              <p className="error-888a6603-1d7a-0c0f-7917-cc13304b233b">Start earning money in Cryptocurrency easier and more profitable than a bank deposit!</p>
              
            </div>
            <div className="actions">
              <a href="#" className="button">
                <div className="text-5">stake now</div>
              </a>
            </div>
          </div>
          <div className="column-2">
            <div className="image-wrapper">
              <img src="images/IMG_6232.png" loading="lazy" width="519" height="519" alt="" srcSet="images/IMG_6232-p-500.png 500w, images/IMG_6232.png 520w" sizes="(max-width: 479px) 59px, (max-width: 767px) 45vw, (max-width: 991px) 52vw, 19vw" className="img_6232" />
            </div>
          </div>
        </div>
      </div>
      <img src="images/Vectors-Wrapper_1.svg" loading="lazy" width="1067" height="98" alt="" className="vectors-wrapper-4" />
      <div className="hero-heading-right">
        <div className="container-2">
          <div className="column">
            <div className="column">
              <div className="text-6">Personal support</div>
              <div className="text-7">A full tour of the main functionality and assistance with all questions from the starting stages, which will make investing accessible even to beginners.</div>
            </div>
          </div>
          <div className="column">
            <div className="column">
              <div className="text-6">Flexibility</div>
              <div className="text-7">Manage your finances without freezing your assets for a long period of time. You can lock and withdraw your profit after receiving payments three times a month.</div>
            </div>
          </div>
        </div>
        <div className="container-3">
          <div className="column">
            <div className="column">
              <div className="text-6">Increased profitability</div>
              <div className="text-7">Benefit from an APR of 32.4% with systematic payouts delivered three times a month.</div>
            </div>
          </div>
          <div className="column">
            <div className="column">
              <div className="text-6">Points reward</div>
              <div className="text-7">Guaranteed bonus points converted into TwoPIRcoins. Enhance your profit with points.</div>
            </div>
          </div>
        </div>
        <div className="text-8">More details</div>
      </div>
      <div className="section">
        <div className="container-4">
          <div className="text-9">Supported chains</div>
          <div className="text-10">A one-stop Yield that operates your money across all platforms</div>
          <img src="images/Vectors-Wrapper.svg" loading="lazy" width="536" height="316.584716796875" alt="" className="vectors-wrapper-5" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
