import Web3 from 'web3';
import Web3Conection from './ABI/web3Conection.json';
const BSC_TESTNET_RPC = 'https://site1.moralis-nodes.com/arbitrum/724ef06ada8141a6a49f4c0bf98c9a78';

const Contract = require("web3-eth-contract");

const usdt = '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9';
const weth = '0x82af49447d8a07e3bd95bd0d56f35241523fbab1';
const usdc = '0xaf88d065e77c8cC2239327C5EDb3A432268e5831';
const usdce = '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8';
const pusdt = '0xb73B8b9e6961831644c1BA9b0a10731ade3f7C8E';
const arb = '0x912CE59144191C1204E64559FE8253a0e49E6548';

Contract.setProvider(BSC_TESTNET_RPC);

const Contract_Address = "0xa407e4e34fe3d081a2F563F9552B22668bf609A1";

const StakingStorage_Address = "0x517353a3c1bebbaa8b1fcabed172207fbf6511c9";

const StakingLogic_Address = "0x58924c1237b6e1dcd483410be7f89059ff3ef902";

const loadWeb3 = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            web3.eth.sendTransaction({method: 'eth_requestAccounts'});
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
};

export const loadData = async () => {
    await loadWeb3();
    const addressAccount = await window.web3.eth.getCoinbase();
    const Contract_Web3_Conection = new Contract(Web3Conection.output.abi, Contract_Address);
    const StakingStorage_Web3_Conection = new Contract(Web3Conection.output.abi, StakingStorage_Address);
    const StakingLogic_Web3_Conection = new Contract(Web3Conection.output.abi, StakingLogic_Address);
    const usdt_Web3_Conection = new Contract(Web3Conection.output.abi,usdt)
    const weth_Web3_Conection = new Contract(Web3Conection.output.abi,weth)
    const usdc_Web3_Conection = new Contract(Web3Conection.output.abi,usdc)
    const usdce_Web3_Conection = new Contract(Web3Conection.output.abi,usdce)
    const pusdt_Web3_Conection = new Contract(Web3Conection.output.abi,pusdt)
    const arb_Web3_Conection = new Contract(Web3Conection.output.abi,arb)
    
    
    
    
    //const usdt_contract=new Contract(Web3Conection.output.abi, Contract_Address);
    
    
    const number = 1;
    
    const deposit = await Contract_Web3_Conection.methods.checkDeposit(addressAccount).call();
    const seenDeposit = await web3.utils.fromWei(deposit,'ether');

    const balanceofUSDT_pusdt= await pusdt_Web3_Conection.methods.balanceOf(addressAccount).call();
    const USDTpusdtDeposit = await web3.utils.fromWei(balanceofUSDT_pusdt,'ether');

    const reward = await Contract_Web3_Conection.methods.checkRewards(addressAccount).call();
    const seenReward = await web3.utils.fromWei(reward,'ether');
    const startTime = await Contract_Web3_Conection.methods.checkstartTime(addressAccount).call();
    const lockTime = await Contract_Web3_Conection.methods.checklockTime(addressAccount).call();

    
    return { Contract_Web3_Conection, StakingLogic_Web3_Conection, StakingStorage_Web3_Conection, addressAccount, number, deposit, balanceofUSDT_pusdt, reward, startTime, seenDeposit, USDTpusdtDeposit, seenReward, usdt, weth, usdc, usdce, pusdt, arb, usdt_Web3_Conection, weth_Web3_Conection, usdc_Web3_Conection, usdce_Web3_Conection, arb_Web3_Conection,weth_Web3_Conection, lockTime, Contract_Address, StakingLogic_Address,  StakingStorage_Address};
};

