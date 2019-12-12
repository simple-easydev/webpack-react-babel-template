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

        state.blocks.unshift(ethstatus.block);
        return {
            ...state
        };
    },
    [actions.setPrevBlock]:(state, block) => {
        state.blocks.push(block);
        return {
            ...state
        };
    }
};

export default createReducer(reducer, initialState);