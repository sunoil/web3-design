import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './my-deposit.module.css';
import React from 'react'; // React library for building UI components
import { loadData } from '../components/web3/funcs'; // Function to load Web3 data (defined elsewhere)
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Head>
        <title>TwoPiR — My Deposit</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <div className="body">
        <Header />
        <div className={`page-2 ${styles.myDepositPage} ${isModalOpen ? 'is-blurred' : ''}`}>
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
                        onClick={() => {
                          setActiveTab('stake');
                          setIsModalOpen(true);
                        }}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className={`${styles.actionBtn} ${styles.actionBtnMinus}`}
                        aria-label={`Withdraw ${asset.symbol}`}
                        onClick={() => {
                          setActiveTab('unstake');
                          setIsModalOpen(true);
                        }}
                      >
                        −
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            {false && (
              <div
                className="deposit-modal-overlay"
                role="dialog"
                aria-modal="true"
                onClick={() => setIsModalOpen(false)}
              >
                <div className="deposit-modal" onClick={(event) => event.stopPropagation()}>
                  {activeTab === 'stake' && (
                    <div className="pop-up-1">
                        <div className="top-buttons">
                            <div className={`stake ${activeTab === 'stake' ? 'active' : ''}`} onClick={() => setActiveTab('stake')}>Stake</div>
                            <div className="unstake" onClick={() => setActiveTab('unstake')}>Unstake</div>
                            <div className="unstake" onClick={() => setActiveTab('withdraw')}>Withdraw</div>
                        </div>
                        <div className="frame-you-stake">
                            <div className="text-190">You Stake</div>
                            <div className="frame-63">
                                <input 
                                    type='number' 
                                    value={inputValuedeposit} 
                                    onChange={(e) => setInputValuedeposit(e.target.value)} 
                                    placeholder="Amount" 
                                />
                                <div className="frame-35">
                                    <div className="frame-36"><Image
                                        src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/68a011679cd01fc0ef59767a_ethereum-eth-logo-diamond-purple-2.svg"
                                        loading="lazy" width="8.716163635253906" height="14.381670951843262" alt=""
                                        className="ethereum-eth-logo-diamond-purple-2" />
                                        <div className="text-192">USDT</div>
                                    </div>
                                    <div className="text-193">Balance: {seenDeposit}</div>
                                </div>
                            </div>
                        </div>
                        <div className="frame-you-receive"><Image
                            src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/68a011679cd01fc0ef59767e_Arrow-.svg"
                            loading="lazy" width="44" height="0.0000019233070815971587" alt="" className="arrow" />
                            <div className="text-194">You Receive</div>
                            <div className="frame-64">
                                <input 
                                    type='number' 
                                    value={inputValuedeposit} 
                                    onChange={(e) => setInputValuedeposit(e.target.value)} 
                                    placeholder="Amount" 
                                />
                                <div className="frame-35">
                                    <div className="frame-36"><Image
                                        src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/68a0116715ed8b7467a84ffb_ethereum-eth-logo-diamond-purple-3.svg"
                                        loading="lazy" width="8.491949081420898" height="14.011717796325684" alt=""
                                        className="ethereum-eth-logo-diamond-purple-2" />
                                        <div className="text-192">pUSDT</div>
                                    </div>
                                    <div className="text-193">Balance: {seenDeposit}</div>
                                </div>
                            </div>
                        </div>
                        <div className="rewards-eligible-gas-2">
                            <div className="rewards-eligible-gas">
                                <div className="text-195">Rewards Eligible</div>
                                <div className="text-196">|</div>
                                <div className="text-195">Gas $0,98</div>
                            </div>
                            <div className="frame-rewards-eligible">
                                <div className="text-197">All assets will be available to withdraw 7 days after unstaking.</div>
                            </div>
                            <div className="button-container">
                                {!addressAccount ? (
                                    <div className="button-connect-wallet" onClick={handleWeb3} style={{cursor: 'pointer'}}>
                                        <div className="text-198">Connect Wallet</div>
                                    </div>
                                ) : (
                                    <div className="button-connect-wallet" onClick={handleDepositLogic} style={{cursor: 'pointer', backgroundColor: '#00ff88'}}>
                                        <div className="text-198" style={{color: '#000'}}>Stake USDT</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    )}
                    {activeTab === 'unstake' && (
                    <div className="pop-up-4">
                        <div className="top-buttons">
                            <div className="unstake" onClick={() => setActiveTab('stake')}>Stake</div>
                            <div className="stake">Unstake</div>
                            <div className="unstake" onClick={() => setActiveTab('withdraw')}>Withdraw</div>
                        </div>
                        <div className="you-unstake"></div>
                        <div className="rewards-eligible-gas-2">
                            <div className="you-unstake-2">You Unstake</div>
                            <div className="frame-67">
                                <input 
                                    type='number' 
                                    value={inputValuedeposit} 
                                    onChange={(e) => setInputValuedeposit(e.target.value)} 
                                    placeholder="Amount" 
                                />
                                <div className="frame-68">
                                    <div className="frame-69"><Image
                                        src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/68a0120be05f0d4621e68f22_ethereum-eth-logo-diamond-purple-3.svg"
                                        loading="lazy" width="8.491949081420898" height="14.011717796325684" alt=""
                                        className="ethereum-eth-logo-diamond-purple-2" />
                                        <div className="text-201">pUSDT</div>
                                    </div>
                                    <div className="text-202">Balance: {seenDeposit}</div>
                                </div>
                            </div>
                            <div className="rewards-eligible-gas-3">
                                <div className="text-195">Rewards Eligible</div>
                                <div className="text-196">|</div>
                                <div className="text-195">Gas $0,98</div>
                            </div>
                            <div className="frame-rewards-eligible">
                                <div className="text-197">After 7 days after unstaking you are allowed to withdraw</div>
                            </div>
                            <div className="frame-rewards-eligible">
                                <div className="text-197">All assets will be available to withdraw 7 days after unstaking.</div>
                            </div>
                            {!addressAccount ? (
                                <div className="button-connect-wallet" onClick={handleWeb3}>Connect Wallet</div>
                            ) : (
                                <div className="button-connect-wallet" onClick={handleUnstake}>Confirm Unstake</div>
                            )}
                        </div>
                    
                    </div>
                    )}
                    {activeTab === 'withdraw' && (
                    <div className="pop-up-3">
                        <div className="top-buttons-2">
                            <div className="unstake" onClick={() => setActiveTab('stake')}>Stake </div>
                            <div className="unstake" onClick={() => setActiveTab('unstake')}>Unstake </div>
                            <div className="stake">Withdraw </div>
                        </div>
                    
                        <div className="rewards-eligible-gas-2">
                            <div className="you-unstake-2">Withdrawal Status</div>
                    
                            <div className="frame-66" style={{ height: 'auto', minHeight: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px', padding: '15px' }}>
                                {/* ПЕРЕВІРКА: чи є хоча б один активний запит */}
                                {unstakeRequests.filter(r => !r.withdrawn).length > 0 ? (
                                    unstakeRequests.filter(r => !r.withdrawn).map((req, index) => {
                                        const status = getStatus(req.unlockTime, req.withdrawn);
                                        return (
                                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', width: '100%', borderBottom: '1px solid #333', paddingBottom: '5px' }}>
                                                <div className="text-199" style={{fontSize: '14px'}}>
                                                    {window.web3.utils.fromWei(req.amount, 'ether')} USDT
                                                </div>
                                                <div className="text-197" style={{ color: status === 'Ready' ? '#00ff88' : '#aaa', fontSize: '14px' }}>
                                                    {status}
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    /* ІНФОРМАЦІЯ ЯКЩО НЕМАЄ ЗАПИТІВ */
                                    <div style={{ textAlign: 'center' }}>
                                        <div className="text-199" style={{ fontSize: '16px', color: '#ffcc00', marginBottom: '8px' }}>
                                            No active requests found
                                        </div>
                                        <div className="text-197" style={{ fontSize: '13px', opacity: 0.7 }}>
                                            To withdraw your funds, you need to go to the <b>Unstake</b> tab first and wait for the 7-day unlock period.
                                        </div>
                                    </div>
                                )}
                            </div>
                    
                            <div className="rewards-eligible-gas-4">
                                <div className="text-195">Rewards Eligible</div>
                                <div className="text-196">|</div>
                                <div className="text-195">Gas ~$0.98</div>
                            </div>
                    
                            <div className="button-container" style={{ marginTop: '15px' }}>
                                {!addressAccount ? (
                                    <div className="button-connect-wallet" onClick={handleWeb3} style={{cursor: 'pointer'}}>
                                        <div className="text-198">Connect Wallet</div>
                                    </div>
                                ) : (
                                    <div 
                                        className="button-connect-wallet" 
                                        onClick={unstakeRequests.some(r => !r.withdrawn && getStatus(r.unlockTime, r.withdrawn) === 'Ready') ? handleWithdrawReady : null}
                                        style={{ 
                                            cursor: 'pointer', 
                                            opacity: unstakeRequests.some(r => !r.withdrawn && getStatus(r.unlockTime, r.withdrawn) === 'Ready') ? 1 : 0.3,
                                            filter: unstakeRequests.some(r => !r.withdrawn && getStatus(r.unlockTime, r.withdrawn) === 'Ready') ? 'none' : 'grayscale(1)'
                                        }}
                                    >
                                        <div className="text-198">Claim Ready Funds</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    )}
                </div>
              </div>
            )}

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
        {isModalOpen && (
          <div
            className="deposit-modal-overlay"
            role="dialog"
            aria-modal="true"
            onClick={() => setIsModalOpen(false)}
          >
            <div className="deposit-modal" onClick={(event) => event.stopPropagation()}>
              {activeTab === 'stake' && (
                <div className="pop-up-1">
                    <div className="top-buttons">
                        <div className={`stake ${activeTab === 'stake' ? 'active' : ''}`} onClick={() => setActiveTab('stake')}>Stake</div>
                        <div className="unstake" onClick={() => setActiveTab('unstake')}>Unstake</div>
                        <div className="unstake" onClick={() => setActiveTab('withdraw')}>Withdraw</div>
                    </div>
                    <div className="frame-you-stake">
                        <div className="text-190">You Stake</div>
                        <div className="frame-63">
                            <input 
                                type='number' 
                                value={inputValuedeposit} 
                                onChange={(e) => setInputValuedeposit(e.target.value)} 
                                placeholder="Amount" 
                            />
                            <div className="frame-35">
                                <div className="frame-36"><Image
                                    src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/68a011679cd01fc0ef59767a_ethereum-eth-logo-diamond-purple-2.svg"
                                    loading="lazy" width="8.716163635253906" height="14.381670951843262" alt=""
                                    className="ethereum-eth-logo-diamond-purple-2" />
                                    <div className="text-192">USDT</div>
                                </div>
                                <div className="text-193">Balance: {seenDeposit}</div>
                            </div>
                        </div>
                    </div>
                    <div className="frame-you-receive"><Image
                        src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/68a011679cd01fc0ef59767e_Arrow-.svg"
                        loading="lazy" width="44" height="0.0000019233070815971587" alt="" className="arrow" />
                        <div className="text-194">You Receive</div>
                        <div className="frame-64">
                            <input 
                                type='number' 
                                value={inputValuedeposit} 
                                onChange={(e) => setInputValuedeposit(e.target.value)} 
                                placeholder="Amount" 
                            />
                            <div className="frame-35">
                                <div className="frame-36"><Image
                                    src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/68a0116715ed8b7467a84ffb_ethereum-eth-logo-diamond-purple-3.svg"
                                    loading="lazy" width="8.491949081420898" height="14.011717796325684" alt=""
                                    className="ethereum-eth-logo-diamond-purple-2" />
                                    <div className="text-192">pUSDT</div>
                                </div>
                                <div className="text-193">Balance: {seenDeposit}</div>
                            </div>
                        </div>
                    </div>
                    <div className="rewards-eligible-gas-2">
                        <div className="rewards-eligible-gas">
                            <div className="text-195">Rewards Eligible</div>
                            <div className="text-196">|</div>
                            <div className="text-195">Gas $0,98</div>
                        </div>
                        <div className="frame-rewards-eligible">
                            <div className="text-197">All assets will be available to withdraw 7 days after unstaking.</div>
                        </div>
                        <div className="button-container">
                            {!addressAccount ? (
                                <div className="button-connect-wallet" onClick={handleWeb3} style={{cursor: 'pointer'}}>
                                    <div className="text-198">Connect Wallet</div>
                                </div>
                            ) : (
                                <div className="button-connect-wallet" onClick={handleDepositLogic} style={{cursor: 'pointer', backgroundColor: '#00ff88'}}>
                                    <div className="text-198" style={{color: '#000'}}>Stake USDT</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                )}
                {activeTab === 'unstake' && (
                <div className="pop-up-4">
                    <div className="top-buttons">
                        <div className="unstake" onClick={() => setActiveTab('stake')}>Stake</div>
                        <div className="stake">Unstake</div>
                        <div className="unstake" onClick={() => setActiveTab('withdraw')}>Withdraw</div>
                    </div>
                    <div className="you-unstake"></div>
                    <div className="rewards-eligible-gas-2">
                        <div className="you-unstake-2">You Unstake</div>
                        <div className="frame-67">
                            <input 
                                type='number' 
                                value={inputValuedeposit} 
                                onChange={(e) => setInputValuedeposit(e.target.value)} 
                                placeholder="Amount" 
                            />
                            <div className="frame-68">
                                <div className="frame-69"><Image
                                    src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/68a0120be05f0d4621e68f22_ethereum-eth-logo-diamond-purple-3.svg"
                                    loading="lazy" width="8.491949081420898" height="14.011717796325684" alt=""
                                    className="ethereum-eth-logo-diamond-purple-2" />
                                    <div className="text-201">pUSDT</div>
                                </div>
                                <div className="text-202">Balance: {seenDeposit}</div>
                            </div>
                        </div>
                        <div className="rewards-eligible-gas-3">
                            <div className="text-195">Rewards Eligible</div>
                            <div className="text-196">|</div>
                            <div className="text-195">Gas $0,98</div>
                        </div>
                        <div className="frame-rewards-eligible">
                            <div className="text-197">After 7 days after unstaking you are allowed to withdraw</div>
                        </div>
                        <div className="frame-rewards-eligible">
                            <div className="text-197">All assets will be available to withdraw 7 days after unstaking.</div>
                        </div>
                        {!addressAccount ? (
                            <div className="button-connect-wallet" onClick={handleWeb3}>Connect Wallet</div>
                        ) : (
                            <div className="button-connect-wallet" onClick={handleUnstake}>Confirm Unstake</div>
                        )}
                    </div>
                
                </div>
                )}
                {activeTab === 'withdraw' && (
                <div className="pop-up-3">
                    <div className="top-buttons-2">
                        <div className="unstake" onClick={() => setActiveTab('stake')}>Stake </div>
                        <div className="unstake" onClick={() => setActiveTab('unstake')}>Unstake </div>
                        <div className="stake">Withdraw </div>
                    </div>
                
                    <div className="rewards-eligible-gas-2">
                        <div className="you-unstake-2">Withdrawal Status</div>
                
                        <div className="frame-66" style={{ height: 'auto', minHeight: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px', padding: '15px' }}>
                            {/* ПЕРЕВІРКА: чи є хоча б один активний запит */}
                            {unstakeRequests.filter(r => !r.withdrawn).length > 0 ? (
                                unstakeRequests.filter(r => !r.withdrawn).map((req, index) => {
                                    const status = getStatus(req.unlockTime, req.withdrawn);
                                    return (
                                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', width: '100%', borderBottom: '1px solid #333', paddingBottom: '5px' }}>
                                            <div className="text-199" style={{fontSize: '14px'}}>
                                                {window.web3.utils.fromWei(req.amount, 'ether')} USDT
                                            </div>
                                            <div className="text-197" style={{ color: status === 'Ready' ? '#00ff88' : '#aaa', fontSize: '14px' }}>
                                                {status}
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                /* ІНФОРМАЦІЯ ЯКЩО НЕМАЄ ЗАПИТІВ */
                                <div style={{ textAlign: 'center' }}>
                                    <div className="text-199" style={{ fontSize: '16px', color: '#ffcc00', marginBottom: '8px' }}>
                                        No active requests found
                                    </div>
                                    <div className="text-197" style={{ fontSize: '13px', opacity: 0.7 }}>
                                        To withdraw your funds, you need to go to the <b>Unstake</b> tab first and wait for the 7-day unlock period.
                                    </div>
                                </div>
                            )}
                        </div>
                
                        <div className="rewards-eligible-gas-4">
                            <div className="text-195">Rewards Eligible</div>
                            <div className="text-196">|</div>
                            <div className="text-195">Gas ~$0.98</div>
                        </div>
                
                        <div className="button-container" style={{ marginTop: '15px' }}>
                            {!addressAccount ? (
                                <div className="button-connect-wallet" onClick={handleWeb3} style={{cursor: 'pointer'}}>
                                    <div className="text-198">Connect Wallet</div>
                                </div>
                            ) : (
                                <div 
                                    className="button-connect-wallet" 
                                    onClick={unstakeRequests.some(r => !r.withdrawn && getStatus(r.unlockTime, r.withdrawn) === 'Ready') ? handleWithdrawReady : null}
                                    style={{ 
                                        cursor: 'pointer', 
                                        opacity: unstakeRequests.some(r => !r.withdrawn && getStatus(r.unlockTime, r.withdrawn) === 'Ready') ? 1 : 0.3,
                                        filter: unstakeRequests.some(r => !r.withdrawn && getStatus(r.unlockTime, r.withdrawn) === 'Ready') ? 'none' : 'grayscale(1)'
                                    }}
                                >
                                    <div className="text-198">Claim Ready Funds</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                )}
            </div>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
}


