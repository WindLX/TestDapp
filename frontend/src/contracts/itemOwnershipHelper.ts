import { abi, utils, constant } from "@vite/vitejs";
import { config } from '../utils/config';
import { getItemOwnershipAbi } from '../contracts/itemOwnership';
import { Uint256, Address } from "@vite/vitejs-utils/type";
import { NewAccountBlockByAddressCallback, NewAccountBlockCallback, NewSnapshotBlockCallback, NewUnreceivedBlockCallback, NewVmlogCallback, VmLogFilterParam } from "../utils/types";

const { Vite_TokenId } = constant;
const { _Buffer } = utils;

export type Item = {
    name: string
}

export class ItemOwnershipHelper {
    protected provider: any

    constructor(provider: any) {
        this.provider = provider
    }

    protected async contractQuery(contractName: string, ...args: any[]) {
        const targetAbi = getItemOwnershipAbi(contractName);
        if (!targetAbi) {
            return;
        }
        const rawdata = abi.encodeFunctionCall(targetAbi, args);
        const data = _Buffer.from(rawdata, "hex").toString("base64");
        const resultBase64 = await this.provider.request("contract_query",
            { address: config.item_ownership_address, data: data }
        )
        const resultHex = _Buffer.from(resultBase64, "base64").toString("hex");
        const result = abi.decodeFunctionOutput(targetAbi, resultHex);
        return result
    }

    public async getItemsByOwner(owner: Address) {
        return await this.contractQuery("getItemsByOwner", owner)
    }

    public async getOwnerByItem(itemId: Uint256) {
        return await this.contractQuery("getOwnerByItem", itemId)
    }

    public async getItem(itemId: Uint256) {
        return await this.contractQuery("items", itemId)
    }

    public async owner() {
        return await this.contractQuery("owner")
    }

    protected async subscribe<T>(topicName: string, callback: (event: T) => void, ...args: any[]) {
        const event = await this.provider.subscribe(topicName, ...args)
        event.on(callback);
        return () => {
            this.provider.unsubscribe(event);
        }
    }

    public async subscribeNewSnapshotBlock(callback: (event: NewSnapshotBlockCallback) => void) {
        return await this.subscribe<NewSnapshotBlockCallback>("newSnapshotBlock", callback)
    }

    public async subscribeNewAccountBlock(callback: (event: NewAccountBlockCallback) => void) {
        return await this.subscribe<NewAccountBlockCallback>("newAccountBlock", callback)
    }

    public async subscribeNewVmLog(callback: (event: NewVmlogCallback) => void, vmLogFilterParam: VmLogFilterParam) {
        return await this.subscribe<NewVmlogCallback>("newVmLog", callback, vmLogFilterParam)
    }

    public unsubscribeAll() {
        this.provider.unsubscribeAll();
    }
}

export class ItemOwnershipAccountHelper extends ItemOwnershipHelper {
    private account: any

    constructor(provider: any, account: any) {
        super(provider)
        this.account = account
    }

    private async callContract(wallet: any, contractName: string, ...args: any[]) {
        const targetAbi = getItemOwnershipAbi(contractName);
        if (!targetAbi) {
            return;
        }
        const block = this.account.callContract({
            abi: targetAbi,
            toAddress: config.item_ownership_address,
            params: args,
        })
        block.setProvider(this.provider);
        block.setPrivateKey(wallet.deriveAddress(0).privateKey);
        await block.autoSetPreviousAccountBlock();
        block.sign(wallet.deriveAddress(0).privateKey);
        const result = await block.send();
        return result
    }

    private async callPayableContract(amount: Uint256, wallet: any, contractName: string, ...args: any[]) {
        const targetAbi = getItemOwnershipAbi(contractName);
        if (!targetAbi) {
            return;
        }
        const block = this.account.callContract({
            abi: targetAbi,
            toAddress: config.item_ownership_address,
            params: args,
            tokeId: Vite_TokenId,
            amount: amount
        })
        block.setProvider(this.provider);
        block.setPrivateKey(wallet.deriveAddress(0).privateKey);
        await block.autoSetPreviousAccountBlock();
        block.sign(wallet.deriveAddress(0).privateKey);
        const result = await block.send();
        return result;
    }

    public async withdraw(wallet: any) {
        return await this.callContract(wallet, "withdraw")
    }

    public async setCreateItemFee(wallet: any, fee: Uint256) {
        return await this.callContract(wallet, "setCreateItemFee", fee)
    }

    public async setChangeNameFee(wallet: any, fee: Uint256) {
        return await this.callContract(wallet, "setChangeNameFee", fee)
    }

    public async createItem(wallet: any, amount: Uint256, name: string) {
        return await this.callPayableContract(amount, wallet, "createItem", name)
    }

    public async changeName(wallet: any, amount: Uint256, itemId: Uint256, name: string) {
        return await this.callPayableContract(amount, wallet, "changeName", itemId, name)
    }

    public async transfer(wallet: any, to: Address, itemId: Uint256) {
        return await this.callContract(wallet, "transfer", to, itemId)
    }

    public async approve(wallet: any, to: Address, itemId: Uint256) {
        return await this.callContract(wallet, "approve", to, itemId)
    }

    public async takeOwnership(wallet: any, itemId: Uint256) {
        return await this.callContract(wallet, "takeOwnership", itemId)
    }

    public async subscribeNewAccountBlockByAddress(callback: (event: NewAccountBlockByAddressCallback) => void, address: string) {
        return await this.subscribe<NewAccountBlockByAddressCallback>("newAccountBlockByAddress", callback, address)
    }

    public async subscribeNewUnreceivedBlockByAddress(callback: (event: NewAccountBlockByAddressCallback) => void, address: string) {
        return await this.subscribe<NewUnreceivedBlockCallback>("newUnreceivedBlockByAddress", callback, address)
    }
}