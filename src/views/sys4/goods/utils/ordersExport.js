import {
  find as _find,
  chunk as _chunk,
  flatten as _flatten,
  cloneDeep as _cloneDeep,
} from "lodash";
import { indexOrderTable, orderTable, emptyLeftTable } from "./excelFormat";

export const _orderTabel = (dataObj, index = "1") => {
  const {
    _sameBuyerDataSource,
    _nocustomizedDataSource,
    _examineDataSource,
  } = dataObj;
  const resObj = {
    // 同个买家下多个订单
    _sameBuyerDataSource: setExcelTabel(
      getAll_goodsList(_sameBuyerDataSource),
      index
    ),
    //不定制
    _nocustomizedDataSource: setExcelTabel(
      getAll_goodsList(_nocustomizedDataSource),
      index
    ),
   //人工审核
    _examineDataSource: setExcelTabel(
      getAll_goodsList(_examineDataSource),
      index
    ),
  };
  // console.log(resObj, "--textColor");
  return resObj;
};

//拿出所有的商品
const getAll_goodsList = (datasAll) => {
  const arr = datasAll?.map((item) => item.goodsList);
  return _flatten(arr);
};

// 去掉no,No,With name and number
const _formatSpec = (str)=>{
  if(str === 'No' || str === 'no' || str === 'onlyHasPatch'){
    return ''
  }
  return str
}
const setExcelTabel = (arrs, defineIndex) => {
  //先分4块一组
  const chunkArrs = _chunk(arrs, 4);
  //变换成table
  const res = [];
  chunkArrs.map((arr, i) => {
    // 先设置索引table
    let obj = {
      left: indexOrderTable(defineIndex),
    };
    //每一组的小数据
    arr.map((item, j) => {
      obj[`data${j}`] = orderTable({
        textColor: item.textColor,
        img: item.imgUrl,
        DZbuyName: "", //定制的人工加
        DZnumber: "", //定制的自己人工加
        bdAndgg:item.bdAndgg || '', // 补丁
        _instruction:item._instruction || '',
        business: item.buyerAccount,
        spec: _formatSpec(item.spec),// 定制的姓名和号码
        size: item.size,
        order_sn: item.orderCode,
        sBuyColor: item.sBuyColor || "",
        buyerEmail: item.buyerEmail,
        orderRemark: item.orderRemark,
      }); //一定要j,excel的列唯一
      obj[`empty${j}-`] = emptyLeftTable;
    });
    res.push(obj);
    //每一组，defineIndex++
    defineIndex++;
  });

  return res;
};
