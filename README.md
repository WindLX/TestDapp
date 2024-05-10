# Vite

Vite 目前仍在快速开发中，官方正在快速向新版迁移，查看文档时一定注意节点、SDK、API的版本问题。

+ 新版文档[New](https://docs.vite.org/vuilder-docs/vite-basics/)
+ 旧版文档[Old](https://docs.vite.org/vite-docs/introduction/)

官方仓库[ViteLabs](https://github.com/vitelabs/)，node客户端，SDK，编译器，项目模板，开发套件均在此环境中。

官方测试网络关闭了discord机器人，目前无法获取Vite Token。

## 创始块配置文档

```json
{
  "GenesisAccountAddress": "vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792",
  "UpgradeCfg": {
    "Level": "latest"
  },
  "GovernanceInfo": {
    "ConsensusGroupInfoMap": {
      "00000000000000000001": {
        "NodeCount": 1,
        "Interval": 1,
        "PerCount": 3,
        "RandCount": 0,
        "RandRank": 100,
        "Repeat": 1,
        "CheckLevel": 0,
        "CountingTokenId": "tti_5649544520544f4b454e6e40",
        "RegisterConditionId": 1,
        "RegisterConditionParam": {
          "StakeAmount": 500000000000000000000000,
          "StakeHeight": 1,
          "StakeToken": "tti_5649544520544f4b454e6e40"
        },
        "VoteConditionId": 1,
        "VoteConditionParam": {},
        "Owner": "vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792",
        "StakeAmount": 0,
        "ExpirationHeight": 1
      },
      "00000000000000000002": {
        "NodeCount": 1,
        "Interval": 3,
        "PerCount": 1,
        "RandCount": 0,
        "RandRank": 100,
        "Repeat": 48,
        "CheckLevel": 1,
        "CountingTokenId": "tti_5649544520544f4b454e6e40",
        "RegisterConditionId": 1,
        "RegisterConditionParam": {
          "StakeAmount": 500000000000000000000000,
          "StakeToken": "tti_5649544520544f4b454e6e40"
        },
        "VoteConditionId": 1,
        "VoteConditionParam": {},
        "Owner": "vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792",
        "StakeAmount": 0,
        "ExpirationHeight": 1
      }
    },
    "RegistrationInfoMap": {
      "00000000000000000001": {
        "s1": {
          "BlockProducingAddress": "vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906",
          "StakeAddress": "vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906",
          "Amount": 500000000000000000000000,
          "ExpirationHeight": 7776000,
          "RewardTime": 1,
          "RevokeTime": 0,
          "HistoryAddressList": [
            "vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906"
          ]
        }
      },
      "00000000000000000002": {
        "s1": {
          "BlockProducingAddress": "vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906",
          "StakeAddress": "vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906",
          "Amount": 500000000000000000000000,
          "ExpirationHeight": 7776000,
          "RewardTime": 1,
          "RevokeTime": 0,
          "HistoryAddressList": [
            "vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906"
          ]
        }
      }
    }
  },
  "AssetInfo": {
    "TokenInfoMap": {
      "tti_5649544520544f4b454e6e40": {
        "TokenName": "Vite Token",
        "TokenSymbol": "VITE",
        "TotalSupply": 1000000000000000000000000000,
        "Decimals": 18,
        "Owner": "vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792",
        "MaxSupply": 115792089237316195423570985008687907853269984665640564039457584007913129639935,
        "IsOwnerBurnOnly": false,
        "IsReIssuable": true
      }
    },
    "LogList": [
      {
        "Data": "",
        "Topics": [
          "3f9dcc00d5e929040142c3fb2b67a3be1b0e91e98dac18d5bc2b7817a4cfecb6",
          "000000000000000000000000000000000000000000005649544520544f4b454e"
        ]
      }
    ]
  },
  "QuotaInfo": {
    "StakeBeneficialMap": {
      "vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792": 10000000000000000000000
    },
    "StakeInfoMap": {
      "vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792": [
        {
          "Amount": 10000000000000000000000,
          "ExpirationHeight": 259200,
          "Beneficiary": "vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792"
        }
      ]
    }
  },
  "AccountBalanceMap": {
    "vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792": {
      "tti_5649544520544f4b454e6e40": 899980000000000000000000000
    },
    "vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906": {
      "tti_5649544520544f4b454e6e40": 10000000000000000000000
    }
  }
}
```

## Solidity

+ Solidity官方文档[Doc](https://docs.soliditylang.org/zh/latest/introduction-to-smart-contracts.html)
+ 快速学习Solidity的网站[ZombieToken](https://cryptozombies.io/zh/course)
+ Solidity和Solidity对比[Soliditypp](https://docs.vite.org/vuilder-docs/soliditypp/migration-guide/migrate-from-solidity.html)

solidity 重要类库 openzeppelin

## Debug

使用vscode插件 `Solidity++ 0.8 Preview` 进行开发，官方的Solidityppcc插件适用版本为`0.4.x`的`Solidity++`合约，目前cpp版本的编译器`solppc`仅支持`0.4.x`版本，未更新到`0.8.x`的`Solidity++`。使用`solppc-js`搭配`vuilder`开发`0.8.x`版本的合约。

## API

新版本的node客户端基于2.0版本的API。API的几种调用模式支持情况：

+ **IPC**：Supported by all RPC API
    1. *nix(Linux Darwin): ~/.gvite/testdata/gvite.ipc
    1. Windows: \\.\pipe\gvite.ipc

+ **Http**：Supported by public API. Default port is 48132. Note: API in wallet module is excluded

+ **WebSocket**：Supported by public API. Default port is 31420. Note: API in wallet module is excluded

## SDK

### Vite.js

重点关注 Account 和 AccountBlock，这两个模块是对调用区块链进行事务和账户管理的关键抽象。

事件订阅功能开启需要在 `node_config.json` 进行配置

> Add `"subscribe"` in `"PublicModules"` and set `"SubscribeEnabled":true` in `node_config.json` to enable the subscription API

### Vite 的密码学

[Cryptography](https://docs.vite.org/vuilder-docs/vite-basics/cryptography/hash-algorithm.html)

vite地址生成器

```python
from hashlib import blake2b
from datetime import datetime


def generate_vite_address(seed: str) -> str:
    # Step 1: Generate the BLAKE2b hashed public key
    pub_hash = blake2b(seed.encode(), digest_size=20).hexdigest()

    # Step 2: Calculate the checksum of the public key's hash
    checksum = blake2b(pub_hash.encode(), digest_size=5).hexdigest()

    # Step 3: Concatenate the prefix, hashed public key, and checksum
    address = f"vite_{pub_hash}{checksum}"

    return address


if __name__ == "__main__":
    seed = str(datetime.now())
    vite_address = generate_vite_address(seed)
    print(vite_address)

```