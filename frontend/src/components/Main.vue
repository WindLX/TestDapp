<script setup lang="ts">
import Wallet from './Wallet.vue';
import { ElTabs, ElTabPane } from 'element-plus';
import { useViteStore } from '../utils/store';

const vite_store = useViteStore();
</script>

<template>
    <div class="main">
        <el-tabs type="border-card">
            <el-tab-pane v-for="(item, index) in vite_store.accounts" :key="index" :label="index.toString()">
                <Wallet :address="item.address" :mnemonic="item.mnemonic"></Wallet>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style scoped>
.main {
    margin-top: 150px;
}
</style>