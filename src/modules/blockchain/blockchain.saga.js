import * as actions from "./blockchain.action";

function* fetchERC721Tokens(){

}

export function* watchFetchUser() {
    // yield fork(loginWatcherSaga);
    yield takeEvery(actions.setERC721Tokens, fetchERC721Tokens);
}
