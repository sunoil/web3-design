import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MyDeposit() {
  return (
    <>
      <Head>
        <title>TwoPiR — My Deposit</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <div className="body">
        <Header />
        <div className="page-2">
          <div className="frame-54">
            <div className="list-4">
              <div className="titles-tokens">
                <div className="asset-to-supply">Asset to supply </div>
                <div className="asset-to-supply">Supplied balance</div>
                <div className="asset-to-supply">Estimated APR</div>
                <div className="asset-to-supply">Wallet balance</div>
              </div>
              <div className="usdt-line">
                <div className="frame-55"><button type="button"><Image src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99263ae178b0a3ee4284_USDT-logo.svg" loading="lazy" width="42.021751403808594" height="42.021751403808594" alt="" className="usdt-logo" /></button></div>
                <div className="text-178">USDT</div>
                <div className="usdt-supplied-balance">0$</div>
                <div className="usdt-apr">18,72%</div>
                <div className="usdt-supplied-balance">0$</div>
                <div className="frame-56"><button type="button"><Image src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e9926ecbb1c019ac317f2_1-button-%2B.svg" loading="lazy" width="47.52459716796875" height="47.52459716796875" alt="" className="_1-button" /></button><Image src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99263b722a1c5a3e689f_1-button--.svg" loading="lazy" width="47.52459716796875" height="47.52459716796875" alt="" className="_1-button" /></div>
              </div>
              <div className="usdt-line">
                <div className="frame-55"><Image src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99264faf0299759e9a29_USDC-logo.svg" loading="lazy" width="42.021751403808594" height="42.021751403808594" alt="" className="usdt-logo" /></div>
                <div className="text-178">USDC</div>
                <div className="usdc-supplied-balance">0$</div>
                <div className="usdt-apr">18,72%</div>
                <div className="usdt-supplied-balance">0$</div>
                <div className="frame-56"><Image src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99269d5085b84d8114f0_1-button-%2B.svg" loading="lazy" width="47.52459716796875" height="47.52459716796875" alt="" className="_1-button" /><Image src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e9926750409889bf96127_1-button--.svg" loading="lazy" width="47.52459716796875" height="47.52459716796875" alt="" className="_1-button" /></div>
              </div>
              <div className="usdt-line">
                <div className="frame-55"><Image src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99266f25f70111023531_USDC.e-logo.svg" loading="lazy" width="42.021751403808594" height="42.021751403808594" alt="" className="usdt-logo" /></div>
                <div className="text-178">USDC.e</div>
                <div className="usdt-supplied-balance">0$</div>
                <div className="usdt-apr">18,72%</div>
                <div className="usdt-supplied-balance">0$</div>
                <div className="frame-56"><Image src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99265fdddd6bcc9cc5d2_1-button-%2B.svg" loading="lazy" width="47.52459716796875" height="47.52459716796875" alt="" className="_1-button" /><Image src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99265fdddd6bcc9cc5ca_1-button--.svg" loading="lazy" width="47.52459716796875" height="47.52459716796875" alt="" className="_1-button" /></div>
              </div>
              <div className="usdt-line">
                <div className="frame-55"><Image src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684d85d97a2be3bd2c4de28c_arb.png" loading="lazy" width="42.021751403808594" height="42.021751403808594" alt="" className="arb" /></div>
                <div className="text-178">ARB</div>
                <div className="usdt-supplied-balance">0$</div>
                <div className="usdt-apr">18,72%</div>
                <div className="usdt-supplied-balance">0$</div>
                <div className="frame-56"><Image src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99268a38ff8e2a52b177_1-button-%2B.svg" loading="lazy" width="47.52459716796875" height="47.52459716796875" alt="" className="_1-button" /><Image src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99263b722a1c5a3e68a2_1-button--.svg" loading="lazy" width="47.52459716796875" height="47.52459716796875" alt="" className="_1-button" /></div>
              </div>
              <div className="usdt-line">
                <div className="frame-55"><Image src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99264faf0299759e9a34_ETH.svg" loading="lazy" width="30.51618003845215" height="42.02165985107422" alt="" className="eth" /></div>
                <div className="text-178">ETH</div>
                <div className="usdt-supplied-balance">0$</div>
                <div className="usdt-apr">18,72%</div>
                <div className="usdt-supplied-balance">0$</div>
                <div className="frame-56"><Image src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99261e9035bb1b4c1329_1-button-%2B.svg" loading="lazy" width="47.52459716796875" height="47.52459716796875" alt="" className="_1-button" /><Image src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e9926bae5d44a1ea41291_1-button--.svg" loading="lazy" width="47.52459716796875" height="47.52459716796875" alt="" className="_1-button" /></div>
              </div>
            </div>
            <div className="frame-57">
              <div className="balance">
                <div className="total-balance">Total Balance</div>
                <div className="text-179">$ 0.00</div>
              </div>
              <div className="apr-points">
                <div className="frame-58">
                  <div className="text-180">APR</div>
                  <div className="text-181">18,72%</div>
                </div>
                <div className="frame-58-copy">
                  <div className="text-180">Points</div>
                  <div className="text-182">0.00</div>
                </div>
              </div>
              <div className="frame-59">
                <div className="rewards">Rewards</div>
                <div className="frame-60">
                  <div className="frame-61"><Image src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99269f23631551450ec0_USDT-logo.svg" loading="lazy" width="41.88167953491211" height="41.87932586669922" alt="" className="usdt-logo-2" />
                    <div className="usdt-rewards">USDT</div>
                  </div>
                  <div className="text-183">0.00</div>
                </div>
                <div className="claim">
                  <div className="claim-2">Claim</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}


