// Import necessary modules
import Head from 'next/head'; // For managing the <head> section of the HTML document
import React from 'react'; // React library for building UI components
import { loadData } from '../web3/funcs'; // Function to load Web3 data (defined elsewhere)
import Link from 'next/link'; // Next.js Link component for navigation
import Image from 'next/image'; // Optimized image component in Next.js
import { useEffect, useState } from 'react'; // React hooks for managing state and lifecycle events
import Script from 'next/script';// Next.js Script component for js scripts
// Main component for the Home page
export default function Home() {
  
  return (
    <>

      <Head>
        <meta charset="utf-8" />
        <title>Salexey&#x27;s Stupendous Site</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="Webflow" name="generator" />
        <link
            href="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/css/salexeys-stupendous-site.webflow.shared.db29cfd44.css"
            rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        
        <link href="https://cdn.prod.website-files.com/img/favicon.ico" rel="shortcut icon" type="image/x-icon" />
        <link href="https://cdn.prod.website-files.com/img/webclip.png" rel="apple-touch-icon" />
      </Head>
      
        
      
      <Script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" strategy="afterInteractive" />
      <Script
        id="webfont-load"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            WebFont.load({
              google: {
                families: [
                  "Exo:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic",
                  "Inter:regular"
                ]
              }
            });
          `
        }}
      />

      <Script
        id="webflow-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(o, c) {
              var n = c.documentElement, t = " w-mod-";
              n.className += t + "js";
              ("ontouchstart" in o || (o.DocumentTouch && c instanceof DocumentTouch)) && 
              (n.className += t + "touch");
            }(window, document);
          `
        }}
      />
      <body className ="body">
        <div className ="page-5">
            <div data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease"
                role="banner" className ="navbar-logo-left-18 w-nav">
                <div className ="navbarcontainer-13 w-container">
                    <div className ="navbar-content-14"><Image
                            src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/68492fb235b07b4bcd6d03c1_Color-text-v2-2-(f)-3.png"
                            loading="lazy" width="181.10003662109375" height="63.6773681640625" alt=""
                            className ="color-text-v2-2-f-4" />
                        <nav role="navigation" className ="navbar-menu-14 w-nav-menu"><a href="#" className ="navbar w-nav-link">
                                <div className ="text-166">Stake</div>
                            </a><a href="#" className ="navbar w-nav-link">
                                <div className ="text-166">My deposit</div>
                            </a><a href="#" className ="navbar w-nav-link">
                                <div className ="text-166">Docs</div>
                            </a></nav>
                    </div>
                    <div className ="w-nav-button">
                        <div className ="w-icon-nav-menu"></div>
                    </div>
                </div>
            </div>
            <div className ="first-section-3">
                <div className ="container-29">
                    <div className ="column-75">
                        <div className ="content-style-9">
                            <p className ="text-167">
                            <p className ="text-167"><span className ="text-11-6">Grow</span><span className ="text-11-7"> your yield
                                </span><span className ="text-11-8">securely
                                </span><span className ="text-11-7">and more </span><span
                                    className ="text-11-8">profitably</span><span className ="text-11-7"> than a traditional
                                </span><span className ="text-11-6">bank</span><span className ="text-11-7"> deposit</span></p>
                            </p>
                        </div>
                        <div className ="text-168">Maximize your returns with our secure and efficient DeFi platform</div><a
                            href="#" target="_blank" className ="button-style-3">
                            <div className ="stake-now-8">LAUNCH DAPP</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className ="about-twopir-3">
                <div className ="frame-46">
                    <div className ="frame-47">
                        <div className ="text-169">
                            <div className ="text-169"><span className ="about-twopir-4">About </span><span
                                    className ="about-twopir-5">TwoPiR</span></div>
                        </div>
                    </div>
                    <div className ="frame-48">
                        <div className ="text-169">
                            <div className ="text-169"><span
                                    className ="twopir-is-an-innovative-crypto-banking-that-maximizes-your-earnings-on-deposits-through-flexible-sta-4">TwoPiR
                                    is an </span><span
                                    className ="twopir-is-an-innovative-crypto-banking-that-maximizes-your-earnings-on-deposits-through-flexible-sta-5">innovative
                                    crypto banking</span><span
                                    className ="twopir-is-an-innovative-crypto-banking-that-maximizes-your-earnings-on-deposits-through-flexible-sta-4">
                                    that maximizes your earnings on deposits through flexible staking and yield
                                    optimization. Using advanced algorithms, it identifies top opportunities for
                                </span><span
                                    className ="twopir-is-an-innovative-crypto-banking-that-maximizes-your-earnings-on-deposits-through-flexible-sta-6">high
                                    returns with minimal risk</span><span
                                    className ="twopir-is-an-innovative-crypto-banking-that-maximizes-your-earnings-on-deposits-through-flexible-sta-4">,
                                    supporting diverse tokens and prioritizing security.</span></div>
                        </div>
                    </div>
                </div><Image
                    src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/6849307b31c820220acb1b27_Color-v2-1.png"
                    loading="lazy" width="403.3171691894531" height="405.62713623046875" alt=""
                    className ="color-text-v2-2-f-4" />
            </div>
            <div className ="second-section-3">
                <div className ="frame-49">
                    <div className ="text-169">
                        <div className ="text-169"><span className ="track-of-the-progress-and-tvl-of-supported-networks-7">Track of
                                the </span><span
                                className ="track-of-the-progress-and-tvl-of-supported-networks-8">Progress</span><span
                                className ="track-of-the-progress-and-tvl-of-supported-networks-7"> and
    </span><span
                                className ="track-of-the-progress-and-tvl-of-supported-networks-9">TVL$</span><span
                                className ="track-of-the-progress-and-tvl-of-supported-networks-7"> of Supported Networks</span>
                        </div>
                    </div>
                </div>
                <div className ="frame-50"><Image
                        src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e9808131b97c5ba4d9daa_list.svg"
                        loading="lazy" width="540.5281982421875" height="690.2129516601562" alt="" className ="list-3" /></div>
                <Image src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e98084faf0299759dfc50_Group-29.svg"
                    loading="lazy" width="1063.407958984375" height="894.303955078125" alt="" className ="group-32" />
            </div>
            <div className ="video-section-3">
                <div className ="circles-2"><Image
                        src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684d85d97176fdd04cca4d34_Group-26.svg"
                        loading="lazy" width="98.86583709716797" height="98.86583709716797" alt="" className ="group-33" />
                    <div className ="text-169">
                        <div className ="text-169"><span className ="guide-for-starting-metamask-setup-2">Guide </span><span
                                className ="track-of-the-progress-and-tvl-of-supported-networks-7">for starting </span><span
                                className ="track-of-the-progress-and-tvl-of-supported-networks-8">MetaMask </span><span
                                className ="track-of-the-progress-and-tvl-of-supported-networks-7">setup</span></div>
                    </div><Image
                        src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/6849307bdcc849b3f138fdfc_Group-27.svg"
                        loading="lazy" width="98.86583709716797" height="98.86583709716797" alt="" className ="group-33" />
                </div>
                <div className ="frame-51"><Image
                        src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/6849330cc112be56dfb41054_Video-1-1.png"
                        loading="lazy" width="888" height="500" alt=""
                        srcset="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/6849330cc112be56dfb41054_Video-1-1-p-500.png 500w, https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/6849330cc112be56dfb41054_Video-1-1-p-800.png 800w, https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/6849330cc112be56dfb41054_Video-1-1.png 889w"
                        sizes="(max-width: 991px) 100vw, 888px" className ="color-text-v2-2-f-4" /><Image
                        src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/6849330bd53157b6b6da6165_Video-2---small-1.png"
                        loading="lazy" width="281" height="500" alt="" className ="color-text-v2-2-f-4" /></div>
            </div>
            <div className ="third-section-3">
                <div className ="frame-52">
                    <div className ="frame-53">
                        <div className ="text-169">
                            <div className ="text-169"><span className ="twopir-rewards-program-2">TwoPiR</span><span
                                    className ="twopir-rewards-program-3"> Rewards Program</span></div>
                        </div>
                        <div className ="text-169">
                            <div className ="text-169"><span
                                    className ="introducing-the-twopir-rewards-program-participants-can-earn-points-through-engaging-in-various-on-c-4">Introducing
                                    the </span><span
                                    className ="introducing-the-twopir-rewards-program-participants-can-earn-points-through-engaging-in-various-on-c-5">TwoPiR</span><span
                                    className ="introducing-the-twopir-rewards-program-participants-can-earn-points-through-engaging-in-various-on-c-4">
                                    Rewards Program! Participants can earn points through engaging in various on-chain
                                    activities. These points will be converted into </span><span
                                    className ="introducing-the-twopir-rewards-program-participants-can-earn-points-through-engaging-in-various-on-c-6">PIR</span><span
                                    className ="introducing-the-twopir-rewards-program-participants-can-earn-points-through-engaging-in-various-on-c-4">
                                    tokens, giving you the opportunity to maximize your rewards and become part of our
                                    growing ecosystem. Stay tuned for more updates!</span></div>
                        </div>
                    </div>
                </div><Image
                    src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684d85d96cdaf7e5252ba887_Group-28.svg"
                    loading="lazy" width="637.9027099609375" height="359.8247375488281" alt="" className ="group-34" />
            </div>
            <div className ="footer-11">
                <div className ="columns-36">
                    <div className ="small-columns-11">
                        <div className ="column-78">
                            <div className ="text-184">Support</div>
                            <div className ="content-style-14">
                                <div className ="footer-links-29">
                                    <div className ="link-style-4">How it works</div>
                                    <div className ="link-style-4">Pricing</div>
                                    <div className ="link-style-4">Demo</div>
                                </div>
                            </div>
                        </div>
                        <div className ="column-79">
                            <div className ="text-185">Analytics</div>
                            <div className ="content-style-15">
                                <div className ="footer-links-30">
                                    <div className ="link-style-4">How it works</div>
                                    <div className ="link-style-4">Pricing</div>
                                    <div className ="link-style-4">Demo</div>
                                </div>
                            </div>
                        </div>
                        <div className ="column-79">
                            <div className ="text-184">Services</div>
                            <div className ="content-style-16">
                                <div className ="footer-links-31">
                                    <div className ="link-style-4">Blog post name goes here</div>
                                    <div className ="link-style-4">Blog post name goes here</div>
                                    <div className ="link-style-4">Blog post name goes here</div>
                                    <div className ="link-style-4">See all resources</div>
                                </div>
                            </div>
                        </div>
                        <div className ="column-79">
                            <div className ="content-style-17">
                                <div className ="text-185">Social</div>
                                <div className ="actions-152">
                                    <div className ="text-186">Discord</div>
                                    <div className ="text-187">twopir.social</div>
                                </div>
                                <div className ="actions-153">
                                    <div className ="text-186">Twitter</div>
                                    <div className ="text-188">@TwoPiR_</div>
                                </div>
                                <div className ="actions-153">
                                    <div className ="text-186">Telegram</div>
                                    <div className ="text-188">twopir.social</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className ="copyright-11">
                    <div className ="text-189">© 2024 TwoPiR</div>
                </div>
            </div>
        </div>
        <div className ="page-2">
            <div data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease"
                role="banner" className ="navbar-logo-left-18 w-nav">
                <div className ="navbarcontainer-13 w-container">
                    <div className ="navbar-content-14"><Image
                            src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/68492fb235b07b4bcd6d03c1_Color-text-v2-2-(f)-3.png"
                            loading="lazy" width="181.10003662109375" height="63.6773681640625" alt=""
                            className ="color-text-v2-2-f-4" />
                        <nav role="navigation" className ="navbar-menu-14 w-nav-menu"><a href="#" className ="navbar w-nav-link">
                                <div className ="text-166">Stake</div>
                            </a><a href="#" className ="navbar w-nav-link">
                                <div className ="text-166">My deposit</div>
                            </a><a href="#" className ="navbar w-nav-link">
                                <div className ="text-166">Docs</div>
                            </a></nav>
                    </div>
                    <div className ="w-nav-button">
                        <div className ="w-icon-nav-menu"></div>
                    </div>
                </div>
            </div>
            <div className ="frame-54">
                
                <div className ="list-4">
                    <div className ="titles-tokens">
                        <div className ="asset-to-supply">Asset
                            to supply </div>
                        <div className ="asset-to-supply">Supplied
                            balance</div>
                        <div className ="asset-to-supply">Estimated
                            APR</div>
                        <div className ="asset-to-supply">Wallet
                            balance</div>
                    </div>
                    <div className ="usdt-line">
                        
                        <div className ="frame-55"><button type = "button" ><Image
                                src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99263ae178b0a3ee4284_USDT-logo.svg"
                                loading="lazy" width="42.021751403808594" height="42.021751403808594" alt=""
                                className ="usdt-logo" /></button></div> 
                        <div className ="text-178">USDT</div>
                        <div className ="usdt-supplied-balance">0$</div>
                        <div className ="usdt-apr">18,72%</div>
                        <div className ="usdt-supplied-balance">0$</div>
                        <div className  ="frame-56" ><button type = "button" ><Image
                                src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e9926ecbb1c019ac317f2_1-button-%2B.svg"
                                loading="lazy" width="47.52459716796875" height="47.52459716796875" alt=""
                                className ="_1-button" /></button><Image
                                src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99263b722a1c5a3e689f_1-button--.svg"
                                loading="lazy" width="47.52459716796875" height="47.52459716796875" alt=""
                                className ="_1-button" /></div>
                    </div>
                    <div className ="usdt-line">
                        <div className ="frame-55"><Image
                                src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99264faf0299759e9a29_USDC-logo.svg"
                                loading="lazy" width="42.021751403808594" height="42.021751403808594" alt=""
                                className ="usdt-logo" /></div>
                        <div className ="text-178">USDC</div>
                        <div className ="usdc-supplied-balance">0$</div>
                        <div className ="usdt-apr">18,72%</div>
                        <div className ="usdt-supplied-balance">0$</div>
                        <div className ="frame-56"><Image
                                src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99269d5085b84d8114f0_1-button-%2B.svg"
                                loading="lazy" width="47.52459716796875" height="47.52459716796875" alt=""
                                className ="_1-button" /><Image
                                src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e9926750409889bf96127_1-button--.svg"
                                loading="lazy" width="47.52459716796875" height="47.52459716796875" alt=""
                                className ="_1-button" /></div>
                    </div>
                    <div className ="usdt-line">
                        <div className ="frame-55"><Image
                                src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99266f25f70111023531_USDC.e-logo.svg"
                                loading="lazy" width="42.021751403808594" height="42.021751403808594" alt=""
                                className ="usdt-logo" /></div>
                        <div className ="text-178">USDC.e</div>
                        <div className ="usdt-supplied-balance">0$</div>
                        <div className ="usdt-apr">18,72%</div>
                        <div className ="usdt-supplied-balance">0$</div>
                        <div className ="frame-56"><Image
                                src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99265fdddd6bcc9cc5d2_1-button-%2B.svg"
                                loading="lazy" width="47.52459716796875" height="47.52459716796875" alt=""
                                className ="_1-button" /><Image
                                src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99265fdddd6bcc9cc5ca_1-button--.svg"
                                loading="lazy" width="47.52459716796875" height="47.52459716796875" alt=""
                                className ="_1-button" /></div>
                    </div>
                    <div className ="usdt-line">
                        <div className ="frame-55"><Image
                                src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684d85d97a2be3bd2c4de28c_arb.png"
                                loading="lazy" width="42.021751403808594" height="42.021751403808594" alt="" className ="arb" />
                        </div>
                        <div className ="text-178">ARB</div>
                        <div className ="usdt-supplied-balance">0$</div>
                        <div className ="usdt-apr">18,72%</div>
                        <div className ="usdt-supplied-balance">0$</div>
                        <div className ="frame-56"><Image
                                src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99268a38ff8e2a52b177_1-button-%2B.svg"
                                loading="lazy" width="47.52459716796875" height="47.52459716796875" alt=""
                                className ="_1-button" /><Image
                                src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99263b722a1c5a3e68a2_1-button--.svg"
                                loading="lazy" width="47.52459716796875" height="47.52459716796875" alt=""
                                className ="_1-button" /></div>
                    </div>
                    <div className ="usdt-line">
                        <div className ="frame-55"><Image
                                src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99264faf0299759e9a34_ETH.svg"
                                loading="lazy" width="30.51618003845215" height="42.02165985107422" alt="" className ="eth" />
                        </div>
                        <div className ="text-178">ETH</div>
                        <div className ="usdt-supplied-balance">0$</div>
                        <div className ="usdt-apr">18,72%</div>
                        <div className ="usdt-supplied-balance">0$</div>
                        <div className ="frame-56"><Image
                                src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99261e9035bb1b4c1329_1-button-%2B.svg"
                                loading="lazy" width="47.52459716796875" height="47.52459716796875" alt=""
                                className ="_1-button" /><Image
                                src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e9926bae5d44a1ea41291_1-button--.svg"
                                loading="lazy" width="47.52459716796875" height="47.52459716796875" alt=""
                                className ="_1-button" /></div>
                    </div>
                </div>
                <div className ="frame-57">
                    <div className ="balance">
                        <div className ="total-balance">Total Balance
                        </div>
                        <div className ="text-179">$ 0.00</div>
                    </div>
                    <div className ="apr-points">
                        <div className ="frame-58">
                            <div className ="text-180">APR</div>
                            <div className ="text-181">18,72%</div>
                        </div>
                        <div className ="frame-58-copy">
                            <div className ="text-180">Points</div>
                            <div className ="text-182">0.00</div>
                        </div>
                    </div>
                    <div className ="frame-59">
                        <div className ="rewards">Rewards</div>
                        <div className ="frame-60">
                            <div className ="frame-61"><Image
                                    src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99269f23631551450ec0_USDT-logo.svg"
                                    loading="lazy" width="41.88167953491211" height="41.87932586669922" alt=""
                                    className ="usdt-logo-2" />
                                <div className ="usdt-rewards">USDT</div>
                            </div>
                            <div className ="text-183">0.00</div>
                        </div>
                        <div className ="claim">
                            <div className ="claim-2">Claim</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className ="footer-11">
                <div className ="columns-36">
                    <div className ="small-columns-11">
                        <div className ="column-78">
                            <div className ="text-184">Support</div>
                            <div className ="content-style-14">
                                <div className ="footer-links-29">
                                    <div className ="link-style-4">How it works</div>
                                    <div className ="link-style-4">Pricing</div>
                                    <div className ="link-style-4">Demo</div>
                                </div>
                            </div>
                        </div>
                        <div className ="column-79">
                            <div className ="text-185">Analytics</div>
                            <div className ="content-style-15">
                                <div className ="footer-links-30">
                                    <div className ="link-style-4">How it works</div>
                                    <div className ="link-style-4">Pricing</div>
                                    <div className ="link-style-4">Demo</div>
                                </div>
                            </div>
                        </div>
                        <div className ="column-79">
                            <div className ="text-184">Services</div>
                            <div className ="content-style-16">
                                <div className ="footer-links-31">
                                    <div className ="link-style-4">Blog post name goes here</div>
                                    <div className ="link-style-4">Blog post name goes here</div>
                                    <div className ="link-style-4">Blog post name goes here</div>
                                    <div className ="link-style-4">See all resources</div>
                                </div>
                            </div>
                        </div>
                        <div className ="column-79">
                            <div className ="content-style-17">
                                <div className ="text-185">Social</div>
                                <div className ="actions-152">
                                    <div className ="text-186">Discord</div>
                                    <div className ="text-187">twopir.social</div>
                                </div>
                                <div className ="actions-153">
                                    <div className ="text-186">Twitter</div>
                                    <div className ="text-188">@TwoPiR_</div>
                                </div>
                                <div className ="actions-153">
                                    <div className ="text-186">Telegram</div>
                                    <div className ="text-188">twopir.social</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className ="copyright-11">
                    <div className ="text-189">© 2024 TwoPiR</div>
                </div>
            </div>
        </div>
        <Script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=66c9e08a6edbb91f35dede99"
            type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
            crossorigin="anonymous"></Script>
        <Script src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/js/webflow.a9ba356d.f9d79368f06abced.js"
            type="text/javascript"></Script>
         <div
          data-animation="default"
          data-collapse="medium"
          data-duration={400}
          data-easing="ease"
          data-easing2="ease"
          role="banner"
          className="navbar-logo-left-14 w-nav"
         >
          <div className="navbarcontainer-11 w-container">
            <div className="w-nav-button">
              <div className="w-icon-nav-menu" />
            </div>
          </div>
         </div>
    </body>

      
      
     

      
      
    </>
  )
}


