<script setup lang="ts">
import { Ref, computed, onActivated, onMounted, ref } from 'vue';
import {
    ElButton, ElRow, ElCol, ElForm,
    ElFormItem, ElInput, ElSelect, ElOption,
    ElNotification, ElCard, ElText
} from 'element-plus';
import { useViteStore } from '../utils/store';
import {
    ViteBalanceInfo,
    SetCreateItemFeeForm, SetChangeNameFeeForm,
    CreateItemForm, ChangeNameForm,
    TransferForm, ApproveForm, TakeOwnership
} from '../utils/types';
import { accountBlock, constant, wallet as walletUtil } from '@vite/vitejs';
import { ItemOwnershipAccountHelper } from '../contracts/itemOwnershipHelper';

const { Vite_TokenId } = constant;
const { Account } = accountBlock;

const props = defineProps<{
    address: string,
    mnemonic: string
}>();

// let off: any = null;
const vite_store = useViteStore();

const isOwner = ref(false);
const account_block_count = ref(0);
const itemIds = ref<Array<string>>([])
const itemInfos = ref<Array<string>>([])

const setCreateItemFeeForm = ref<SetCreateItemFeeForm>({
    fee: ''
})
const setChangeNameFeeForm = ref<SetChangeNameFeeForm>({
    fee: ''
})
const createItemForm = ref<CreateItemForm>({
    amount: '',
    name: ''
})
const changeNameForm = ref<ChangeNameForm>({
    amount: '',
    itemId: '',
    name: ''
})
const transferForm = ref<TransferForm>({
    to: '',
    itemId: ''
})
const approveForm = ref<ApproveForm>({
    to: '',
    itemId: ''
})
const takeOwnershipForm = ref<TakeOwnership>({
    itemId: ''
})

const rate1 = ref(0)
const rate2 = ref(0)
const rate3 = ref(0)
const rate4 = ref(0)

let wallet: any = null;
let account: any = null;
let item_ownership_account_helper: null | ItemOwnershipAccountHelper = null;

const vite_balance_info: Ref<null | ViteBalanceInfo> = ref(null);
const vite_balance = computed(() => {
    let viteBalance = null;
    const balanceInfoMap = vite_balance_info.value?.balance.balanceInfoMap;
    if (balanceInfoMap) {
        Object.keys(balanceInfoMap).forEach(tokenId => {
            const entry = balanceInfoMap[tokenId];
            // console.log(`Token ID: ${tokenId}, Balance: ${entry.balance}`);
            if (tokenId === Vite_TokenId) {
                viteBalance = entry.balance
            }
        })
    }
    return viteBalance;
})

function handleWithdraw() {
    item_ownership_account_helper?.withdraw(wallet)
        .then((res: any) => {
            console.log(res)
            ElNotification({
                title: 'Success',
                message: 'Withdraw Transaction Send Success',
                type: 'success',
                duration: 2000
            })
        })
        .catch(e => {
            console.log(e)
            ElNotification({
                title: 'Error',
                message: e.error.message,
                type: 'error',
                duration: 2000
            })
        });
}

function handleSetCreateItemFee() {
    const fee = setCreateItemFeeForm.value.fee + "0".repeat(rate1.value);
    item_ownership_account_helper?.setCreateItemFee(wallet, fee)
        .then((res: any) => {
            console.log(res)
            ElNotification({
                title: 'Success',
                message: 'Set CreateItem Fee  Transaction Send Success',
                type: 'success',
                duration: 2000
            })
        })
        .catch(e => {
            console.log(e)
            ElNotification({
                title: 'Error',
                message: e.error.message,
                type: 'error',
                duration: 2000
            })
        });
    setCreateItemFeeForm.value.fee = ''
}

function handleSetChangeNameFee() {
    const fee = setChangeNameFeeForm.value.fee + "0".repeat(rate2.value);
    item_ownership_account_helper?.setChangeNameFee(wallet, fee)
        .then((res: any) => {
            console.log(res)
            ElNotification({
                title: 'Success',
                message: 'Set ChangeName Fee Transaction Send Success',
                type: 'success',
                duration: 2000
            })
        })
        .catch(e => {
            console.log(e)
            ElNotification({
                title: 'Error',
                message: e.error.message,
                type: 'error',
                duration: 2000
            })
        });
    setChangeNameFeeForm.value.fee = ''
}

function handleCreateItem() {
    const amount = createItemForm.value.amount + "0".repeat(rate3.value);
    const name = createItemForm.value.name;
    item_ownership_account_helper?.createItem(wallet, amount, name)
        .then((res: any) => {
            console.log(res)
            ElNotification({
                title: 'Success',
                message: 'Create Item Transaction Send Success',
                type: 'success',
                duration: 2000
            })
        })
        .catch(e => {
            console.log(e)
            ElNotification({
                title: 'Error',
                message: e.error.message,
                type: 'error',
                duration: 2000
            })
        });
    createItemForm.value.amount = ''
    createItemForm.value.name = ''
}

