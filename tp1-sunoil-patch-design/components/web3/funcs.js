import Web3 from 'web3';
import Web3Conection from './ABI/web3Conection.json';
import StakingLogicABI from './ABI/StakingLogic.json'; 
import StakingStorageABI from './ABI/StakingStorage.json';

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

const StakingStorage_Address = "0xcCA06f9A1cf9aeBeeEcB128fa01C39405444A808";

const StakingLogic_Address = "0xd349Df7D1c51B4457e79334CB21184a04Bb852B3";

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
    const web3 = window.web3;
    const addressAccount = await web3.eth.getCoinbase();

    
    const StakingLogic = new Contract(StakingLogicABI, StakingLogic_Address);
    const StakingStorage = new Contract(StakingStorageABI, StakingStorage_Address);
    const usdt_Web3_Conection = new Contract(Web3Conection.output.abi,usdt);
   
    const stakedBalanceRaw = await StakingLogic.methods.balanceOf(addressAccount).call();
    const stakedBalance = web3.utils.fromWei(stakedBalanceRaw, 'ether');

    
    const pendingRewardsRaw = await StakingLogic.methods.earned(addressAccount).call();
    const pendingRewards = web3.utils.fromWei(pendingRewardsRaw, 'ether');

   
    const userPoints = await StakingStorage.methods.userPoints(addressAccount).call();

    const unstakeRequests = await StakingStorage.methods.getUnstakeInfo(addressAccount).call();

    return {
        addressAccount,
        usdt_Web3_Conection,
        StakingLogic,
        StakingStorage,
        stakedBalance,
        pendingRewards,
        userPoints,
        unstakeRequests,
        StakingLogic_Address,
        StakingStorage_Address
    };
};
export const depositTokens = async (amount) => {
    const web3 = window.web3;
    const account = await web3.eth.getCoinbase();
    const amountWei = web3.utils.toWei(amount, 'ether');

    //  Approve
    const tokenContract = new web3.eth.Contract(Web3Conection, usdt);
    await tokenContract.methods.approve(StakingLogic_Address, amountWei).send({ from: account });

    //  Deposit
    return await StakingLogic.methods.deposit(amountWei).send({ from: account });
};

export const unstakeTokens = async (amount) => {
    const amountWei = window.web3.utils.toWei(amount, 'ether');
    return await StakingLogic.methods.unstake(amountWei).send({ from: account });
};

export const withdrawFunds = async () => {
    return await StakingLogic.methods.withdrawReadyFunds().send({ from: account });
};
