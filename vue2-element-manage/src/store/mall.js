export default {
  state: {
    goodsId: ''
  },
  mutations: {
    changeGoodsId(state, id) {
      state.goodsId = id
    },
    getGoodsPicsList() {
      this.$api
        .showGoodsPicsList({
          goodsId: this.goodsId,
        })
        .then((res) => {
          console.log(res);
          // 从后台数据库获取已上传的图片列表
          if (res.data.code === 1) {
            res.data.list.forEach((element) => {
              this.fileList.push({ ...element, name: element.originalname });
            });
          } else {
            console.log("0");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  }
}