import {
  findIndex as _findIndex,
  map as _map,
  uniq as _uniq,
  uniqBy as _uniqBy,
  find as _find,
  cloneDeep as _cloneDeep,
  some as _some,
  includes as _includes,
} from "lodash";
import { _setColor } from "../upload/basicConf.js";

const __win_data = JSON.parse(window.localStorage.getItem("__sys2-base"));
const specBtns = __win_data?.btns;

//查相同买家
export const _getSameBuyer = ({ orderDataSource }) => {
  const userBuyOnce = [];
  const userBuyMore = [];
  const buyOnceOrderCodes = [];
  const buyMoreOrderCodes = [];
  const moreCodesAndColor = [];
  //只有这里知道谁跟谁相同

  orderDataSource.map((item) => {
    const sBuyColor = _setColor();
    const inx = userBuyOnce.indexOf(item.buyerAccount);
    //如果不曾存在这个单，加进去
    if (inx === -1) {
      userBuyOnce.push(item.buyerAccount);
      buyOnceOrderCodes.push(item.orderCode);
    } else {
      userBuyMore.push(item.buyerAccount); //名字可能重复了，但是单号没重复
      //订单号给到多个里，因为订单号一定不同
      buyMoreOrderCodes.push(buyOnceOrderCodes[inx]);
      buyMoreOrderCodes.push(item.orderCode);
      //商家颜色要保持一样，所以多一个格式回来
      moreCodesAndColor.push({ code: buyOnceOrderCodes[inx], sBuyColor });
      moreCodesAndColor.push({ code: item.orderCode, sBuyColor });

      //单个里排除
      userBuyOnce.splice(inx, 1); //存在多个，你删
      buyOnceOrderCodes.splice(inx, 1);
    }
  });
  return {
    //这些没用上，就不返回出去了
    // userBuyOnce,
    // userBuyMore: Array.from(new Set(userBuyMore)),
    // buyOnceOrderCodes,
    moreCodesAndColor: _uniqBy(moreCodesAndColor, "code"),
    buyMoreOrderCodes: _uniq(buyMoreOrderCodes),
  };
};

//超230的
export const _getMoney230 = ({ orderDataSource }) => {
  const yesMoney = __win_data.money || "170";
  const less230OrderCodes = [];
  const more230OrderCodes = [];
  orderDataSource.map((item) => {
    if (parseFloat(item.amount) > parseFloat(yesMoney)) {
      more230OrderCodes.push(item.orderCode);
    } else {
      less230OrderCodes.push(item.orderCode);
    }
  });
  return {
    less230OrderCodes: _uniq(less230OrderCodes),
    more230OrderCodes: _uniq(more230OrderCodes),
  };
};

//先拿定制的-sys2-customized，剩下不定制-sys2-noCustomized，找不到就人工:
export const _customized = ({ orderDataSource }) => {
  const custOrderCodes = specFunc({
    key: "sys2-customized",
    orderDataSource,
  });
  return {
    custOrderCodes: _uniq(custOrderCodes),
  };
};
export const _noCustomized = ({ orderDataSource }) => {
  const noCustOrderCodes = specFunc({
    key: "sys2-noCustomized",
    orderDataSource,
  });
  return {
    noCustOrderCodes: _uniq(noCustOrderCodes),
  };
};

const specFunc = ({ key, orderDataSource }) => {
  const obj = _find(specBtns, ["value", key]);
  const options = obj.specs;

  const orderCode = [];
  orderDataSource.map((item) => {
    //拿出所有商品的所有规格(去重)
    const goods = _map(item.goodsList, "spec");
    const specOptions = _uniq(goods);
    //判断这个规格
    const res = _some(options, (value) => _includes(specOptions, value));
    if (res) {
      orderCode.push(item.orderCode);
    }
  });
  return orderCode;
};
