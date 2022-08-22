import api from "@/api/index";

export default {
  state: {
    goodsId: "",
    fileList: [],
  },
  mutations: {
    changeGoodsId(state, id) {
      state.goodsId = id;
      console.log(state.goodsId);
      console.log(state.fileList);
    },
    changeFileList(state, list) {
      state.fileList = list;
      console.log(state.fileList);
    },
  },
  actions: {
    asyncGetGoodsPicsList(context) {
      let result = [];
      // vuex中无法直接使用$api对象，此处手动引入api
      // this.$api. 
      api.showGoodsPicsList({
          goodsId: context.state.goodsId,
        })
        .then((res) => {
          // console.log(res);
          // 从后台数据库获取已上传的图片列表
          if (res.data.code === 1) {
            res.data.list.forEach((element) => {
              result.push({ ...element, name: element.originalname });
            });
            context.commit("changeFileList", result);
          } else {
            console.log("error");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
