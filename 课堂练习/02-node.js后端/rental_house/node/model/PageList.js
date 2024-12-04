class PageList {
    constructor(pageIndex, totalCount, listData, pageSize) {
        this.pageIndex = pageIndex;
        this.totalCount = totalCount;
        this.pageCount = Math.ceil(totalCount / pageSize);
        this.listData = listData;
        this.pageStart = this.pageIndex - 3 > 0 ? this.pageIndex - 3 : 1;
        this.pageEnd = this.pageStart + 6 > this.pageCount ? this.pageCount : this.pageStart + 6;
    }
}

module.exports = PageList;