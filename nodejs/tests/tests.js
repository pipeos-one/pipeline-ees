import {assert} from 'chai';
import fs from 'fs';
import pipe from '../pipe';
import graphs from './graphs';

async function runTests() {
    console.log('runTests');

    let context = await fs.promises.readFile('./context.json', 'utf8');
    
    try {
        context = JSON.parse(context);
    } catch(e) {
        throw new Error(e);
    }

    for (let graph of graphs) {
        for (let io of graph.io) {
            const result = await pipe(context, graph.graph, io.input);
            assert.sameDeepOrderedMembers(result, [io.output]);
        }
    }
}

export default runTests;