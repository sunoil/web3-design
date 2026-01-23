import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './my-deposit.module.css';

export default function MyDeposit() {
  const STEP_AMOUNT = 100;

  const assets = [
    {
      key: 'usdt',
      symbol: 'USDT',
      logoUrl:
        'https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99263ae178b0a3ee4284_USDT-logo.svg',
      logoClassName: 'usdt-logo',
      logoWidth: 42,
      logoHeight: 42,
    },
    {
      key: 'usdc',
      symbol: 'USDC',
      logoUrl:
        'https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99264faf0299759e9a29_USDC-logo.svg',
      logoClassName: 'usdt-logo',
      logoWidth: 42,
      logoHeight: 42,
    },
    {
      key: 'usdc-e',
      symbol: 'USDC.e',
      logoUrl:
        'https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99266f25f70111023531_USDC.e-logo.svg',
      logoClassName: 'usdt-logo',
      logoWidth: 42,
      logoHeight: 42,
    },
    {
      key: 'arb',
      symbol: 'ARB',
      logoUrl:
        'https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684d85d97a2be3bd2c4de28c_arb.png',
      logoClassName: 'arb',
      logoWidth: 42,
      logoHeight: 42,
    },
    {
      key: 'eth',
      symbol: 'ETH',
      logoUrl:
        'https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99264faf0299759e9a34_ETH.svg',
      logoClassName: 'eth',
      /* keep original proportions (from Webflow) so it doesn't look oversized */
      logoWidth: 30,
      logoHeight: 42,
    },
  ];

  const [suppliedByAsset, setSuppliedByAsset] = useState(() => {
    const initial = {};
    assets.forEach((a) => {
      initial[a.key] = 0;
    });
    return initial;
  });

  const onDeposit = (assetKey) => {
    setSuppliedByAsset((prev) => ({
      ...prev,
      [assetKey]: (prev[assetKey] || 0) + STEP_AMOUNT,
    }));
  };

  const onWithdraw = (assetKey) => {
    setSuppliedByAsset((prev) => {
      const current = prev[assetKey] || 0;
      return {
        ...prev,
        [assetKey]: Math.max(0, current - STEP_AMOUNT),
      };
    });
  };

  return (
    <>
      <Head>
        <title>TwoPiR — My Deposit</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <div className="body">
        <Header />
        <div className={`page-2 ${styles.myDepositPage}`}>
          <div className={`frame-54 ${styles.layout}`}>
            <section className={`list-4 ${styles.panel}`} aria-label="My deposit assets">
              <div className={styles.table}>
                <div className={`${styles.row} ${styles.rowHead}`}>
                  <div className={styles.head}>Asset to apply</div>
                  <div className={styles.head}>Supplied balance</div>
                  <div className={styles.head}>Estimated APR</div>
                  <div className={styles.head}>Wallet balance</div>
                  <div className={`${styles.head} ${styles.headActions}`} aria-hidden="true" />
                </div>

                {assets.map((asset) => (
                  <div className={styles.row} key={asset.key}>
                    <div className={styles.asset}>
                      <Image
                        src={asset.logoUrl}
                        width={asset.logoWidth}
                        height={asset.logoHeight}
                        alt={`${asset.symbol} logo`}
                        className={asset.logoClassName}
                      />
                      <div className={styles.assetSymbol}>{asset.symbol}</div>
                    </div>
                    <div className={styles.cell}>{suppliedByAsset[asset.key] || 0}$</div>
                    <div className={`${styles.cell} ${styles.cellApr}`}>18,72%</div>
                    <div className={styles.cell}>0$</div>
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={styles.actionBtn}
                        aria-label={`Deposit ${asset.symbol}`}
                        onClick={() => onDeposit(asset.key)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className={`${styles.actionBtn} ${styles.actionBtnMinus}`}
                        aria-label={`Withdraw ${asset.symbol}`}
                        onClick={() => onWithdraw(asset.key)}
                      >
                        −
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <aside className={`frame-57 ${styles.sidebar}`} aria-label="My deposit summary">
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
                  <div className="frame-61">
                    <Image
                      src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99269f23631551450ec0_USDT-logo.svg"
                      loading="lazy"
                      width="41.88167953491211"
                      height="41.87932586669922"
                      alt=""
                      className="usdt-logo-2"
                    />
                    <div className="usdt-rewards">USDT</div>
                  </div>
                  <div className="text-183">0.00</div>
                </div>
                <button type="button" className={`claim ${styles.claimBtn}`}>
                  <div className="claim-2">Claim</div>
                </button>
              </div>
            </aside>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}


