export type ViteBalanceInfo = {
    balance: {
        address: string;
        blockCount: string;
        balanceInfoMap?: {
            [tokenId: string]: {
                tokenInfo: TokenInfo;
                balance: string;
            };
        };
    };
    unreceived: {
        address: string;
        blockCount: string;
    };
};

export type TokenInfo = {
    tokenName: string;
    tokenSymbol: string;
    totalSupply: string;
    decimals: number;
    owner: string;
    tokenId: string;
    maxSupply: string;
    ownerBurnOnly: false;
    isReIssuable: false;
    index: number;
    isOwnerBurnOnly: false;
};

export type NewAccountBlock = {
    hash: string;
    height: number;
    heightStr: string;
    removed: boolean;
};

export interface LoginForm {
    address: string;
    mnemonic: string;
}

export type SnapshotBlockMessage = {
    hash: string;
    height: string;
    removed: boolean;
}

export type NewSnapshotBlockCallback = Array<SnapshotBlockMessage>

export type AccountBlockMessage = {
    hash: string;
    removed: boolean;
}

export type NewAccountBlockCallback = Array<AccountBlockMessage>

export type AccountBlockWithHeightMessage = SnapshotBlockMessage;

export type NewAccountBlockByAddressCallback = Array<AccountBlockWithHeightMessage>

export type UnreceivedBlockMessage = SnapshotBlockMessage;

export type NewUnreceivedBlockCallback = Array<UnreceivedBlockMessage>

export type VmLog = {
    topics: Array<string>,
    data: string,
}

export type VmlogMessage = {
    accountBlockHash: string,
    accountBlockHeight: string,
    address: string,
    vmlog: VmLog,
    removed: boolean,
}

export type NewVmlogCallback = Array<VmlogMessage>

export type VmLogFilterParam = {
    addressHeightRange: Map<string, Record<"fromHeight" | "toHeight", string>>,
    topics: Array<Array<string>>
}

export interface SetCreateItemFeeForm {
    fee: string,
}

export interface SetChangeNameFeeForm {
    fee: string,
}

export interface CreateItemForm {
    amount: string,
    name: string
}

export interface ChangeNameForm {
    amount: string
    itemId: string,
    name: string
}

export interface TransferForm {
    to: string,
    itemId: string
}

export interface ApproveForm {
    to: string,
    itemId: string,
}

export interface TakeOwnership {
    itemId: string
}