function handleChangeName() {
    const amount = changeNameForm.value.amount + "0".repeat(rate4.value);
    const name = changeNameForm.value.name;
    const itemId = changeNameForm.value.itemId;
    item_ownership_account_helper?.changeName(wallet, amount, itemId, name)
        .then((res: any) => {
            console.log(res)
            ElNotification({
                title: 'Success',
                message: 'Change Name Transaction Send Success',
                type: 'success',
                duration: 2000
            })
        })
        .catch(e => {
            console.log(e)
            ElNotification({
                title: 'Error',
                message: e.error.message,
                type: 'error',
                duration: 2000
            })
        });
    changeNameForm.value.amount = ''
    changeNameForm.value.name = ''
    changeNameForm.value.itemId = ''
}

function handleTransfer() {
    const to = transferForm.value.to;
    const itemId = transferForm.value.itemId;
    item_ownership_account_helper?.transfer(wallet, to, itemId)
        .then((res: any) => {
            console.log(res)
            ElNotification({
                title: 'Success',
                message: 'Transfer Item Transaction Send Success',
                type: 'success',
                duration: 2000
            })
        })
        .catch(e => {
            console.log(e)
            ElNotification({
                title: 'Error',
                message: e.error.message,
                type: 'error',
                duration: 2000
            })
        });
    transferForm.value.to = ''
    transferForm.value.itemId = ''
}

function handleApprove() {
    const to = approveForm.value.to;
    const itemId = approveForm.value.itemId;
    item_ownership_account_helper?.approve(wallet, to, itemId)
        .then((res: any) => {
            console.log(res)
            ElNotification({
                title: 'Success',
                message: 'Approve Item Transaction Send Success',
                type: 'success',
                duration: 2000
            })
        })
        .catch(e => {
            console.log(e)
            ElNotification({
                title: 'Error',
                message: e.error.message,
                type: 'error',
                duration: 2000
            })
        });
    approveForm.value.to = ''
    approveForm.value.itemId = ''
}

function handleTakeOwnership() {
    const itemId = takeOwnershipForm.value.itemId;
    item_ownership_account_helper?.takeOwnership(wallet, itemId)
        .then((res: any) => {
            console.log(res)
            ElNotification({
                title: 'Success',
                message: 'Take Ownership Transaction Send Success',
                type: 'success',
                duration: 2000
            })
        })
        .catch(e => {
            console.log(e)
            ElNotification({
                title: 'Error',
                message: e.error.message,
                type: 'error',
                duration: 2000
            })
        });
    takeOwnershipForm.value.itemId = ''
}

const getItemInfo = async (itemId: string): Promise<string | null> => {
    try {
        return (await item_ownership_account_helper?.getItem(itemId) as Array<string>)[0];
    }
    catch (e) {
        console.log(e)
        return null;
    }
}

const getViteBalanceInfo = async (address: string, provider: any): Promise<ViteBalanceInfo | null> => {
    if (address) {
        return await provider.getBalanceInfo(address) as ViteBalanceInfo;
    } else {
        return null;
    }
}

async function login(address: string, mnemonic: string, provider: any) {
    wallet = walletUtil.getWallet(mnemonic);
    address = address;
    account = new Account(address);
    account.setProvider(provider);
    account.setPrivateKey(wallet.deriveAddress(0).privateKey);
    item_ownership_account_helper = new ItemOwnershipAccountHelper(vite_store.provider, account);
    const owner = await item_ownership_account_helper?.owner();
    //@ts-ignore
    isOwner.value = owner[0] === props.address;
}

function logout() {
    vite_store.logout(props.address)
}

async function update() {
    const balanceInfo = await getViteBalanceInfo(props.address, vite_store.provider);
    if (balanceInfo) {
        vite_balance_info.value = balanceInfo;
        account_block_count.value = parseInt(vite_balance_info.value.balance.blockCount)
        itemIds.value = (await item_ownership_account_helper?.getItemsByOwner(props.address) as Array<Array<string>>)[0];
        const ifs: Array<string> = [];
        for (const itemId of itemIds.value) {
            const itemInfo = await getItemInfo(itemId);
            if (itemInfo) {
                ifs.push(itemInfo);
            }
        }
        itemInfos.value = ifs;
    } else {
        vite_balance_info.value = null
        account_block_count.value = 0
        itemIds.value = []
        itemInfos.value = []
    }
}

onMounted(async () => {
    await login(props.address, props.mnemonic, vite_store.provider);
    await update()

    await item_ownership_account_helper?.subscribeNewAccountBlock(async () => {
        await update()
    })
})

onActivated(async () => {
    await update()
})
</script>

