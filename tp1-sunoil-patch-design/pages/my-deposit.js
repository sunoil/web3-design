import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './my-deposit.module.css';
import React from 'react'; // React library for building UI components
import { loadData } from 'tp1-sunoil-patch-design/components/web3/funcs.js'; // Function to load Web3 data (defined elsewhere)
import Link from 'next/link'; // Next.js Link component for navigation
import Image from 'next/image'; // Optimized image component in Next.js
import { useEffect, useState } from 'react'; // React hooks for managing state and lifecycle events
import Script from 'next/script';// Next.js Script component for js scripts

export default function MyDeposit() {
    const [seenDeposit, setDeposit] = React.useState(null); // Tracks deposit visibility
    const [USDTpusdtDeposit, setUSDTpusdtDeposit] = React.useState(null); // Tracks deposits for USDT-pUSDT
    const [seenReward, setReward] = React.useState(null); // Tracks reward visibility
    const [startTime, setstartTime] = React.useState(null); // Tracks contract start time
    const [lockTime, setlockTime] = React.useState(null); // Tracks contract lock time
    const [contract, setContract] = React.useState(null); // Stores the main contract instance
    const [stakingLogic, setStakingLogic] = React.useState(null); // Stores the main contract instance
    const [stakingStorage, setStakingStorage] = React.useState(null); // Stores the main contract instance
    const [addressAccount, setAddressAccount] = React.useState(null); // Stores the user's account address
    const [contractAddress, setContractAddress] = React.useState(null); // Stores the contract's address
    const [stakingStorageAddress, setstakingStorageAddress] = React.useState(null); // Stores the contract's address
    const [stakingLogicAddress, setstakingLogicAddress] = React.useState(null); // Stores the contract's address
    const [userPoints, setUserPoints] = useState('0');
    const [unstakeRequests, setUnstakeRequests] = useState([]);
    const [activeTab, setActiveTab] = useState('stake'); // 'stake', 'unstake' or 'withdraw' tab in pop-up
    

    // Tokens and their contract instances
    const [usdt, setUsdt] = React.useState(null); // USDT token
    const [usdtcontract, setUSDTContract] = React.useState(null); // USDT contract
    const [weth, setWETH] = React.useState(null); // WETH token
    const [wethcontract, setWETHContract] = React.useState(null); // WETH contract
    const [usdc, setUSDC] = React.useState(null); // USDC token
    const [usdccontract, setUSDCContract] = React.useState(null); // USDC contract
    const [usdce, setUSDCe] = React.useState(null); // USDC.e token
    const [usdcecontract, setUSDCEContract] = React.useState(null); // USDC.e contract
    const [pusdt, setPUSDT] = React.useState(null); // pUSDT token
    const [pusdtcontract, setPUSDTContract] = React.useState(null); // pUSDT contract
    const [arb, setARB] = React.useState(null); // arb token
    const [arbcontract, setARBContract] = React.useState(null); // arb contract
    // State variables for user input
    const [inputValuedeposit, setInputValuedeposit] = React.useState(''); // Value to deposit
    const [inputvalueapprove, setInputValueapprove] = React.useState(''); // Value to approve
    

    // Function to initialize Web3 and load contract data
    const handleWeb3 = async () => {
        const data = await loadData(); // Call loadData to get Web3-related data

        // Update state with data from Web3
        setDeposit(data.stakedBalance); 
        setReward(data.pendingRewards); 
        setUserPoints(data.userPoints); 
        setUnstakeRequests(data.unstakeRequests); 
        setUSDTpusdtDeposit(data.USDTpusdtDeposit);
        setUSDTContract(data.usdt_Web3_Conection);
        setWETHContract(data.weth_Web3_Conection);
        setUSDCContract(data.usdc_Web3_Conection);
        setUSDCEContract(data.usdce_Web3_Conection);
        setPUSDTContract(data.pusdt_Web3_Conection);
        setARBContract(data.arb_Web3_Conection);

        setContract(data.Contract_Web3_Conection);
        setStakingStorage(data.StakingStorage);
        setStakingLogic(data.StakingLogic);

        setAddressAccount(data.addressAccount);

        setContractAddress(data.Contract_Address);
        setstakingStorageAddress(data.StakingStorage_Address);
        setstakingLogicAddress(data.StakingLogic_Address);


        setUsdt(data.usdt);
        setWETH(data.weth);
        setUSDC(data.usdc);
        setUSDCe(data.usdce);
        setPUSDT(data.pusdt);
        setARB(data.arb);
    };

    
    

    

    // 1.Mint
    const handleDepositLogic = async () => {
        if (!inputValuedeposit) return alert("Enter amount");
        const amountWei = web3.utils.toWei(inputValuedeposit, 'ether');
        
        const data = await stakingLogic.methods.deposit(amountWei).encodeABI();
        const nonce = await web3.eth.getTransactionCount(addressAccount);
    
        const estimateGas = await stakingLogic.methods.deposit(amountWei).estimateGas({
            from: addressAccount,
            to: stakingLogicAddress,
            nonce,
            data,
        });
    
        const params = {
            from: addressAccount,
            to: stakingLogicAddress,
            gas: web3.utils.toHex(estimateGas),
            gasPrice: web3.utils.toHex(web3.utils.toWei('1', 'gwei')),
            data,
        };
    
        ethereum.request({ method: 'eth_sendTransaction', params: [params] })
            .then((res) => {
                const interval = setInterval(() => {
                    web3.eth.getTransactionReceipt(res, (err, rec) => {
                        if (rec) {
                            handleWeb3();
                            setInputValuedeposit('');
                            clearInterval(interval);
                        }
                    });
                }, 500);
            });
    };

    // 2. Unstake
    const handleUnstake = async () => {
        if (!inputValuedeposit) return alert("Enter amount");
        const amountWei = web3.utils.toWei(inputValuedeposit, 'ether');
        
        const data = await stakingLogic.methods.unstake(amountWei).encodeABI();
        const nonce = await web3.eth.getTransactionCount(addressAccount);
    
        const estimateGas = await stakingLogic.methods.unstake(amountWei).estimateGas({
            from: addressAccount,
            to: stakingLogicAddress,
            nonce,
            data,
        });
    
        const params = {
            from: addressAccount,
            to: stakingLogicAddress,
            gas: web3.utils.toHex(estimateGas),
            gasPrice: web3.utils.toHex(web3.utils.toWei('1', 'gwei')),
            data,
        };
    
        ethereum.request({ method: 'eth_sendTransaction', params: [params] })
            .then((res) => {
                const interval = setInterval(() => {
                    web3.eth.getTransactionReceipt(res, (err, rec) => {
                        if (rec) {
                            handleWeb3();
                            clearInterval(interval);
                        }
                    });
                }, 500);
            });
    };

    // 3. Claim
    const handleClaim = async () => {
        const data = await stakingLogic.methods.claimReward().encodeABI();
        const nonce = await web3.eth.getTransactionCount(addressAccount);
    
        const estimateGas = await stakingLogic.methods.claimReward().estimateGas({
            from: addressAccount,
            to: stakingLogicAddress,
            nonce,
            data,
        });
    
        const params = {
            from: addressAccount,
            to: stakingLogicAddress,
            gas: web3.utils.toHex(estimateGas),
            gasPrice: web3.utils.toHex(web3.utils.toWei('1', 'gwei')),
            data,
        };
    
        ethereum.request({ method: 'eth_sendTransaction', params: [params] })
            .then((res) => {
                const interval = setInterval(() => {
                    web3.eth.getTransactionReceipt(res, (err, rec) => {
                        if (rec) {
                            handleWeb3();
                            clearInterval(interval);
                        }
                    });
                }, 500);
            });
    };
    const handleWithdrawReady = async () => {
        const data = await stakingLogic.methods.withdrawReadyFunds().encodeABI();
        const nonce = await web3.eth.getTransactionCount(addressAccount);
    
        const estimateGas = await stakingLogic.methods.withdrawReadyFunds().estimateGas({
            from: addressAccount,
            to: stakingLogicAddress,
            nonce,
            data,
        });
    
        const params = {
            from: addressAccount,
            to: stakingLogicAddress,
            gas: web3.utils.toHex(estimateGas),
            gasPrice: web3.utils.toHex(web3.utils.toWei('1', 'gwei')),
            data,
        };
    
        ethereum.request({ method: 'eth_sendTransaction', params: [params] })
            .then((res) => {
                const interval = setInterval(() => {
                    web3.eth.getTransactionReceipt(res, (err, rec) => {
                        if (rec) {
                            handleWeb3();
                            clearInterval(interval);
                        }
                    });
                }, 500);
            });
    };

    useEffect(() => {
        handleWeb3();
    }, []); // The empty array ensures this runs only once when the component mounts



    async function getEthToUsdRate() {
        //const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        //const data = await response.json();
        //return data.ethereum.usd;
    }

    async function convertEthToUsd(amountInEth) {
        const rate = await getEthToUsdRate();
        return amountInEth * rate;
    }

    // Example usage
    const amountInEth = convertEthToUsd(seenDeposit); // Replace this with the actual amount of ETH
    convertEthToUsd(seenDeposit).then(amountInUsd => {
        // console.log(`${seenDeposit} ETH is approximately $${amountInUsd.toFixed(2)} USD`);
        // console.log({amountInEth})
    });
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
        'https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/684e99264faf0299759e9a29_USDC-logo.svg',
      logoClassName: 'usdc-e-logo',
      logoWidth: 42,
      logoHeight: 42,
      symbolClassName: 'assetSymbolSm',
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
                      <div
                        className={`${styles.assetSymbol} ${
                          asset.symbolClassName ? styles[asset.symbolClassName] : ''
                        }`}
                      >
                        {asset.symbol}
                      </div>
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


