import {
    Bool,
    Field,
    Poseidon,
    Provable,
    PublicKey,
    UInt64,
    verify,
    ZkProgram,
} from 'o1js';
import fs from "fs";
import { ProverX, ProverProofX } from './zkprogram';

export async function readProofFromFileAndVerify() {
    try {
        const { verificationKey: ProverX_VK } = await ProverX.compile({ forceRecompile: true });
        console.log('ProverX_VK: ' + ProverX_VK.hash);

        // read from file
        const str2 = fs.readFileSync('./proof.json', 'utf8');
        console.log('str2: ' + str2);
        const proof2 = ProverProofX.fromJSON(JSON.parse(str2));
        const ok2 = await verify(proof2, ProverX_VK);
        console.log('ok2: ' + ok2);
    } catch (error) {
        console.error(error);
    }
}

// step2
await readProofFromFileAndVerify();
