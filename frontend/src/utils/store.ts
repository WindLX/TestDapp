import { defineStore } from "pinia";
import { config } from "./config";
import { ViteAPI, WS_RPC } from "@vite/vitejs";
import { ItemOwnershipHelper } from "../contracts/itemOwnershipHelper";
import { LoginForm } from "./types";

export const useViteStore = defineStore('vite', {
    state: () => {
        let ws_service = new WS_RPC(config.ws);
        let provider = new ViteAPI(ws_service, () => {
            console.log(`Connected to ${config.ws}`);
        });
        let item_ownership_helper = new ItemOwnershipHelper(provider);
        let accounts: Array<LoginForm> = [];
        accounts.push(config.u0);
        accounts.push(config.u1);
        return {
            current_node: config.ws,
            provider,
            item_ownership_address: config.item_ownership_address,
            item_ownership_helper: item_ownership_helper,
            accounts
        }
    },
    getters: {
        snapshotBlockHeight: async (state): Promise<number> => {
            return await state.provider.request('ledger_getSnapshotChainHeight');
        },
    },
    actions: {
        login(account: LoginForm) {
            this.accounts.push(account);
        },
        logout(address: string) {
            this.accounts = this.accounts.filter(a => a.address != address);
        }
    }
})