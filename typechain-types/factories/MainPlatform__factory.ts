/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { MainPlatform, MainPlatformInterface } from "../MainPlatform";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string[]",
        name: "labels",
        type: "string[]",
      },
    ],
    name: "addQuestion",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllQuestions",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isRegisteredUser",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "register",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "questionID",
        type: "uint256",
      },
    ],
    name: "scoresFor",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalQuestions",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalUsers",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "userBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "questionID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "voteOption",
        type: "uint256",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002cb138038062002cb18339810160408190526200003491620001b2565b33620000875760405162461bcd60e51b815260206004820152601760248201527f56616c696420616464726573732072657175697265642e00000000000000000060448201526064015b60405180910390fd5b80336001600160a01b03821614620000f25760405162461bcd60e51b815260206004820152602760248201527f4d6574686f6420657865637574696f6e20616c6c6f77656420746f206f776e65604482015266391037b7363c9760c91b60648201526084016200007e565b600080546001600160a01b0319166001600160a01b0384161781556001556200011a62000122565b50506200020b565b3360009081526004602052604090205415620001815760405162461bcd60e51b815260206004820152601360248201527f416c726561647920726567697374657265642e0000000000000000000000000060448201526064016200007e565b336000908152600460205260408120620f424090556003805460019290620001ab908490620001e4565b9091555050565b600060208284031215620001c557600080fd5b81516001600160a01b0381168114620001dd57600080fd5b9392505050565b600082198211156200020657634e487b7160e01b600052601160045260246000fd5b500190565b612a96806200021b6000396000f3fe60806040523480156200001157600080fd5b5060043610620000ab5760003560e01c80638da5cb5b116200006e5780638da5cb5b146200013a578063b384abef1462000156578063bea5b914146200016d578063bf0e4abf1462000176578063bff1f9e1146200019d57600080fd5b80630103c92b14620000b05780631aa3a00814620000da5780632af9338e14620000e6578063366b19ae1462000100578063649c86381462000123575b600080fd5b620000c7620000c136600462000917565b620001a6565b6040519081526020015b60405180910390f35b620000e46200021c565b005b620000f0620002a2565b604051620000d192919062000a2a565b3360009081526004602052604090205415156040519015158152602001620000d1565b620000c76200013436600462000a5c565b6200045a565b6000546040516001600160a01b039091168152602001620000d1565b620000e46200016736600462000b2a565b6200061c565b600154620000c7565b6200018d6200018736600462000b4d565b620007f4565b604051620000d192919062000b67565b600354620000c7565b600033620001d15760405162461bcd60e51b8152600401620001c89062000b90565b60405180910390fd5b33600090815260046020526040902054620002005760405162461bcd60e51b8152600401620001c89062000bc7565b506001600160a01b031660009081526004602052604090205490565b3360009081526004602052604090205415620002715760405162461bcd60e51b815260206004820152601360248201527220b63932b0b23c903932b3b4b9ba32b932b21760691b6044820152606401620001c8565b336000908152600460205260408120620f4240905560038054600192906200029b90849062000c0d565b9091555050565b606080600060015467ffffffffffffffff811115620002c557620002c562000c28565b604051908082528060200260200182016040528015620002ef578160200160208202803683370190505b509050600060015467ffffffffffffffff81111562000312576200031262000c28565b6040519080825280602002602001820160405280156200034757816020015b6060815260200190600190039081620003315790505b50905060005b6002548110156200045057808382815181106200036e576200036e62000c3e565b6020026020010181815250506002818154811062000390576200039062000c3e565b600091825260208220015460408051600162c3e57160e01b0319815290516001600160a01b039092169263ff3c1a8f92600480840193829003018186803b158015620003db57600080fd5b505afa158015620003f0573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526200041a919081019062000cfd565b8282815181106200042f576200042f62000c3e565b60200260200101819052508080620004479062000d36565b9150506200034d565b5090939092509050565b6000336200047c5760405162461bcd60e51b8152600401620001c89062000b90565b33600090815260046020526040902054620004ab5760405162461bcd60e51b8152600401620001c89062000bc7565b33600090815260046020526040902054620005095760405162461bcd60e51b815260206004820152601d60248201527f496e73756669636369656e7420706c6174666f726d20706f696e74732e0000006044820152606401620001c8565b3360009081526004602052604090205460649081106200053d5760405162461bcd60e51b8152600401620001c89062000d54565b600086868686604051620005519062000909565b62000560949392919062000dc2565b604051809103906000f0801580156200057d573d6000803e3d6000fd5b50600280546001808201835560009283527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace90910180546001600160a01b0319166001600160a01b038516179055805492935091829190620005e190839062000c0d565b909155505060015492505033600090815260046020526040812080548392906200060d90849062000e7c565b90915550919695505050505050565b336200063c5760405162461bcd60e51b8152600401620001c89062000b90565b816001548110620006875760405162461bcd60e51b815260206004820152601460248201527324b73b30b634b21038bab2b9ba34b7b71024a21760611b6044820152606401620001c8565b33600090815260046020526040902054620006b65760405162461bcd60e51b8152600401620001c89062000bc7565b33600090815260046020526040902054620007145760405162461bcd60e51b815260206004820152601d60248201527f496e73756669636369656e7420706c6174666f726d20706f696e74732e0000006044820152606401620001c8565b336000908152600460205260409020546001908110620007485760405162461bcd60e51b8152600401620001c89062000d54565b600284815481106200075e576200075e62000c3e565b6000918252602090912001546040516319b05f4960e01b8152600481018590526001600160a01b03909116906319b05f4990602401600060405180830381600087803b158015620007ae57600080fd5b505af1158015620007c3573d6000803e3d6000fd5b50503360009081526004602052604081208054859450909250620007e990849062000e7c565b909155505050505050565b60608033620008175760405162461bcd60e51b8152600401620001c89062000b90565b826001548110620008625760405162461bcd60e51b815260206004820152601460248201527324b73b30b634b21038bab2b9ba34b7b71024a21760611b6044820152606401620001c8565b6002848154811062000878576200087862000c3e565b60009182526020822001546040805163498ea0b760e11b815290516001600160a01b039092169263931d416e92600480840193829003018186803b158015620008c057600080fd5b505afa158015620008d5573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052620008ff919081019062000f30565b9250925050915091565b611a4a806200101783390190565b6000602082840312156200092a57600080fd5b81356001600160a01b03811681146200094257600080fd5b9392505050565b600081518084526020808501945080840160005b838110156200097b578151875295820195908201906001016200095d565b509495945050505050565b60005b83811015620009a357818101518382015260200162000989565b83811115620009b3576000848401525b50505050565b600081518084526020808501808196508360051b8101915082860160005b8581101562000a1d57828403895281518051808652620009fd8188880189850162000986565b99860199601f01601f1916949094018501935090840190600101620009d7565b5091979650505050505050565b60408152600062000a3f604083018562000949565b828103602084015262000a538185620009b9565b95945050505050565b6000806000806040858703121562000a7357600080fd5b843567ffffffffffffffff8082111562000a8c57600080fd5b818701915087601f83011262000aa157600080fd5b81358181111562000ab157600080fd5b88602082850101111562000ac457600080fd5b60209283019650945090860135908082111562000ae057600080fd5b818701915087601f83011262000af557600080fd5b81358181111562000b0557600080fd5b8860208260051b850101111562000b1b57600080fd5b95989497505060200194505050565b6000806040838503121562000b3e57600080fd5b50508035926020909101359150565b60006020828403121562000b6057600080fd5b5035919050565b60408152600062000b7c6040830185620009b9565b828103602084015262000a53818562000949565b60208082526017908201527f56616c696420616464726573732072657175697265642e000000000000000000604082015260600190565b6020808252601690820152752932b3b4b9ba32b932b2103ab9b2b9399037b7363c9760511b604082015260600190565b634e487b7160e01b600052601160045260246000fd5b6000821982111562000c235762000c2362000bf7565b500190565b634e487b7160e01b600052604160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171562000c805762000c8062000c28565b604052919050565b600082601f83011262000c9a57600080fd5b815167ffffffffffffffff81111562000cb75762000cb762000c28565b62000ccc601f8201601f191660200162000c54565b81815284602083860101111562000ce257600080fd5b62000cf582602083016020870162000986565b949350505050565b60006020828403121562000d1057600080fd5b815167ffffffffffffffff81111562000d2857600080fd5b62000cf58482850162000c88565b600060001982141562000d4d5762000d4d62000bf7565b5060010190565b60208082526025908201527f496e73756669636369656e7420616374696f6e20706f696e74732072656d61696040820152643734b7339760d91b606082015260800190565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b60408152600062000dd860408301868862000d99565b602083820381850152818583528183019050818660051b8401018760005b8881101562000e6c57858303601f190184528135368b9003601e1901811262000e1e57600080fd5b8a01803567ffffffffffffffff81111562000e3857600080fd5b8036038c131562000e4857600080fd5b62000e57858289850162000d99565b95870195945050509084019060010162000df6565b50909a9950505050505050505050565b60008282101562000e915762000e9162000bf7565b500390565b600067ffffffffffffffff82111562000eb35762000eb362000c28565b5060051b60200190565b600082601f83011262000ecf57600080fd5b8151602062000ee862000ee28362000e96565b62000c54565b82815260059290921b8401810191818101908684111562000f0857600080fd5b8286015b8481101562000f25578051835291830191830162000f0c565b509695505050505050565b6000806040838503121562000f4457600080fd5b825167ffffffffffffffff8082111562000f5d57600080fd5b818501915085601f83011262000f7257600080fd5b8151602062000f8562000ee28362000e96565b82815260059290921b8401810191818101908984111562000fa557600080fd5b8286015b8481101562000fe25780518681111562000fc35760008081fd5b62000fd38c86838b010162000c88565b84525091830191830162000fa9565b509188015191965090935050508082111562000ffd57600080fd5b506200100c8582860162000ebd565b915050925092905056fe60806040523480156200001157600080fd5b5060405162001a4a38038062001a4a833981016040819052620000349162000275565b600080546001600160a01b0319163317905581516200005b906001906020850190620000d1565b50806040516200006b9062000160565b6200007791906200036c565b604051809103906000f08015801562000094573d6000803e3d6000fd5b50600380546001600160a01b0319166001600160a01b03929092169190911790555050600060048190556005819055600681905560095562000427565b828054620000df90620003ea565b90600052602060002090601f0160209004810192826200010357600085556200014e565b82601f106200011e57805160ff19168380011785556200014e565b828001600101855582156200014e579182015b828111156200014e57825182559160200191906001019062000131565b506200015c9291506200016e565b5090565b6109bd806200108d83390190565b5b808211156200015c57600081556001016200016f565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b0381118282101715620001c657620001c662000185565b604052919050565b60005b83811015620001eb578181015183820152602001620001d1565b83811115620001fb576000848401525b50505050565b600082601f8301126200021357600080fd5b81516001600160401b038111156200022f576200022f62000185565b62000244601f8201601f19166020016200019b565b8181528460208386010111156200025a57600080fd5b6200026d826020830160208701620001ce565b949350505050565b600080604083850312156200028957600080fd5b82516001600160401b0380821115620002a157600080fd5b620002af8683870162000201565b9350602091508185015181811115620002c757600080fd5b8501601f81018713620002d957600080fd5b805182811115620002ee57620002ee62000185565b8060051b620002ff8582016200019b565b918252828101850191858101908a8411156200031a57600080fd5b86850192505b838310156200035b578251868111156200033a5760008081fd5b6200034a8c898389010162000201565b835250918601919086019062000320565b809750505050505050509250929050565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b82811015620003dd57878503603f1901845281518051808752620003bd818989018a8501620001ce565b601f01601f19169590950186019450928501929085019060010162000393565b5092979650505050505050565b600181811c90821680620003ff57607f821691505b602082108114156200042157634e487b7160e01b600052602260045260246000fd5b50919050565b610c5680620004376000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c8063893d20e811610097578063b0f41e1311610066578063b0f41e13146101b2578063d1730f1f146101ba578063e0619c83146101cd578063ff3c1a8f146101d557600080fd5b8063893d20e814610166578063931d416e14610181578063a6fedc7014610197578063a877db9f146101aa57600080fd5b80631a092541116100d35780631a0925411461012e5780632606a10b146101435780635f5300ff1461014b5780636eb836891461015357600080fd5b80630a39e7bc146100fa578063185c6f841461010457806319b05f491461011b575b600080fd5b6101026101dd565b005b6006545b6040519081526020015b60405180910390f35b610102610129366004610783565b6102a1565b6101366103a0565b60405161011291906107f8565b610102610435565b600954610108565b610102610161366004610812565b6104aa565b6000546040516001600160a01b039091168152602001610112565b6101896104bb565b604051610112929190610884565b6101026101a5366004610812565b6105d4565b6101026105e0565b600554610108565b6101086101c8366004610783565b610655565b600454610108565b6101366106d8565b3360009081526007602052604090205460ff16156102165760405162461bcd60e51b815260040161020d9061091f565b60405180910390fd5b60085460ff16156102395760405162461bcd60e51b815260040161020d90610956565b6008805460ff191660019081179091556005805460009061025b9084906109a1565b9091555050336000908152600760205260408120805460ff1916600190811790915560098054919290916102909084906109a1565b90915550506008805460ff19169055565b3360009081526007602052604090205460ff16156102d15760405162461bcd60e51b815260040161020d9061091f565b60085460ff16156102f45760405162461bcd60e51b815260040161020d90610956565b6008805460ff191660011790556003546040516319b05f4960e01b8152600481018390526001600160a01b03909116906319b05f4990602401600060405180830381600087803b15801561034757600080fd5b505af115801561035b573d6000803e3d6000fd5b5050336000908152600760205260408120805460ff1916600190811790915560098054919450925061038e9084906109a1565b90915550506008805460ff1916905550565b6060600060020180546103b2906109c7565b80601f01602080910402602001604051908101604052809291908181526020018280546103de906109c7565b801561042b5780601f106104005761010080835404028352916020019161042b565b820191906000526020600020905b81548152906001019060200180831161040e57829003601f168201915b5050505050905090565b3360009081526007602052604090205460ff16156104655760405162461bcd60e51b815260040161020d9061091f565b60085460ff16156104885760405162461bcd60e51b815260040161020d90610956565b6008805460ff191660019081179091556006805460009061025b9084906109a1565b6104b6600183836106ea565b505050565b606080600060030160009054906101000a90046001600160a01b03166001600160a01b0316634abd18ab6040518163ffffffff1660e01b815260040160006040518083038186803b15801561050f57600080fd5b505afa158015610523573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261054b9190810190610a6d565b600354604080516307a84e0360e21b815290516001600160a01b0390921691631ea1380c91600480820192600092909190829003018186803b15801561059057600080fd5b505afa1580156105a4573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105cc9190810190610b76565b915091509091565b6104b6600283836106ea565b3360009081526007602052604090205460ff16156106105760405162461bcd60e51b815260040161020d9061091f565b60085460ff16156106335760405162461bcd60e51b815260040161020d90610956565b6008805460ff191660019081179091556004805460009061025b9084906109a1565b60035460405163d1730f1f60e01b8152600481018390526000916001600160a01b03169063d1730f1f9060240160206040518083038186803b15801561069a57600080fd5b505afa1580156106ae573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106d29190610c07565b92915050565b6060600060010180546103b2906109c7565b8280546106f6906109c7565b90600052602060002090601f016020900481019282610718576000855561075e565b82601f106107315782800160ff1982351617855561075e565b8280016001018555821561075e579182015b8281111561075e578235825591602001919060010190610743565b5061076a92915061076e565b5090565b5b8082111561076a576000815560010161076f565b60006020828403121561079557600080fd5b5035919050565b60005b838110156107b757818101518382015260200161079f565b838111156107c6576000848401525b50505050565b600081518084526107e481602086016020860161079c565b601f01601f19169290920160200192915050565b60208152600061080b60208301846107cc565b9392505050565b6000806020838503121561082557600080fd5b823567ffffffffffffffff8082111561083d57600080fd5b818501915085601f83011261085157600080fd5b81358181111561086057600080fd5b86602082850101111561087257600080fd5b60209290920196919550909350505050565b6000604082016040835280855180835260608501915060608160051b8601019250602080880160005b838110156108db57605f198887030185526108c98683516107cc565b955093820193908201906001016108ad565b50508584038187015286518085528782019482019350915060005b82811015610912578451845293810193928101926001016108f6565b5091979650505050505050565b60208082526018908201527f416c726561647920706572666f726d656420616374696f6e0000000000000000604082015260600190565b6020808252602b908201527f4e6f207265656e7472616e6379207768696c6520746865206d6574686f64206960408201526a7320657865637574696e6760a81b606082015260800190565b600082198211156109c257634e487b7160e01b600052601160045260246000fd5b500190565b600181811c908216806109db57607f821691505b602082108114156109fc57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610a4157610a41610a02565b604052919050565b600067ffffffffffffffff821115610a6357610a63610a02565b5060051b60200190565b60006020808385031215610a8057600080fd5b825167ffffffffffffffff80821115610a9857600080fd5b8185019150601f8681840112610aad57600080fd5b8251610ac0610abb82610a49565b610a18565b81815260059190911b84018501908581019089831115610adf57600080fd5b8686015b83811015610b6857805186811115610afb5760008081fd5b8701603f81018c13610b0d5760008081fd5b88810151604088821115610b2357610b23610a02565b610b34828901601f19168c01610a18565b8281528e82848601011115610b495760008081fd5b610b58838d830184870161079c565b8652505050918701918701610ae3565b509998505050505050505050565b60006020808385031215610b8957600080fd5b825167ffffffffffffffff811115610ba057600080fd5b8301601f81018513610bb157600080fd5b8051610bbf610abb82610a49565b81815260059190911b82018301908381019087831115610bde57600080fd5b928401925b82841015610bfc57835182529284019290840190610be3565b979650505050505050565b600060208284031215610c1957600080fd5b505191905056fea264697066735822122080ab99e2a5316bf39f82565170b8693e743a523922817ec927730f015e16a4d264736f6c6343000809003360806040523480156200001157600080fd5b50604051620009bd380380620009bd8339810160408190526200003491620001cf565b60005b81518160ff161015620000d8576001828260ff16815181106200005e576200005e6200031b565b60209081029190910181015182546001810184556000938452928290208151620000929491909101929190910190620000e0565b50600080546001810182558180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563015580620000cf8162000331565b91505062000037565b50506200039d565b828054620000ee9062000360565b90600052602060002090601f0160209004810192826200011257600085556200015d565b82601f106200012d57805160ff19168380011785556200015d565b828001600101855582156200015d579182015b828111156200015d57825182559160200191906001019062000140565b506200016b9291506200016f565b5090565b5b808211156200016b576000815560010162000170565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b0381118282101715620001c757620001c762000186565b604052919050565b60006020808385031215620001e357600080fd5b82516001600160401b0380821115620001fb57600080fd5b8185019150601f86818401126200021157600080fd5b82518281111562000226576200022662000186565b8060051b620002378682016200019c565b918252848101860191868101908a8411156200025257600080fd5b87870192505b838310156200030d57825186811115620002725760008081fd5b8701603f81018c13620002855760008081fd5b88810151878111156200029c576200029c62000186565b620002af818801601f19168b016200019c565b81815260408e81848601011115620002c75760008081fd5b60005b83811015620002e7578481018201518382018e01528c01620002ca565b83811115620002f95760008d85850101525b505084525050918701919087019062000258565b9a9950505050505050505050565b634e487b7160e01b600052603260045260246000fd5b600060ff821660ff8114156200035757634e487b7160e01b600052601160045260246000fd5b60010192915050565b600181811c908216806200037557607f821691505b602082108114156200039757634e487b7160e01b600052602260045260246000fd5b50919050565b61061080620003ad6000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806319b05f491461005c5780631ea1380c146100715780634abd18ab1461008f578063538faa8c146100a4578063d1730f1f146100b7575b600080fd5b61006f61006a3660046103a8565b6100d8565b005b61007961013b565b60405161008691906103c1565b60405180910390f35b610097610193565b6040516100869190610405565b61006f6100b23660046104a0565b61026c565b6100ca6100c53660046103a8565b6102c2565b604051908152602001610086565b600154819081106101045760405162461bcd60e51b81526004016100fb9061051c565b60405180910390fd5b60016000838154811061011957610119610569565b906000526020600020016000828254610132919061057f565b90915550505050565b6060600080548060200260200160405190810160405280929190818152602001828054801561018957602002820191906000526020600020905b815481526020019060010190808311610175575b5050505050905090565b60606001805480602002602001604051908101604052809291908181526020016000905b828210156102635783829060005260206000200180546101d6906105a5565b80601f0160208091040260200160405190810160405280929190818152602001828054610202906105a5565b801561024f5780601f106102245761010080835404028352916020019161024f565b820191906000526020600020905b81548152906001019060200180831161023257829003601f168201915b5050505050815260200190600101906101b7565b50505050905090565b6001548390811061028f5760405162461bcd60e51b81526004016100fb9061051c565b8282600186815481106102a4576102a4610569565b9060005260206000200191906102bb92919061030f565b5050505050565b600154600090829081106102e85760405162461bcd60e51b81526004016100fb9061051c565b600083815481106102fb576102fb610569565b906000526020600020015491505b50919050565b82805461031b906105a5565b90600052602060002090601f01602090048101928261033d5760008555610383565b82601f106103565782800160ff19823516178555610383565b82800160010185558215610383579182015b82811115610383578235825591602001919060010190610368565b5061038f929150610393565b5090565b5b8082111561038f5760008155600101610394565b6000602082840312156103ba57600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156103f9578351835292840192918401916001016103dd565b50909695505050505050565b6000602080830181845280855180835260408601915060408160051b87010192508387016000805b8381101561049257888603603f1901855282518051808852835b81811015610462578281018a01518982018b01528901610447565b8181111561047257848a838b0101525b50601f01601f19169690960187019550938601939186019160010161042d565b509398975050505050505050565b6000806000604084860312156104b557600080fd5b83359250602084013567ffffffffffffffff808211156104d457600080fd5b818601915086601f8301126104e857600080fd5b8135818111156104f757600080fd5b87602082850101111561050957600080fd5b6020830194508093505050509250925092565b6020808252602d908201527f566f74696e6720656c656d656e74206f757473696465206f662074686520717560408201526c195cdd1a5bdb9cc8189bdd5b99609a1b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b600082198211156105a057634e487b7160e01b600052601160045260246000fd5b500190565b600181811c908216806105b957607f821691505b6020821081141561030957634e487b7160e01b600052602260045260246000fdfea2646970667358221220ec63e45d78ec66b732bc9bd20b3652d4ccfdc2e4160def64555fe0bd2ae5953364736f6c63430008090033a2646970667358221220fa8d303f74f551df7008fa66c336882b00b4ca892f414afc918210b63dcaeff264736f6c63430008090033";

type MainPlatformConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MainPlatformConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MainPlatform__factory extends ContractFactory {
  constructor(...args: MainPlatformConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MainPlatform> {
    return super.deploy(_owner, overrides || {}) as Promise<MainPlatform>;
  }
  override getDeployTransaction(
    _owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_owner, overrides || {});
  }
  override attach(address: string): MainPlatform {
    return super.attach(address) as MainPlatform;
  }
  override connect(signer: Signer): MainPlatform__factory {
    return super.connect(signer) as MainPlatform__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MainPlatformInterface {
    return new utils.Interface(_abi) as MainPlatformInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MainPlatform {
    return new Contract(address, _abi, signerOrProvider) as MainPlatform;
  }
}
