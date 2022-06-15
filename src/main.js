
import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit'
import BigNumber from "bignumber.js"

const ERC20_DECIMALS = 18

let kit
const title =document.querySelector("h1");
setTimeout(()=>{title.style.color="red";},3000)



function notification(text){
    const alert= document.querySelector(".alert");
    alert.display="block"
    alert.textContent=text;

}

function notificationOff (){
    const alert= document.querySelector(".alert");
    alert.display="none"
    alert.textContent="";

}

async function connectWallet(){
    if(window.celo){
        notification("⚠️ Please approve this DApp to use it.")
        try{
            await window.celo.enable();
            document.querySelector(".connect_button").textContent="Connected"

            console.log("yur")
            notificationOff();
            const web3= new Web3(window.celo);
            kit=newKitFromWeb3(web3);

            const accounts = await kit.web3.eth.getAccounts();
            kit.defaultAccount=accounts[0]

            console.log(accounts)
            getBalance()
        
           }catch(err){
            notification("Error")
            console.log(err)
        
           }
    }else{
        notification("Hey please install the app")
    }


  

}

async function getBalance(){

    const totalBalance = await kit.getTotalBalance(kit.defaultAccount);
    const cUsd= totalBalance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);
    document.querySelector(".balance").textContent="Balance:"+cUsd ;
    
    console.log(cUsd)
}


const connectWalletButton=document.querySelector(".connect_button");

connectWalletButton.addEventListener('click',connectWallet);
getBalance()


