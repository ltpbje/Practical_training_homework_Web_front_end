// components/item/item.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    userName:{
      type:String,
      value:'张三'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  observers:{
    userName(newValue){
      console.log(newValue);
    },
    "age,name,sex":function(newAge,newName,newSex){
      console.log(newAge,newName,newSex);
    },
    "**" :function(){

    }
  }
})