/**
 * Created by hao.cheng on 2017/4/28.
 */
// 获取url的参数
export const queryString = () => {
    let _queryString = {};
    const _query = window.location.search.substr(1);
    const _vars = _query.split('&');
    _vars.forEach((v, i) => {
        const _pair = v.split('=');
        if (!_queryString.hasOwnProperty(_pair[0])) {
            _queryString[_pair[0]] = decodeURIComponent(_pair[1]);
        } else if (typeof _queryString[_pair[0]] === 'string') {
            const _arr = [ _queryString[_pair[0]], decodeURIComponent(_pair[1])];
            _queryString[_pair[0]] = _arr;
        } else {
            _queryString[_pair[0]].push(decodeURIComponent(_pair[1]));
        }
    });
    return _queryString;
};

export const parsePairs = (pairsName) => {
    if (pairsName.indexOf("USDT") > -1) {
        pairsName = pairsName.replace("USDT", "/USDT")
    } else if (pairsName.indexOf("BTC") > -1) {
        pairsName = pairsName.replace("BTC", "/BTC")
    } else if (pairsName.indexOf("ETH") > -1) {
        pairsName = pairsName.replace("ETH", "/ETH")
    }
    return pairsName
}