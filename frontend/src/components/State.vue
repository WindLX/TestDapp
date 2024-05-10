<script setup lang="ts">
import { onDeactivated, onMounted, ref } from 'vue';
import { ElButton, ElRow, ElCol, ElStatistic, ElInput, ElForm, ElFormItem } from 'element-plus';
import { useViteStore } from '../utils/store';
import { LoginForm } from "../utils/types"

const vite_store = useViteStore();

const ws = vite_store.current_node;
const contract_address = vite_store.item_ownership_address;
const snapshot_block_height = ref(0);
const owner = ref('')

let off: any = null;

const defaultForm = {
    address: "",
    mnemonic: "",
}

const form = ref<LoginForm>(defaultForm)

function onLogin() {
    vite_store.login(form.value);
    form.value = defaultForm
}

function onCancel() {
    form.value = defaultForm
}

onMounted(async () => {
    off = await vite_store.item_ownership_helper?.subscribeNewSnapshotBlock((event) => {
        snapshot_block_height.value = parseInt(event[0].height);
    });

    owner.value = (await vite_store.item_ownership_helper?.owner() as unknown as Array<string>)[0];
})

onDeactivated(() => {
    off?.();
    off = null;
})
</script>

<template>
    <div class="state">
        <el-row :gutter="20">
            <el-col :span="3">
                <div class="title">
                    <div class="head">Current Node</div>
                    <div class="content">{{ ws }}</div>
                </div>
            </el-col>
            <el-col :span="3">
                <el-statistic title="Snapshot Block Height" :value="snapshot_block_height" />
            </el-col>
            <el-col :span="9">
                <div class="title">
                    <div class="head">Contract Address</div>
                    <div class="content">{{ contract_address }}</div>
                </div>
            </el-col>
            <el-col :span="9">
                <div class="title">
                    <div class="head">Contract Owner</div>
                    <div class="content">{{ owner }}</div>
                </div>
            </el-col>
        </el-row>
        <el-form :model="form" label-width="auto" style="max-width: 80%">
            <el-form-item label="Address">
                <el-input v-model="form.address" placeholder="Please input address" />
            </el-form-item>
            <el-form-item label="Mnemonic">
                <el-input v-model="form.mnemonic" placeholder="Please input mnemonic" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onLogin">Login</el-button>
                <el-button @click="onCancel">Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style>
.title {
    --el-statistic-title-font-weight: 400;
    --el-statistic-title-font-size: var(--el-font-size-extra-small);
    --el-statistic-title-color: var(--el-text-color-regular);
    --el-statistic-content-font-weight: 400;
    --el-statistic-content-font-size: var(--el-font-size-extra-large);
    --el-statistic-content-color: var(--el-text-color-primary);
}

.title .head {
    color: var(--el-statistic-title-color);
    font-size: var(--el-statistic-title-font-size);
    font-weight: var(--el-statistic-title-font-weight);
    line-height: 20px;
    margin-bottom: 4px;
}

.title .content {
    color: var(--el-statistic-content-color);
    font-size: var(--el-statistic-content-font-size);
    font-weight: var(--el-statistic-content-font-weight);
    margin-bottom: 20px;
}
</style>