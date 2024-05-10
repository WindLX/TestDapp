const { WS_RPC } = require('@vite/vitejs-ws');
const { ViteAPI, accountBlock, wallet, constant, error, utils } = require('@vite/vitejs');
const { createAccountBlock, AccountBlock, Account } = accountBlock;
const { Contracts, Vite_TokenId } = constant;

import config from './deploy.config.json';

const vite_token = 'tti_5649544520544f4b454e6e40';

const s1_name = 's1';
const s1_address = 'vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792';

const u0_address = 'vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906';
const u0_mnemonic = "spell barely teach wisdom best tragic three lyrics second notable excuse hobby example tenant business midnight member canal energy evoke debate tortoise high infant";
const u0_wallet = wallet.getWallet(u0_mnemonic);
const u0_account = u0_wallet.deriveAddress(0);

const u1_address = 'vite_297e65e8f929e26be7dd079a76b1c15eb39055d9f51eb7548f';
const u1_mnemonic = 'text pause blouse merge region sadness very breeze cart sibling seed useless coast enable gold abuse puppy aware picnic bus outside cream slow easy';
const u1_wallet = wallet.getWallet(u1_mnemonic);
const u1_account = u1_wallet.deriveAddress(0);

const itemOwnership_address = 'vite_d3bdd9e5aa0b8846f37833ac92b721310808110423ed69370e';

async function run(): Promise<void> {
    let WS_service = new WS_RPC(config.ws);
    let provider = new ViteAPI(WS_service, () => {
        console.log(`Connected to ${config.ws}`);
    });

    const res = await provider.request('contract_getContractInfo', itemOwnership_address);
    console.log(res)

    // const { balance, unreceived } = await provider.getBalanceInfo(u1_address);
    // console.log(balance);
    // console.log(unreceived);

    // const txs = await provider.getTransactionList({
    //     address: u0_address,
    //     pageIndex: 0,
    //     pageSize: 50,
    // });
    // console.log(txs);

    // let account = new Account(u1_address);
    // account.setProvider(provider);
    // account.setPrivateKey(u1_account.privateKey);

    // const r = await provider.request('contract_getQuotaByAccount', u1_address);
    // console.log(r);
    // account.withdrawSBPReward({ // blockType: 2
    //     sbpName: 's1',
    //     receiveAddress: u0_address,
    // });

    // const block = accountBlock.createAccountBlock('send', {
    //     address: u0_address,
    //     toAddress: u1_address,
    //     tokenId: vite_token,
    //     amount: '10000',
    // });
    // block.setProvider(provider);
    // block.setPrivateKey(u0_account.privateKey);
    // await block.autoSetPreviousAccountBlock();
    // block.sign(u0_account.privateKey);
    // await block.autoSend();

    // const block = accountBlock.createAccountBlock('receive', {
    //     address: account.address,
    //     sendBlockHash: txs[0].hash,
    // });
    // block.setProvider(provider);
    // block.setPrivateKey(account.privateKey);
    // await block.autoSetPreviousAccountBlock();
    // block.sign(account.privateKey);
    // await block.autoSend();

    return;
}

run().then(() => {
    process.exit(0);
}).catch(e => {
    console.warn(e);
    process.exit(-1);
});
