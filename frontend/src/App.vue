<script setup lang="ts">
import State from './components/State.vue';
import Main from './components/Main.vue';
import { ElHeader, ElMain, ElContainer } from 'element-plus';
</script>

<template>
  <el-container>
    <el-header>
      <State></State>
    </el-header>
    <el-main>
      <Main></Main>
    </el-main>
  </el-container>
</template>

<style scoped></style>
