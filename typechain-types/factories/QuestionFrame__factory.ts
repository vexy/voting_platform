/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { QuestionFrame, QuestionFrameInterface } from "../QuestionFrame";

const _abi = [
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
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "element",
        type: "uint256",
      },
    ],
    name: "accept",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "newDescription",
        type: "string",
      },
    ],
    name: "editDescription",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "newTitle",
        type: "string",
      },
    ],
    name: "editTitle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getDescription",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOwner",
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
    name: "getTitle",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "malformed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "malformedCount",
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
    name: "none",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "noneCount",
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
    name: "report",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reportCount",
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
        name: "element",
        type: "uint256",
      },
    ],
    name: "score",
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
    name: "scoreTable",
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
    name: "totalVoters",
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
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002e7938038062002e79833981810160405281019062000037919062000497565b336000800160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600060010190805190602001906200009592919062000140565b5080604051620000a590620001d1565b620000b1919062000649565b604051809103906000f080158015620000ce573d6000803e3d6000fd5b50600060030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060008060040181905550600080600501819055506000806006018190555060006009819055505050620006d2565b8280546200014e906200069c565b90600052602060002090601f016020900481019282620001725760008555620001be565b82601f106200018d57805160ff1916838001178555620001be565b82800160010185558215620001be579182015b82811115620001bd578251825591602001919060010190620001a0565b5b509050620001cd9190620001df565b5090565b610f7e8062001efb83390190565b5b80821115620001fa576000816000905550600101620001e0565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b62000267826200021c565b810181811067ffffffffffffffff821117156200028957620002886200022d565b5b80604052505050565b60006200029e620001fe565b9050620002ac82826200025c565b919050565b600067ffffffffffffffff821115620002cf57620002ce6200022d565b5b620002da826200021c565b9050602081019050919050565b60005b8381101562000307578082015181840152602081019050620002ea565b8381111562000317576000848401525b50505050565b6000620003346200032e84620002b1565b62000292565b90508281526020810184848401111562000353576200035262000217565b5b62000360848285620002e7565b509392505050565b600082601f83011262000380576200037f62000212565b5b8151620003928482602086016200031d565b91505092915050565b600067ffffffffffffffff821115620003b957620003b86200022d565b5b602082029050602081019050919050565b600080fd5b6000620003e6620003e0846200039b565b62000292565b905080838252602082019050602084028301858111156200040c576200040b620003ca565b5b835b818110156200045a57805167ffffffffffffffff81111562000435576200043462000212565b5b80860162000444898262000368565b855260208501945050506020810190506200040e565b5050509392505050565b600082601f8301126200047c576200047b62000212565b5b81516200048e848260208601620003cf565b91505092915050565b60008060408385031215620004b157620004b062000208565b5b600083015167ffffffffffffffff811115620004d257620004d16200020d565b5b620004e08582860162000368565b925050602083015167ffffffffffffffff8111156200050457620005036200020d565b5b620005128582860162000464565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600081519050919050565b600082825260208201905092915050565b6000620005718262000548565b6200057d818562000553565b93506200058f818560208601620002e7565b6200059a816200021c565b840191505092915050565b6000620005b3838362000564565b905092915050565b6000602082019050919050565b6000620005d5826200051c565b620005e1818562000527565b935083602082028501620005f58562000538565b8060005b85811015620006375784840389528151620006158582620005a5565b94506200062283620005bb565b925060208a01995050600181019050620005f9565b50829750879550505050505092915050565b60006020820190508181036000830152620006658184620005c8565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620006b557607f821691505b60208210811415620006cc57620006cb6200066d565b5b50919050565b61181980620006e26000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c8063893d20e811610097578063b0f41e1311610066578063b0f41e1314610203578063d1730f1f14610221578063e0619c8314610251578063ff3c1a8f1461026f576100f5565b8063893d20e8146101a0578063931d416e146101be578063a6fedc70146101dd578063a877db9f146101f9576100f5565b80631a092541116100d35780631a0925411461013e5780632606a10b1461015c5780635f5300ff146101665780636eb8368914610184576100f5565b80630a39e7bc146100fa578063185c6f841461010457806319b05f4914610122575b600080fd5b61010261028d565b005b61010c610431565b6040516101199190610e14565b60405180910390f35b61013c60048036038101906101379190610e6f565b61043d565b005b610146610655565b6040516101539190610f35565b60405180910390f35b6101646106ea565b005b61016e61088e565b60405161017b9190610e14565b60405180910390f35b61019e60048036038101906101999190610fbc565b610898565b005b6101a86108b1565b6040516101b5919061104a565b60405180910390f35b6101c66108dd565b6040516101d492919061122f565b60405180910390f35b6101f760048036038101906101f29190610fbc565b610a38565b005b610201610a51565b005b61020b610bf5565b6040516102189190610e14565b60405180910390f35b61023b60048036038101906102369190610e6f565b610c01565b6040516102489190610e14565b60405180910390f35b610259610cb7565b6040516102669190610e14565b60405180910390f35b610277610cc3565b6040516102849190610f35565b60405180910390f35b600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161561031a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610311906112b2565b60405180910390fd5b600860009054906101000a900460ff161561036a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161036190611344565b60405180910390fd5b6001600860006101000a81548160ff02191690831515021790555060016000600501600082825461039b9190611393565b925050819055506001600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555060016009600082825461040d9190611393565b925050819055506000600860006101000a81548160ff021916908315150217905550565b60008060060154905090565b600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16156104ca576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104c1906112b2565b60405180910390fd5b600860009054906101000a900460ff161561051a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161051190611344565b60405180910390fd5b6001600860006101000a81548160ff021916908315150217905550600060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166319b05f49826040518263ffffffff1660e01b81526004016105939190610e14565b600060405180830381600087803b1580156105ad57600080fd5b505af11580156105c1573d6000803e3d6000fd5b505050506001600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506001600960008282546106309190611393565b925050819055506000600860006101000a81548160ff02191690831515021790555050565b60606000600201805461066790611418565b80601f016020809104026020016040519081016040528092919081815260200182805461069390611418565b80156106e05780601f106106b5576101008083540402835291602001916106e0565b820191906000526020600020905b8154815290600101906020018083116106c357829003601f168201915b5050505050905090565b600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615610777576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161076e906112b2565b60405180910390fd5b600860009054906101000a900460ff16156107c7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107be90611344565b60405180910390fd5b6001600860006101000a81548160ff0219169083151502179055506001600060060160008282546107f89190611393565b925050819055506001600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555060016009600082825461086a9190611393565b925050819055506000600860006101000a81548160ff021916908315150217905550565b6000600954905090565b8181600060010191906108ac929190610d58565b505050565b60008060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b606080600060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634abd18ab6040518163ffffffff1660e01b815260040160006040518083038186803b15801561094b57600080fd5b505afa15801561095f573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190610988919061164c565b600060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16631ea1380c6040518163ffffffff1660e01b815260040160006040518083038186803b1580156109f357600080fd5b505afa158015610a07573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190610a30919061176d565b915091509091565b818160006002019190610a4c929190610d58565b505050565b600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615610ade576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ad5906112b2565b60405180910390fd5b600860009054906101000a900460ff1615610b2e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b2590611344565b60405180910390fd5b6001600860006101000a81548160ff021916908315150217905550600160006004016000828254610b5f9190611393565b925050819055506001600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550600160096000828254610bd19190611393565b925050819055506000600860006101000a81548160ff021916908315150217905550565b60008060050154905090565b60008060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d1730f1f836040518263ffffffff1660e01b8152600401610c609190610e14565b60206040518083038186803b158015610c7857600080fd5b505afa158015610c8c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cb091906117b6565b9050919050565b60008060040154905090565b606060006001018054610cd590611418565b80601f0160208091040260200160405190810160405280929190818152602001828054610d0190611418565b8015610d4e5780601f10610d2357610100808354040283529160200191610d4e565b820191906000526020600020905b815481529060010190602001808311610d3157829003601f168201915b5050505050905090565b828054610d6490611418565b90600052602060002090601f016020900481019282610d865760008555610dcd565b82601f10610d9f57803560ff1916838001178555610dcd565b82800160010185558215610dcd579182015b82811115610dcc578235825591602001919060010190610db1565b5b509050610dda9190610dde565b5090565b5b80821115610df7576000816000905550600101610ddf565b5090565b6000819050919050565b610e0e81610dfb565b82525050565b6000602082019050610e296000830184610e05565b92915050565b6000604051905090565b600080fd5b600080fd5b610e4c81610dfb565b8114610e5757600080fd5b50565b600081359050610e6981610e43565b92915050565b600060208284031215610e8557610e84610e39565b5b6000610e9384828501610e5a565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610ed6578082015181840152602081019050610ebb565b83811115610ee5576000848401525b50505050565b6000601f19601f8301169050919050565b6000610f0782610e9c565b610f118185610ea7565b9350610f21818560208601610eb8565b610f2a81610eeb565b840191505092915050565b60006020820190508181036000830152610f4f8184610efc565b905092915050565b600080fd5b600080fd5b600080fd5b60008083601f840112610f7c57610f7b610f57565b5b8235905067ffffffffffffffff811115610f9957610f98610f5c565b5b602083019150836001820283011115610fb557610fb4610f61565b5b9250929050565b60008060208385031215610fd357610fd2610e39565b5b600083013567ffffffffffffffff811115610ff157610ff0610e3e565b5b610ffd85828601610f66565b92509250509250929050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061103482611009565b9050919050565b61104481611029565b82525050565b600060208201905061105f600083018461103b565b92915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600082825260208201905092915050565b60006110ad82610e9c565b6110b78185611091565b93506110c7818560208601610eb8565b6110d081610eeb565b840191505092915050565b60006110e783836110a2565b905092915050565b6000602082019050919050565b600061110782611065565b6111118185611070565b93508360208202850161112385611081565b8060005b8581101561115f578484038952815161114085826110db565b945061114b836110ef565b925060208a01995050600181019050611127565b50829750879550505050505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6111a681610dfb565b82525050565b60006111b8838361119d565b60208301905092915050565b6000602082019050919050565b60006111dc82611171565b6111e6818561117c565b93506111f18361118d565b8060005b8381101561122257815161120988826111ac565b9750611214836111c4565b9250506001810190506111f5565b5085935050505092915050565b6000604082019050818103600083015261124981856110fc565b9050818103602083015261125d81846111d1565b90509392505050565b7f416c726561647920706572666f726d656420616374696f6e0000000000000000600082015250565b600061129c601883610ea7565b91506112a782611266565b602082019050919050565b600060208201905081810360008301526112cb8161128f565b9050919050565b7f4e6f207265656e7472616e6379207768696c6520746865206d6574686f64206960008201527f7320657865637574696e67000000000000000000000000000000000000000000602082015250565b600061132e602b83610ea7565b9150611339826112d2565b604082019050919050565b6000602082019050818103600083015261135d81611321565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061139e82610dfb565b91506113a983610dfb565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156113de576113dd611364565b5b828201905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061143057607f821691505b60208210811415611444576114436113e9565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61148282610eeb565b810181811067ffffffffffffffff821117156114a1576114a061144a565b5b80604052505050565b60006114b4610e2f565b90506114c08282611479565b919050565b600067ffffffffffffffff8211156114e0576114df61144a565b5b602082029050602081019050919050565b600080fd5b600067ffffffffffffffff8211156115115761151061144a565b5b61151a82610eeb565b9050602081019050919050565b600061153a611535846114f6565b6114aa565b905082815260208101848484011115611556576115556114f1565b5b611561848285610eb8565b509392505050565b600082601f83011261157e5761157d610f57565b5b815161158e848260208601611527565b91505092915050565b60006115aa6115a5846114c5565b6114aa565b905080838252602082019050602084028301858111156115cd576115cc610f61565b5b835b8181101561161457805167ffffffffffffffff8111156115f2576115f1610f57565b5b8086016115ff8982611569565b855260208501945050506020810190506115cf565b5050509392505050565b600082601f83011261163357611632610f57565b5b8151611643848260208601611597565b91505092915050565b60006020828403121561166257611661610e39565b5b600082015167ffffffffffffffff8111156116805761167f610e3e565b5b61168c8482850161161e565b91505092915050565b600067ffffffffffffffff8211156116b0576116af61144a565b5b602082029050602081019050919050565b6000815190506116d081610e43565b92915050565b60006116e96116e484611695565b6114aa565b9050808382526020820190506020840283018581111561170c5761170b610f61565b5b835b81811015611735578061172188826116c1565b84526020840193505060208101905061170e565b5050509392505050565b600082601f83011261175457611753610f57565b5b81516117648482602086016116d6565b91505092915050565b60006020828403121561178357611782610e39565b5b600082015167ffffffffffffffff8111156117a1576117a0610e3e565b5b6117ad8482850161173f565b91505092915050565b6000602082840312156117cc576117cb610e39565b5b60006117da848285016116c1565b9150509291505056fea2646970667358221220e98ef54c72064a314faf49b4b79df0de94da30829b5583d6f4d821537295804964736f6c6343000809003360806040523480156200001157600080fd5b5060405162000f7e38038062000f7e833981810160405281019062000037919062000434565b60005b81518160ff161015620000e3576001828260ff168151811062000062576200006162000485565b5b6020026020010151908060018154018082558091505060019003906000526020600020016000909190919091509080519060200190620000a4929190620000eb565b50600080806001815401808255809150506001900390600052602060002001600090919091909150558080620000da90620004f0565b9150506200003a565b505062000584565b828054620000f9906200054e565b90600052602060002090601f0160209004810192826200011d576000855562000169565b82601f106200013857805160ff191683800117855562000169565b8280016001018555821562000169579182015b82811115620001685782518255916020019190600101906200014b565b5b5090506200017891906200017c565b5090565b5b80821115620001975760008160009055506001016200017d565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620001ff82620001b4565b810181811067ffffffffffffffff82111715620002215762000220620001c5565b5b80604052505050565b6000620002366200019b565b9050620002448282620001f4565b919050565b600067ffffffffffffffff821115620002675762000266620001c5565b5b602082029050602081019050919050565b600080fd5b600080fd5b600067ffffffffffffffff821115620002a0576200029f620001c5565b5b620002ab82620001b4565b9050602081019050919050565b60005b83811015620002d8578082015181840152602081019050620002bb565b83811115620002e8576000848401525b50505050565b600062000305620002ff8462000282565b6200022a565b9050828152602081018484840111156200032457620003236200027d565b5b62000331848285620002b8565b509392505050565b600082601f830112620003515762000350620001af565b5b815162000363848260208601620002ee565b91505092915050565b6000620003836200037d8462000249565b6200022a565b90508083825260208201905060208402830185811115620003a957620003a862000278565b5b835b81811015620003f757805167ffffffffffffffff811115620003d257620003d1620001af565b5b808601620003e1898262000339565b85526020850194505050602081019050620003ab565b5050509392505050565b600082601f830112620004195762000418620001af565b5b81516200042b8482602086016200036c565b91505092915050565b6000602082840312156200044d576200044c620001a5565b5b600082015167ffffffffffffffff8111156200046e576200046d620001aa565b5b6200047c8482850162000401565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600060ff82169050919050565b6000620004fd82620004e3565b915060ff821415620005145762000513620004b4565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200056757607f821691505b602082108114156200057e576200057d6200051f565b5b50919050565b6109ea80620005946000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806319b05f491461005c5780631ea1380c146100785780634abd18ab14610096578063538faa8c146100b4578063d1730f1f146100d0575b600080fd5b61007660048036038101906100719190610483565b610100565b005b610080610182565b60405161008d919061056e565b60405180910390f35b61009e6101da565b6040516100ab91906106eb565b60405180910390f35b6100ce60048036038101906100c99190610772565b6102b3565b005b6100ea60048036038101906100e59190610483565b61032f565b6040516100f791906107e1565b60405180910390f35b806001805490508110610148576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161013f9061087f565b60405180910390fd5b60016000838154811061015e5761015d61089f565b5b90600052602060002001600082825461017791906108fd565b925050819055505050565b606060008054806020026020016040519081016040528092919081815260200182805480156101d057602002820191906000526020600020905b8154815260200190600101908083116101bc575b5050505050905090565b60606001805480602002602001604051908101604052809291908181526020016000905b828210156102aa57838290600052602060002001805461021d90610982565b80601f016020809104026020016040519081016040528092919081815260200182805461024990610982565b80156102965780601f1061026b57610100808354040283529160200191610296565b820191906000526020600020905b81548152906001019060200180831161027957829003601f168201915b5050505050815260200190600101906101fe565b50505050905090565b8260018054905081106102fb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102f29061087f565b60405180910390fd5b8282600186815481106103115761031061089f565b5b9060005260206000200191906103289291906103a0565b5050505050565b6000816001805490508110610379576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103709061087f565b60405180910390fd5b6000838154811061038d5761038c61089f565b5b9060005260206000200154915050919050565b8280546103ac90610982565b90600052602060002090601f0160209004810192826103ce5760008555610415565b82601f106103e757803560ff1916838001178555610415565b82800160010185558215610415579182015b828111156104145782358255916020019190600101906103f9565b5b5090506104229190610426565b5090565b5b8082111561043f576000816000905550600101610427565b5090565b600080fd5b600080fd5b6000819050919050565b6104608161044d565b811461046b57600080fd5b50565b60008135905061047d81610457565b92915050565b60006020828403121561049957610498610443565b5b60006104a78482850161046e565b91505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6104e58161044d565b82525050565b60006104f783836104dc565b60208301905092915050565b6000602082019050919050565b600061051b826104b0565b61052581856104bb565b9350610530836104cc565b8060005b8381101561056157815161054888826104eb565b975061055383610503565b925050600181019050610534565b5085935050505092915050565b600060208201905081810360008301526105888184610510565b905092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600081519050919050565b600082825260208201905092915050565b60005b838110156105f65780820151818401526020810190506105db565b83811115610605576000848401525b50505050565b6000601f19601f8301169050919050565b6000610627826105bc565b61063181856105c7565b93506106418185602086016105d8565b61064a8161060b565b840191505092915050565b6000610661838361061c565b905092915050565b6000602082019050919050565b600061068182610590565b61068b818561059b565b93508360208202850161069d856105ac565b8060005b858110156106d957848403895281516106ba8582610655565b94506106c583610669565b925060208a019950506001810190506106a1565b50829750879550505050505092915050565b600060208201905081810360008301526107058184610676565b905092915050565b600080fd5b600080fd5b600080fd5b60008083601f8401126107325761073161070d565b5b8235905067ffffffffffffffff81111561074f5761074e610712565b5b60208301915083600182028301111561076b5761076a610717565b5b9250929050565b60008060006040848603121561078b5761078a610443565b5b60006107998682870161046e565b935050602084013567ffffffffffffffff8111156107ba576107b9610448565b5b6107c68682870161071c565b92509250509250925092565b6107db8161044d565b82525050565b60006020820190506107f660008301846107d2565b92915050565b600082825260208201905092915050565b7f566f74696e6720656c656d656e74206f757473696465206f662074686520717560008201527f657374696f6e7320626f756e6400000000000000000000000000000000000000602082015250565b6000610869602d836107fc565b91506108748261080d565b604082019050919050565b600060208201905081810360008301526108988161085c565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006109088261044d565b91506109138361044d565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610948576109476108ce565b5b828201905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061099a57607f821691505b602082108114156109ae576109ad610953565b5b5091905056fea26469706673582212207dc37ce27a16f4ef0d344d64551aaa88ba4b259d5d0146bd264c79b9d6ed92de64736f6c63430008090033";

type QuestionFrameConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: QuestionFrameConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class QuestionFrame__factory extends ContractFactory {
  constructor(...args: QuestionFrameConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    title: PromiseOrValue<string>,
    labels: PromiseOrValue<string>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<QuestionFrame> {
    return super.deploy(
      title,
      labels,
      overrides || {}
    ) as Promise<QuestionFrame>;
  }
  override getDeployTransaction(
    title: PromiseOrValue<string>,
    labels: PromiseOrValue<string>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(title, labels, overrides || {});
  }
  override attach(address: string): QuestionFrame {
    return super.attach(address) as QuestionFrame;
  }
  override connect(signer: Signer): QuestionFrame__factory {
    return super.connect(signer) as QuestionFrame__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): QuestionFrameInterface {
    return new utils.Interface(_abi) as QuestionFrameInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): QuestionFrame {
    return new Contract(address, _abi, signerOrProvider) as QuestionFrame;
  }
}