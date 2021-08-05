import { Request, Response } from "express";
import { log, constants } from "../../../config";
import { v4 as uuidv4 } from 'uuid';
import { Transaction as Tx } from '@ethereumjs/tx'
import SwapProvider, {ISwapProvider} from '../models/SwapProvider';

import web3Js from 'web3';
import { ethers } from 'ethers';

import swapFactoryAbi from "../../../abis/swapFactory.json";
import constantConfig from "../../../../../src/config/constantConfig";
import CONSTANT from "../../../../../src/constants.js";
import { AbiItem } from 'web3-utils';

const INFURA_WEB_ENDPOINT="https://kovan.infura.io/v3/b06e3282ffb44f07a3ba3efb7faa8d29";
const BSC_WEB_ENDPOINT="https://data-seed-prebsc-1-s1.binance.org:8545/";
let nonce = 0;

const getRawTransactionApp = function(_address, _nonce, _gasPrice, _gasLimit, _to, _value, _data, chain_id, web3) {
    console.log("claming on: " + chain_id)
    return {
        nonce: web3.utils.toHex(_nonce),
        gasPrice: _gasPrice === null ? '0x098bca5a00' : web3.utils.toHex(_gasPrice),
        gasLimit: _gasLimit === null ? '0x96ed' : web3.utils.toHex(_gasLimit),
        to: _to,
        value: _value === null ? '0x00' : web3.utils.toHex(_value),
        data: _data === null ? '' : _data,
        chainId: chain_id
    }
}

const swapProviderController = {
    becomeSwapProvider: async (req: Request, res: Response) => {

        try {
            const { 
                spAccount, networkId, tokenA, tokenB, amountA,
                walletAddressToSend, walletAddressToReceive, 
                gasAndFeeAmount, spProfitPercent, accumulateFundsLimit, 
                stopRepeatsMode, stopRepeatsOnDate, stopRepeatsAfterCalls,
                withdrawMode, withdrawOnDate, withdrawAfterCalls,
                cexApiKey, cexApiSecret, txid, smartContractAddress         
            } = req.body;
            
            // SP exist?
            const isSwapProviderExists: ISwapProvider = await SwapProvider.findOne({
                'walletAddresses.spAccount' : spAccount,
                'networkId': networkId,
                'tokenA.address': tokenA,
                'tokenB.address': tokenB
            }).exec();
            //if (isSwapProviderExists) return res.status(401).json({ message: "Swap provider already exists" }); 

            // save into db
            let spArgs = {
                walletAddresses: {
                    toSend: walletAddressToSend,
                    toReceive: walletAddressToReceive,
                    spAccount
                },
                tokenA: {
                    address: tokenA,
                    recievedAmount: amountA
                },
                tokenB: {
                    address: tokenB
                },
                networkId,
                gasAndFeeAmount,
                spProfitPercent,
                accumulateFundsLimit,
                stopRepeats: {
                    mode: stopRepeatsMode,
                    onDate: stopRepeatsOnDate,
                    afterCalls: stopRepeatsAfterCalls
                },
                withdraw: {
                    mode: withdrawMode,
                    onDate: withdrawOnDate,
                    afterCalls: withdrawAfterCalls
                },
                cexData: {
                    key: cexApiKey,
                    secret: cexApiSecret
                },
                txid: uuidv4(),
                smartContractAddress: uuidv4()
            };
            //const swapProvider = await new SwapProvider(spArgs).save();
            const swapProvider = {
                tokenA: {
                  consumedAmount: 0,
                  address: '0x0000000000000000000000000000000000000002',
                  recievedAmount: 10
                },
                tokenB: { recievedAmount: 0, address: '0x0000000000000000000000000000000000000001' },
                smartContractAddress: '9b909d25-079c-49ce-b937-534b77f8a9c9',
                txid: '5bf54f13-7e38-4127-a65c-62754aec5815',
                active: true,
                _id: '6109081b8a73615144abf49f',
                walletAddresses: {
                  toSend: '0x22a6a4Dd1eB834f62c43F8A4f58B7F6c1ED5A2F8',
                  toReceive: '0x22a6a4Dd1eB834f62c43F8A4f58B7F6c1ED5A2F8',
                  spAccount: '0x22a6a4Dd1eB834f62c43F8A4f58B7F6c1ED5A2F8'
                },
                networkId: 42,
                gasAndFeeAmount: 3.3,
                spProfitPercent: 0.3,
                accumulateFundsLimit: 0.3,
                stopRepeats: { mode: 3 },
                withdraw: { mode: 3 },
                cexData: { key: '00000000ab', secret: '00000000yz' },
                createdAt: '2021-08-03T09:10:51.181Z',
                updatedAt:'2021-08-03T09:10:51.181Z',
                __v: 0
            }

            console.log({
                "Saved SP:": swapProvider
            });

            if(swapProvider.hasOwnProperty('_id')){
                return res.status(201).json(swapProvider);
                // call add swap provider 
                // add as provider onto blockchain 
                // let contractAddress = constantConfig[networkId].swapFactoryContract;                
                
                // contractAddress = "0xcb8fAb404a5b55942690457ccD0b31F1D09B5419";

                // let provider = 42 == 42 ? INFURA_WEB_ENDPOINT : BSC_WEB_ENDPOINT
                // const web3 = new web3Js(new web3Js.providers.HttpProvider(provider));
                // const contractInstance = new web3.eth.Contract(swapFactoryAbi as AbiItem[], contractAddress);
                //console.log(contractInstance);
                // await swapProviderController.addSwapProvider(contractInstance, spArgs, web3).then(response => {
                //     swapProvider['addSwapProviderResponse'] = response;
                //     return res.status(201).json(swapProvider);
                // });
            }

        } catch (err) {
            err['errorOrigin'] = "becomeSwapProvider";
            return res.status(500).json({ message: err });
        }
    },

    addSwapProvider: async(event, networkId) => {
        //console.log(event);
        let usp = await SwapProvider.updateOne({
            txid: event.transactionHash,
            networkId: networkId
        }, {
            smartContractAddress: event.returnValues.spContract 
        });
        //console.log(usp);
    },

    updateTransactionHash: async(req: Request, res: Response) => {
        try {
            const { 
                txid,
                docId    
            } = req.body;

            let usp = await SwapProvider.updateOne({
                _id: docId
            }, {
                txid: txid
            });

            if(usp.ok == 1){
                return res.status(200).json({
                    "Message": "Record updated"
                });
            }

        }  catch (err) {
            err['errorOrigin'] = "updateTransactionHash";
            return res.status(500).json({ message: err });
        }
    },

    getContractAddress: async(req: Request, res: Response) => {
        try {
            const {
                docId    
            } = req.query;

            let sp = await SwapProvider.findOne({
                _id: docId
            }).exec();

            if(sp){
                return res.status(200).json({
                    smartContractAddress: sp.smartContractAddress
                });
            }

        }  catch (err) {
            err['errorOrigin'] = "getContractAddress";
            return res.status(500).json({ message: err });
        }        
    }
    
}

export default swapProviderController;