import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi';
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// itsc-tiger
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const itscTigerABI = [
  {
    type: 'error',
    inputs: [
      { name: 'numerator', internalType: 'uint256', type: 'uint256' },
      { name: 'denominator', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC2981InvalidDefaultRoyalty',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC2981InvalidDefaultRoyaltyReceiver',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'numerator', internalType: 'uint256', type: 'uint256' },
      { name: 'denominator', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC2981InvalidTokenRoyalty',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
    ],
    name: 'ERC2981InvalidTokenRoyaltyReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'OperatorNotAllowed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'OPERATOR_FILTER_REGISTRY',
    outputs: [
      {
        name: '',
        internalType: 'contract IOperatorFilterRegistry',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'TOTAL_SUPLY',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: '_is_lock',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: '_is_staking',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: '_masterWallet',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: '_owners',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: '_stakingtime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'array_dan',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'baseUrl',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'tokenID', internalType: 'uint256', type: 'uint256' }],
    name: 'burnandmint',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenID', internalType: 'uint256', type: 'uint256' }],
    name: 'burnch',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'tokenid', internalType: 'uint256', type: 'uint256' }],
    name: 'burntoken',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'canmint_max',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: '_a', internalType: 'string', type: 'string' },
      { name: '_b', internalType: 'string', type: 'string' },
    ],
    name: 'concat',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'contnonce',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'baseNewURL', internalType: 'string', type: 'string' },
      { name: 'actof', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'edit_baseURL',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'pageof', internalType: 'uint256', type: 'uint256' }],
    name: 'getMiningList',
    outputs: [
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'address[]', type: 'address[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'get_ContractBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'which', internalType: 'uint256', type: 'uint256' }],
    name: 'get_continfos',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'contAdr', internalType: 'address', type: 'address' },
      { name: 'userAddress', internalType: 'address', type: 'address' },
    ],
    name: 'get_hasWhitelist',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'adr', internalType: 'address', type: 'address' }],
    name: 'get_ismanager',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenid', internalType: 'uint256', type: 'uint256' }],
    name: 'get_isstaking',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'get_mySelf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'get_royalty',
    outputs: [{ name: '', internalType: 'uint96', type: 'uint96' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'which', internalType: 'uint256', type: 'uint256' },
      { name: 'lockorunlock', internalType: 'bool', type: 'bool' },
      { name: 'actof', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'get_set_tokenlock',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenid', internalType: 'uint256', type: 'uint256' }],
    name: 'get_start_stakingtime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getbaseURL',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getcontnonce',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getmaster',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'isManager',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'cnt', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mintManager',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'mint_TotalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'mint_fee1',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'mint_starttime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'mint_step',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'mySelf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenid', internalType: 'uint256', type: 'uint256' },
      { name: 'st', internalType: 'bool', type: 'bool' },
    ],
    name: 'mytokenStaking',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'salePrice', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'royaltyInfo',
    outputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'which', internalType: 'uint256', type: 'uint256' },
      { name: 'valueof', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'set_continfos',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenid', internalType: 'uint256', type: 'uint256' },
      { name: 'st', internalType: 'bool', type: 'bool' },
    ],
    name: 'set_isstaking',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'walletAddress', internalType: 'address', type: 'address' },
      { name: 'st', internalType: 'bool', type: 'bool' },
    ],
    name: 'set_manager',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'contaddress', internalType: 'address', type: 'address' }],
    name: 'set_mySelf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newRoyalty', internalType: 'uint96', type: 'uint96' }],
    name: 'set_royalty',
    outputs: [{ name: '', internalType: 'uint96', type: 'uint96' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenid', internalType: 'uint256', type: 'uint256' },
      { name: 'stakingtime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'set_stakingtimeonly',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetContract',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'tokensOfOwner',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'wamount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdrwal_cont_to_outwallet',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const;

export const itscTigerAddress =
  '0xA2Ca2f4b7f29B6fE74ECb3d379B6d74778B3A55b' as const;

export const itscTigerConfig = {
  address: itscTigerAddress,
  abi: itscTigerABI,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__.
 */
export function useItscTigerRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"OPERATOR_FILTER_REGISTRY"`.
 */
export function useItscTigerOperatorFilterRegistry<
  TFunctionName extends 'OPERATOR_FILTER_REGISTRY',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'OPERATOR_FILTER_REGISTRY',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"TOTAL_SUPLY"`.
 */
export function useItscTigerTotalSuply<
  TFunctionName extends 'TOTAL_SUPLY',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'TOTAL_SUPLY',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"_is_lock"`.
 */
export function useItscTigerIsLock<
  TFunctionName extends '_is_lock',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: '_is_lock',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"_is_staking"`.
 */
export function useItscTigerIsStaking<
  TFunctionName extends '_is_staking',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: '_is_staking',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"_masterWallet"`.
 */
export function useItscTigerMasterWallet<
  TFunctionName extends '_masterWallet',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: '_masterWallet',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"_owners"`.
 */
export function useItscTigerOwners<
  TFunctionName extends '_owners',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: '_owners',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"_stakingtime"`.
 */
export function useItscTigerStakingtime<
  TFunctionName extends '_stakingtime',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: '_stakingtime',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"array_dan"`.
 */
export function useItscTigerArrayDan<
  TFunctionName extends 'array_dan',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'array_dan',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useItscTigerBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"baseUrl"`.
 */
export function useItscTigerBaseUrl<
  TFunctionName extends 'baseUrl',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'baseUrl',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"burnch"`.
 */
export function useItscTigerBurnch<
  TFunctionName extends 'burnch',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'burnch',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"canmint_max"`.
 */
export function useItscTigerCanmintMax<
  TFunctionName extends 'canmint_max',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'canmint_max',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"concat"`.
 */
export function useItscTigerConcat<
  TFunctionName extends 'concat',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'concat',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"contnonce"`.
 */
export function useItscTigerContnonce<
  TFunctionName extends 'contnonce',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'contnonce',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"getApproved"`.
 */
export function useItscTigerGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"getMiningList"`.
 */
export function useItscTigerGetMiningList<
  TFunctionName extends 'getMiningList',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'getMiningList',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"get_ContractBalance"`.
 */
export function useItscTigerGetContractBalance<
  TFunctionName extends 'get_ContractBalance',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'get_ContractBalance',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"get_continfos"`.
 */
export function useItscTigerGetContinfos<
  TFunctionName extends 'get_continfos',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'get_continfos',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"get_hasWhitelist"`.
 */
export function useItscTigerGetHasWhitelist<
  TFunctionName extends 'get_hasWhitelist',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'get_hasWhitelist',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"get_ismanager"`.
 */
export function useItscTigerGetIsmanager<
  TFunctionName extends 'get_ismanager',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'get_ismanager',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"get_isstaking"`.
 */
export function useItscTigerGetIsstaking<
  TFunctionName extends 'get_isstaking',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'get_isstaking',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"get_mySelf"`.
 */
export function useItscTigerGetMySelf<
  TFunctionName extends 'get_mySelf',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'get_mySelf',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"get_royalty"`.
 */
export function useItscTigerGetRoyalty<
  TFunctionName extends 'get_royalty',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'get_royalty',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"get_start_stakingtime"`.
 */
export function useItscTigerGetStartStakingtime<
  TFunctionName extends 'get_start_stakingtime',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'get_start_stakingtime',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"getbaseURL"`.
 */
export function useItscTigerGetbaseUrl<
  TFunctionName extends 'getbaseURL',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'getbaseURL',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"getcontnonce"`.
 */
export function useItscTigerGetcontnonce<
  TFunctionName extends 'getcontnonce',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'getcontnonce',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"getmaster"`.
 */
export function useItscTigerGetmaster<
  TFunctionName extends 'getmaster',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'getmaster',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useItscTigerIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"isManager"`.
 */
export function useItscTigerIsManager<
  TFunctionName extends 'isManager',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'isManager',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"mint_TotalSupply"`.
 */
export function useItscTigerMintTotalSupply<
  TFunctionName extends 'mint_TotalSupply',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'mint_TotalSupply',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"mint_fee1"`.
 */
export function useItscTigerMintFee1<
  TFunctionName extends 'mint_fee1',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'mint_fee1',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"mint_starttime"`.
 */
export function useItscTigerMintStarttime<
  TFunctionName extends 'mint_starttime',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'mint_starttime',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"mint_step"`.
 */
export function useItscTigerMintStep<
  TFunctionName extends 'mint_step',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'mint_step',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"mySelf"`.
 */
export function useItscTigerMySelf<
  TFunctionName extends 'mySelf',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'mySelf',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"name"`.
 */
export function useItscTigerName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useItscTigerOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"royaltyInfo"`.
 */
export function useItscTigerRoyaltyInfo<
  TFunctionName extends 'royaltyInfo',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'royaltyInfo',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useItscTigerSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"symbol"`.
 */
export function useItscTigerSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"targetContract"`.
 */
export function useItscTigerTargetContract<
  TFunctionName extends 'targetContract',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'targetContract',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"tokenOfOwnerByIndex"`.
 */
export function useItscTigerTokenOfOwnerByIndex<
  TFunctionName extends 'tokenOfOwnerByIndex',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'tokenOfOwnerByIndex',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useItscTigerTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"tokensOfOwner"`.
 */
export function useItscTigerTokensOfOwner<
  TFunctionName extends 'tokensOfOwner',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'tokensOfOwner',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useItscTigerTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof itscTigerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof itscTigerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itscTigerABI}__.
 */
export function useItscTigerWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itscTigerABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof itscTigerABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof itscTigerABI, TFunctionName, TMode>({
    abi: itscTigerABI,
    address: itscTigerAddress,
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"approve"`.
 */
export function useItscTigerApprove<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itscTigerABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof itscTigerABI, 'approve', TMode> & {
        abi?: never;
        functionName?: 'approve';
      } = {} as any,
) {
  return useContractWrite<typeof itscTigerABI, 'approve', TMode>({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'approve',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"burnandmint"`.
 */
export function useItscTigerBurnandmint<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itscTigerABI,
          'burnandmint'
        >['request']['abi'],
        'burnandmint',
        TMode
      > & { functionName?: 'burnandmint' }
    : UseContractWriteConfig<typeof itscTigerABI, 'burnandmint', TMode> & {
        abi?: never;
        functionName?: 'burnandmint';
      } = {} as any,
) {
  return useContractWrite<typeof itscTigerABI, 'burnandmint', TMode>({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'burnandmint',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"burntoken"`.
 */
export function useItscTigerBurntoken<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itscTigerABI,
          'burntoken'
        >['request']['abi'],
        'burntoken',
        TMode
      > & { functionName?: 'burntoken' }
    : UseContractWriteConfig<typeof itscTigerABI, 'burntoken', TMode> & {
        abi?: never;
        functionName?: 'burntoken';
      } = {} as any,
) {
  return useContractWrite<typeof itscTigerABI, 'burntoken', TMode>({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'burntoken',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"edit_baseURL"`.
 */
export function useItscTigerEditBaseUrl<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itscTigerABI,
          'edit_baseURL'
        >['request']['abi'],
        'edit_baseURL',
        TMode
      > & { functionName?: 'edit_baseURL' }
    : UseContractWriteConfig<typeof itscTigerABI, 'edit_baseURL', TMode> & {
        abi?: never;
        functionName?: 'edit_baseURL';
      } = {} as any,
) {
  return useContractWrite<typeof itscTigerABI, 'edit_baseURL', TMode>({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'edit_baseURL',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"get_set_tokenlock"`.
 */
export function useItscTigerGetSetTokenlock<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itscTigerABI,
          'get_set_tokenlock'
        >['request']['abi'],
        'get_set_tokenlock',
        TMode
      > & { functionName?: 'get_set_tokenlock' }
    : UseContractWriteConfig<
        typeof itscTigerABI,
        'get_set_tokenlock',
        TMode
      > & {
        abi?: never;
        functionName?: 'get_set_tokenlock';
      } = {} as any,
) {
  return useContractWrite<typeof itscTigerABI, 'get_set_tokenlock', TMode>({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'get_set_tokenlock',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"mintManager"`.
 */
export function useItscTigerMintManager<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itscTigerABI,
          'mintManager'
        >['request']['abi'],
        'mintManager',
        TMode
      > & { functionName?: 'mintManager' }
    : UseContractWriteConfig<typeof itscTigerABI, 'mintManager', TMode> & {
        abi?: never;
        functionName?: 'mintManager';
      } = {} as any,
) {
  return useContractWrite<typeof itscTigerABI, 'mintManager', TMode>({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'mintManager',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"mytokenStaking"`.
 */
export function useItscTigerMytokenStaking<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itscTigerABI,
          'mytokenStaking'
        >['request']['abi'],
        'mytokenStaking',
        TMode
      > & { functionName?: 'mytokenStaking' }
    : UseContractWriteConfig<typeof itscTigerABI, 'mytokenStaking', TMode> & {
        abi?: never;
        functionName?: 'mytokenStaking';
      } = {} as any,
) {
  return useContractWrite<typeof itscTigerABI, 'mytokenStaking', TMode>({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'mytokenStaking',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useItscTigerSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itscTigerABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof itscTigerABI, 'safeTransferFrom', TMode> & {
        abi?: never;
        functionName?: 'safeTransferFrom';
      } = {} as any,
) {
  return useContractWrite<typeof itscTigerABI, 'safeTransferFrom', TMode>({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'safeTransferFrom',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useItscTigerSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itscTigerABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<
        typeof itscTigerABI,
        'setApprovalForAll',
        TMode
      > & {
        abi?: never;
        functionName?: 'setApprovalForAll';
      } = {} as any,
) {
  return useContractWrite<typeof itscTigerABI, 'setApprovalForAll', TMode>({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'setApprovalForAll',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"set_continfos"`.
 */
export function useItscTigerSetContinfos<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itscTigerABI,
          'set_continfos'
        >['request']['abi'],
        'set_continfos',
        TMode
      > & { functionName?: 'set_continfos' }
    : UseContractWriteConfig<typeof itscTigerABI, 'set_continfos', TMode> & {
        abi?: never;
        functionName?: 'set_continfos';
      } = {} as any,
) {
  return useContractWrite<typeof itscTigerABI, 'set_continfos', TMode>({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'set_continfos',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"set_isstaking"`.
 */
export function useItscTigerSetIsstaking<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itscTigerABI,
          'set_isstaking'
        >['request']['abi'],
        'set_isstaking',
        TMode
      > & { functionName?: 'set_isstaking' }
    : UseContractWriteConfig<typeof itscTigerABI, 'set_isstaking', TMode> & {
        abi?: never;
        functionName?: 'set_isstaking';
      } = {} as any,
) {
  return useContractWrite<typeof itscTigerABI, 'set_isstaking', TMode>({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'set_isstaking',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"set_manager"`.
 */
export function useItscTigerSetManager<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itscTigerABI,
          'set_manager'
        >['request']['abi'],
        'set_manager',
        TMode
      > & { functionName?: 'set_manager' }
    : UseContractWriteConfig<typeof itscTigerABI, 'set_manager', TMode> & {
        abi?: never;
        functionName?: 'set_manager';
      } = {} as any,
) {
  return useContractWrite<typeof itscTigerABI, 'set_manager', TMode>({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'set_manager',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"set_mySelf"`.
 */
export function useItscTigerSetMySelf<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itscTigerABI,
          'set_mySelf'
        >['request']['abi'],
        'set_mySelf',
        TMode
      > & { functionName?: 'set_mySelf' }
    : UseContractWriteConfig<typeof itscTigerABI, 'set_mySelf', TMode> & {
        abi?: never;
        functionName?: 'set_mySelf';
      } = {} as any,
) {
  return useContractWrite<typeof itscTigerABI, 'set_mySelf', TMode>({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'set_mySelf',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"set_royalty"`.
 */
export function useItscTigerSetRoyalty<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itscTigerABI,
          'set_royalty'
        >['request']['abi'],
        'set_royalty',
        TMode
      > & { functionName?: 'set_royalty' }
    : UseContractWriteConfig<typeof itscTigerABI, 'set_royalty', TMode> & {
        abi?: never;
        functionName?: 'set_royalty';
      } = {} as any,
) {
  return useContractWrite<typeof itscTigerABI, 'set_royalty', TMode>({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'set_royalty',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"set_stakingtimeonly"`.
 */
export function useItscTigerSetStakingtimeonly<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itscTigerABI,
          'set_stakingtimeonly'
        >['request']['abi'],
        'set_stakingtimeonly',
        TMode
      > & { functionName?: 'set_stakingtimeonly' }
    : UseContractWriteConfig<
        typeof itscTigerABI,
        'set_stakingtimeonly',
        TMode
      > & {
        abi?: never;
        functionName?: 'set_stakingtimeonly';
      } = {} as any,
) {
  return useContractWrite<typeof itscTigerABI, 'set_stakingtimeonly', TMode>({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'set_stakingtimeonly',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useItscTigerTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itscTigerABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof itscTigerABI, 'transferFrom', TMode> & {
        abi?: never;
        functionName?: 'transferFrom';
      } = {} as any,
) {
  return useContractWrite<typeof itscTigerABI, 'transferFrom', TMode>({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'transferFrom',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"withdrwal_cont_to_outwallet"`.
 */
export function useItscTigerWithdrwalContToOutwallet<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof itscTigerABI,
          'withdrwal_cont_to_outwallet'
        >['request']['abi'],
        'withdrwal_cont_to_outwallet',
        TMode
      > & { functionName?: 'withdrwal_cont_to_outwallet' }
    : UseContractWriteConfig<
        typeof itscTigerABI,
        'withdrwal_cont_to_outwallet',
        TMode
      > & {
        abi?: never;
        functionName?: 'withdrwal_cont_to_outwallet';
      } = {} as any,
) {
  return useContractWrite<
    typeof itscTigerABI,
    'withdrwal_cont_to_outwallet',
    TMode
  >({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'withdrwal_cont_to_outwallet',
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itscTigerABI}__.
 */
export function usePrepareItscTigerWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itscTigerABI, TFunctionName>,
    'abi' | 'address'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itscTigerABI,
    address: itscTigerAddress,
    ...config,
  } as UsePrepareContractWriteConfig<typeof itscTigerABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareItscTigerApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itscTigerABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itscTigerABI, 'approve'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"burnandmint"`.
 */
export function usePrepareItscTigerBurnandmint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itscTigerABI, 'burnandmint'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'burnandmint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itscTigerABI, 'burnandmint'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"burntoken"`.
 */
export function usePrepareItscTigerBurntoken(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itscTigerABI, 'burntoken'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'burntoken',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itscTigerABI, 'burntoken'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"edit_baseURL"`.
 */
export function usePrepareItscTigerEditBaseUrl(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itscTigerABI, 'edit_baseURL'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'edit_baseURL',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itscTigerABI, 'edit_baseURL'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"get_set_tokenlock"`.
 */
export function usePrepareItscTigerGetSetTokenlock(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itscTigerABI, 'get_set_tokenlock'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'get_set_tokenlock',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itscTigerABI, 'get_set_tokenlock'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"mintManager"`.
 */
export function usePrepareItscTigerMintManager(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itscTigerABI, 'mintManager'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'mintManager',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itscTigerABI, 'mintManager'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"mytokenStaking"`.
 */
export function usePrepareItscTigerMytokenStaking(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itscTigerABI, 'mytokenStaking'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'mytokenStaking',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itscTigerABI, 'mytokenStaking'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareItscTigerSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itscTigerABI, 'safeTransferFrom'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itscTigerABI, 'safeTransferFrom'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareItscTigerSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itscTigerABI, 'setApprovalForAll'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itscTigerABI, 'setApprovalForAll'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"set_continfos"`.
 */
export function usePrepareItscTigerSetContinfos(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itscTigerABI, 'set_continfos'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'set_continfos',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itscTigerABI, 'set_continfos'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"set_isstaking"`.
 */
export function usePrepareItscTigerSetIsstaking(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itscTigerABI, 'set_isstaking'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'set_isstaking',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itscTigerABI, 'set_isstaking'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"set_manager"`.
 */
export function usePrepareItscTigerSetManager(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itscTigerABI, 'set_manager'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'set_manager',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itscTigerABI, 'set_manager'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"set_mySelf"`.
 */
export function usePrepareItscTigerSetMySelf(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itscTigerABI, 'set_mySelf'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'set_mySelf',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itscTigerABI, 'set_mySelf'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"set_royalty"`.
 */
export function usePrepareItscTigerSetRoyalty(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itscTigerABI, 'set_royalty'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'set_royalty',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itscTigerABI, 'set_royalty'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"set_stakingtimeonly"`.
 */
export function usePrepareItscTigerSetStakingtimeonly(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itscTigerABI, 'set_stakingtimeonly'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'set_stakingtimeonly',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itscTigerABI, 'set_stakingtimeonly'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareItscTigerTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof itscTigerABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itscTigerABI, 'transferFrom'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link itscTigerABI}__ and `functionName` set to `"withdrwal_cont_to_outwallet"`.
 */
export function usePrepareItscTigerWithdrwalContToOutwallet(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof itscTigerABI,
      'withdrwal_cont_to_outwallet'
    >,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: itscTigerABI,
    address: itscTigerAddress,
    functionName: 'withdrwal_cont_to_outwallet',
    ...config,
  } as UsePrepareContractWriteConfig<typeof itscTigerABI, 'withdrwal_cont_to_outwallet'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link itscTigerABI}__.
 */
export function useItscTigerEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof itscTigerABI, TEventName>,
    'abi' | 'address'
  > = {} as any,
) {
  return useContractEvent({
    abi: itscTigerABI,
    address: itscTigerAddress,
    ...config,
  } as UseContractEventConfig<typeof itscTigerABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link itscTigerABI}__ and `eventName` set to `"Approval"`.
 */
export function useItscTigerApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof itscTigerABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: itscTigerABI,
    address: itscTigerAddress,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof itscTigerABI, 'Approval'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link itscTigerABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useItscTigerApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof itscTigerABI, 'ApprovalForAll'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: itscTigerABI,
    address: itscTigerAddress,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof itscTigerABI, 'ApprovalForAll'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link itscTigerABI}__ and `eventName` set to `"Transfer"`.
 */
export function useItscTigerTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof itscTigerABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: itscTigerABI,
    address: itscTigerAddress,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof itscTigerABI, 'Transfer'>);
}
