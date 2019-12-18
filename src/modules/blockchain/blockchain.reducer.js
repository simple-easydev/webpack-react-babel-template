import { createReducer } from "redux-act";
import * as actions from "./blockchain.action";

const initialState = {
    blocks: []
};

const reducer = {
    [actions.setEthState]: (state, ethstatus) => {
        if (state.blocks.length > 0){
            // eslint-disable-next-line eqeqeq
            if (ethstatus.block.number == state.blocks[0].number) return state;
        }
        console.log("state ==============> ", state);
        state.blocks.unshift(ethstatus.block);
        const blocks = state.blocks.slice(0);
        return {
            ...state,
            blocks
        };
    },
    [actions.setPrevBlock]:(state, block) => {

        console.log("state ==============> ", state);
        
        state.blocks.push(block);
        const blocks = state.blocks.slice(0);
        
        return {
            ...state,
            blocks
        };
    }
};

export default createReducer(reducer, initialState);