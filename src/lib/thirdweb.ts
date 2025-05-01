import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { B3Sepolia } from '@thirdweb-dev/chains';
import { EMOJI_CONTRACT_ABI } from './abi/EmojiChat';

export const CLIENT_ID = 'af87b9c2acce067efa781dc3ea43644d';

// コントラクトアドレス
export const EMOJI_CONTRACT_ADDRESS =
  '0x19433a501988B3555035C3C23ba1B3df2085a4Da';

// SDKの初期化
export const sdk = new ThirdwebSDK(B3Sepolia, {
  clientId: CLIENT_ID,
});

// コントラクトインスタンスの取得
export const getContract = async () => {
  return await sdk.getContract(EMOJI_CONTRACT_ADDRESS, EMOJI_CONTRACT_ABI);
};

// ABIをexport
export { EMOJI_CONTRACT_ABI };
