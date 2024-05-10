import { JsonFragment } from "@vite/vitejs-abi/fragments";

export const itemOwnership = {
    address: 'vite_d3bdd9e5aa0b8846f37833ac92b721310808110423ed69370e',
    abi: [
        {
            name: 'NewItem',
            inputs: [
                {
                    name: 'itemId',
                    type: 'uint'
                },
                {
                    name: 'name',
                    type: 'string'
                },
                {
                    name: 'log',
                    type: 'string'
                }
            ],
            type: 'event',
        },
        {
            name: 'UpdateCreateItemFee',
            inputs: [
                {
                    name: 'fee',
                    type: 'uint'
                },
            ],
            type: 'event'
        },
        {
            name: 'UpdateChangeNameFee',
            inputs: [
                {
                    name: 'fee',
                    type: 'uint'
                },
            ],
            type: 'event'
        },
        {
            name: 'ChangeItemName',
            inputs: [
                {
                    name: 'itemId',
                    type: 'uint'
                },
                {
                    name: 'oldName',
                    type: 'string'
                },
                {
                    name: 'newName',
                    type: 'string'
                }
            ],
            type: 'event'
        },
        {
            type: 'function',
            name: 'withdraw',
            inputs: [],
        },
        {
            type: 'function',
            name: 'setCreateItemFee',
            inputs: [{ name: '_fee', type: 'uint' }]
        },
        {
            type: 'function',
            name: 'setChangeNameFee',
            inputs: [{ name: '_fee', type: 'uint' }]
        },
        {
            type: 'function',
            name: 'createItem',
            inputs: [{ name: '_name', type: 'string' }],
            payable: true,
            stateMutability: 'payable'
        },
        {
            type: 'function',
            name: 'changeName',
            inputs: [{ name: '_itemId', type: 'uint' }, { name: '_newName', type: 'string' }],
            payable: true,
            stateMutability: 'payable'
        },
        {
            type: 'function',
            name: 'getItemsByOwner',
            payable: false,
            stateMutability: 'view',
            inputs: [{ name: '_owner', type: 'address' }],
            outputs: [{ name: '', type: 'uint[]' }]
        },
        {
            type: 'function',
            name: 'getOwnerByItem',
            payable: false,
            stateMutability: 'view',
            inputs: [{ name: '_itemId', type: 'uint' }],
            outputs: [{ name: '', type: 'address' }]
        },
        {
            type: 'function',
            name: 'balanceOf',
            payable: false,
            stateMutability: 'view',
            inputs: [{ name: '_owner', type: 'address' }],
            outputs: [{ name: '_balance', type: 'uint256' }]
        },
        {
            type: 'function',
            name: 'ownerOf',
            inputs: [{ name: '_tokenId', type: 'uint256' }],
            outputs: [{ name: '_owner', type: 'address' }],
            payable: false,
            stateMutability: 'view'
        },
        {
            type: 'function',
            name: 'transfer',
            inputs: [{ name: '_to', type: 'address' }, { name: '_tokenId', type: 'uint256' }]
        },
        {
            type: 'function',
            name: 'approve',
            inputs: [{ name: '_to', type: 'address' }, { name: '_tokenId', type: 'uint256' }]
        },
        {
            type: 'function',
            name: 'takeOwnership',
            inputs: [{ name: '_tokenId', type: 'uint256' }]
        },
        {
            type: 'function',
            payable: false,
            name: 'items',
            inputs: [{ name: '', type: 'uint256' }],
            outputs: [{ internalType: "string", name: 'name', type: 'string' }],
            stateMutability: 'view'
        },
        {
            type: 'function',
            payable: false,
            name: "owner",
            stateMutability: 'view',
            inputs: [],
            outputs: [{ internalType: "address", name: '', type: 'address' }]
        }
    ]
}

export function getItemOwnershipAbi(name: string): JsonFragment | null {
    switch (name) {
        case 'NewItem':
            return itemOwnership.abi[0];
        case 'UpdateCreateItemFee':
            return itemOwnership.abi[1];
        case 'UpdateChangeNameFee':
            return itemOwnership.abi[2];
        case 'ChangeItemName':
            return itemOwnership.abi[3];
        case 'withdraw':
            return itemOwnership.abi[4];
        case 'setCreateItemFee':
            return itemOwnership.abi[5];
        case 'setChangeNameFee':
            return itemOwnership.abi[6];
        case 'createItem':
            return itemOwnership.abi[7];
        case 'changeName':
            return itemOwnership.abi[8];
        case 'getItemsByOwner':
            return itemOwnership.abi[9];
        case 'getOwnerByItem':
            return itemOwnership.abi[10];
        case 'balanceOf':
            return itemOwnership.abi[11];
        case 'ownerOf':
            return itemOwnership.abi[12];
        case 'transfer':
            return itemOwnership.abi[13];
        case 'approve':
            return itemOwnership.abi[14];
        case 'takeOwnership':
            return itemOwnership.abi[15];
        case 'items':
            return itemOwnership.abi[16];
        case "owner":
            return itemOwnership.abi[17];
        default:
            return null;
    }
}