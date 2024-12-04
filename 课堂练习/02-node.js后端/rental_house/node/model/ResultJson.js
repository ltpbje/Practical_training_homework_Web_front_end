class ResultJson {
    constructor(flag, msg, data = []) {
        this.status = flag ? 'success' : 'fail';
        this.msg = msg;
        this.data = data;
    }
}

module.exports = ResultJson;