<template>
    <div class="wallet">
        <el-row :gutter="20">
            <el-col :span="9">
                <div class="title">
                    <div class="head">Address</div>
                    <div class="content">{{ props.address }}</div>
                </div>
            </el-col>
            <el-col :span="9">
                <div class="title">
                    <div class="head">Account Block Count</div>
                    <div class="content">{{ account_block_count }}</div>
                </div>
            </el-col>
            <div class="title">
                <div class="head">Vite Balance</div>
                <div class="content">{{ vite_balance }}</div>
            </div>
        </el-row>
        <el-row>
            <el-col :span="3">
                <el-button @click="logout()">Logout</el-button>
            </el-col>
        </el-row>

        <div class="item-list-group">
            <h3>Item List</h3>
            <div class="item-list">
                <el-card v-for="(itemId, index) in itemIds" :key="index" class="item">
                    <div class="card">
                        <el-text style="font-weight: bold;">{{ itemId }}</el-text>
                        <el-text size="large">{{ itemInfos[index] }}</el-text>
                    </div>
                </el-card>
            </div>
        </div>

        <div>
            <el-form label-width="auto" class="form">
                <h4>Create Item</h4>
                <el-form-item label="Amount" style="width: 60%;">
                    <el-input v-model="createItemForm.amount">
                        <template #append>
                            <el-select v-model="rate3" style="width: 115px">
                                <el-option v-for="(index, i) in 19" :label="`10^${i}`" :value="i" :key="index" />
                            </el-select>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="Item Name" style="width: 60%;">
                    <el-input v-model="createItemForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="warning" @click="handleCreateItem()">Confirm</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div>
            <el-form label-width="auto" class="form">
                <h4>Change Name</h4>
                <el-form-item label="Amount" style="width: 60%;">
                    <el-input v-model="changeNameForm.amount">
                        <template #append>
                            <el-select v-model="rate4" style="width: 115px">
                                <el-option v-for="(index, i) in 19" :label="`10^${i}`" :value="i" :key="index" />
                            </el-select>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="Item Id" style="width: 60%">
                    <el-select v-model="changeNameForm.itemId" filterable>
                        <el-option v-for="(itemId, index) in itemIds" :label="itemId" :value="itemId" :key="index" />
                    </el-select>
                </el-form-item>
                <el-form-item label="New Name" style="width: 60%;">
                    <el-input v-model="changeNameForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="warning" @click="handleChangeName()">Confirm</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div>
            <el-form label-width="auto" class="form">
                <h4>Transfer Item</h4>
                <el-form-item label="Target Address" style="width: 60%;">
                    <el-input v-model="transferForm.to"></el-input>
                </el-form-item>
                <el-form-item label="Item Id" style="width: 60%">
                    <el-select v-model="transferForm.itemId" filterable>
                        <el-option v-for="(itemId, index) in itemIds" :label="itemId" :value="itemId" :key="index" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="handleTransfer()">Confirm</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div>
            <el-form label-width="auto" class="form">
                <h4>Approve Item</h4>
                <el-form-item label="Target Address" style="width: 60%;">
                    <el-input v-model="approveForm.to"></el-input>
                </el-form-item>
                <el-form-item label="Item Id" style="width: 60%">
                    <el-select v-model="approveForm.itemId" filterable>
                        <el-option v-for="(itemId, index) in itemIds" :label="itemId" :value="itemId" :key="index" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="handleApprove()">Confirm</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div>
            <el-form label-width="auto" class="form">
                <h4>Take Received Ownership of Item</h4>
                <el-form-item label="Item Id" style="width: 60%">
                    <el-input v-model="takeOwnershipForm.itemId" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleTakeOwnership()">Confirm</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div v-if="isOwner" class="only-owner">
            <el-button type="primary" style="width: 100%;" @click="handleWithdraw()">Withdraw</el-button>
            <el-form label-width="auto" class="form">
                <h4>Set CreateItem Fee</h4>
                <el-form-item label="New Fee" style="width: 60%;">
                    <el-input v-model="setCreateItemFeeForm.fee">
                        <template #append>
                            <el-select v-model="rate1" style="width: 115px">
                                <el-option v-for="(index, i) in 19" :label="`10^${i}`" :value="i" :key="index" />
                            </el-select>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSetCreateItemFee()">Confirm</el-button>
                </el-form-item>
            </el-form>
            <el-form label-width="auto" class="form">
                <h4>Set ChangeName Fee</h4>
                <el-form-item label="New Fee" style="width: 60%;">
                    <el-input v-model="setChangeNameFeeForm.fee">
                        <template #append>
                            <el-select v-model="rate2" style="width: 115px">
                                <el-option v-for="(index, i) in 19" :label="`10^${i}`" :value="i" :key="index" />
                            </el-select>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSetChangeNameFee()">Confirm</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style scoped>
.only-owner {
    border: 1px solid var(--el-border-color);
    border-radius: var(--el-border-radius-base);
    padding: 10px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
}

.item-list {
    display: flex;
    flex-wrap: wrap;
}

.item {
    margin: 10px;
}

.item .card {
    display: flex;
    flex-direction: column;
}

.form {
    padding: 0 30px;
    margin-top: 10px;
    border: 1px solid var(--el-border-color);
    border-radius: var(--el-border-radius-base);
}
</style>