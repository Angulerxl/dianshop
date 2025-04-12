import { cloneDeep as _cloneDeep, findIndex as _findIndex } from "lodash";
import {
  _getSameBuyer,
  _getMoney230,
  _customized,
  _noCustomized,
} from "./main-item.js";
const __win_data = JSON.parse(window.localStorage.getItem("__sys2-base"));

/**
 //1、先拿出同个商家
  //2、拿出230
  //3、拿出配置的规格
  //4、找不到规格的人工审核
 * 
 */
export const _allSpecDatas = (allDatasObj) => {
  const _DATA_OBJ = _cloneDeep(allDatasObj);
  // 数据是层层递减的哦,维护一个数据源orderDataSource，递减
  //相同的买家
  const { moreCodesAndColor } = _getSameBuyer({
    orderDataSource: _DATA_OBJ.orderDataSource,
  });
  const _sameBuyerDataSource = getSpecDataBuyer({
    codeColorArrs: moreCodesAndColor,
    _DATA_OBJ,
  });
  //230的
  const { more230OrderCodes } = _getMoney230({
    orderDataSource: _DATA_OBJ.orderDataSource,
  });
  const _more230DataSource = getSpecData({
    codeArrs: more230OrderCodes,
    _DATA_OBJ,
  });
  //先拿定制的-sys2-customized，剩下不定制-sys2-noCustomized，找不到就人工
  const { custOrderCodes } = _customized({
    orderDataSource: _DATA_OBJ.orderDataSource,
  });
  const _customizedDataSource = getSpecData({
    codeArrs: custOrderCodes,
    _DATA_OBJ,
  });
  //不定制的
  const { noCustOrderCodes } = _noCustomized({
    orderDataSource: _DATA_OBJ.orderDataSource,
  });
  const _nocustomizedDataSource = getSpecData({
    codeArrs: noCustOrderCodes,
    _DATA_OBJ,
  });
  //找不到的
  const _examineDataSource = _DATA_OBJ.orderDataSource;

  const obj = {
    doOrdersDataSource: {
      _sameBuyerDataSource,
      _more230DataSource,
      _customizedDataSource,
      _nocustomizedDataSource,
      _examineDataSource,
    },
    flatDataSource: _DATA_OBJ.flatDataSource,
    allOrderCodes: _DATA_OBJ.allOrderCodes,
  };
  return obj;
};

//需要跳出的订单codeArrs，然后原来的数据源删掉跳出的订单，上面单号循环，能保证时间顺序
const getSpecData = ({ codeArrs, _DATA_OBJ }) => {
  const myDatas = [];
  codeArrs.map((item) => {
    const inx = _findIndex(_DATA_OBJ.orderDataSource, ["orderCode", item]);
    if (inx !== -1) {
      myDatas.push(_DATA_OBJ.orderDataSource[inx]);
      _DATA_OBJ.orderDataSource.splice(inx, 1);
    }
  });
  return myDatas;
};

//同个商家的单独做数据吧,同个商家的，把商家颜色放上去
const getSpecDataBuyer = ({ codeColorArrs, _DATA_OBJ }) => {
  const myDatas = [];
  // 同个商家的，把商家颜色放上去
  codeColorArrs.map((item) => {
    const inx = _findIndex(_DATA_OBJ.orderDataSource, ["orderCode", item.code]);
    if (inx !== -1) {
      //给每个商品加商家颜色
      const obj = _DATA_OBJ.orderDataSource[inx];
      obj.goodsList = obj.goodsList.map((g) => {
        return {
          ...g,
          sBuyColor: item.sBuyColor,
        };
      });

      myDatas.push(obj);
      _DATA_OBJ.orderDataSource.splice(inx, 1);
    }
  });
  return myDatas;
};

export const __testDatasObj = {
  flatDataSource: [
    {
      orderCode: "24010676F8T1WU",
      amount: 175.23,
      spec: "Com nome e número（2）",
      size: "S",
      number: 1,
      imgUrl:
        "https://s-cf-tw.shopeesz.com/file/cn-11134207-7r98o-lm1faxqo3so41e_tn",
      buyerAccount: "danielepires7",
    },
    {
      orderCode: "24010676F8T1WU",
      amount: 175.23,
      spec: "Com nome e número",
      size: "M",
      number: 1,
      imgUrl:
        "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-llxmmnxagd0kfa_tn",
      buyerAccount: "danielepires7",
    },
    {
      orderCode: "24010676DJDJKG",
      amount: 248.95,
      spec: "sem nome e número",
      size: "L",
      number: 1,
      imgUrl:
        "https://s-cf-tw.shopeesz.com/file/sg-11134201-7rbk9-lmu2ev9j8815b8_tn",
      buyerAccount: "castor80",
    },
    {
      orderCode: "24010676DJDJKG",
      amount: 248.95,
      spec: "Com nome e número",
      size: "XL",
      number: 2,
      imgUrl:
        "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-lmsx7ohi4zqc1d_tn",
      buyerAccount: "castor80",
    },
    {
      orderCode: "24010676MJGPC7",
      amount: 88.22,
      spec: "Com nome e número（1）",
      size: "M",
      number: 1,
      imgUrl:
        "https://s-cf-tw.shopeesz.com/file/cn-11134207-7r98o-lm1faxqo2e3ofa_tn",
      buyerAccount: "ryan_augusto_sg",
    },
    {
      orderCode: "24010679F6P7V3",
      amount: 145.01,
      spec: "sem nome e número",
      size: "S",
      number: 1,
      imgUrl:
        "https://s-cf-tw.shopeesz.com/file/sg-11134201-7qvf1-lilfqdu4nthi9c_tn",
      buyerAccount: "milenacampregher072",
    },
    {
      orderCode: "24010679F6P7V3",
      amount: 145.01,
      spec: "sem nome e número",
      size: "M",
      number: 1,
      imgUrl:
        "https://s-cf-tw.shopeesz.com/file/sg-11134201-7qvf1-lilfqdu4nthi9c_tn",
      buyerAccount: "milenacampregher072",
    },
    {
      orderCode: "2401053781800B",
      amount: 159.52,
      spec: "sem nome e número（2）",
      size: "M",
      number: 1,
      imgUrl:
        "https://s-cf-tw.shopeesz.com/file/cn-11134207-7r98o-lm0n5q9xkj6qbc_tn",
      buyerAccount: "hanielmorais",
    },
    {
      orderCode: "2401053781800B",
      amount: 159.52,
      spec: "Com nome e número",
      size: "M",
      number: 3,
      imgUrl:
        "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-llxmssftsobm31_tn",
      buyerAccount: "hanielmorais",
    },
    {
      orderCode: "240105379D4MBX",
      amount: 88.22,
      spec: "Com nome e número（1）",
      size: "M",
      number: 1,
      imgUrl:
        "https://s-cf-tw.shopeesz.com/file/cn-11134207-7r98o-lm1isfrikb3655_tn",
      buyerAccount: "henriquegmv",
    },
    {
      orderCode: "24010537X5TUSF",
      amount: 88.22,
      spec: "Com nome e número",
      size: "XXL",
      number: 1,
      imgUrl:
        "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-llxxig4odujo68_tn",
      buyerAccount: "joogetlio269",
    },
    {
      orderCode: "24010537X5TU002",
      amount: 86.22,
      spec: "Com nome e número",
      size: "XXL",
      number: 2,
      imgUrl:
        "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-llxxig4odujo68_tn",
      buyerAccount: "xiangtong",
    },
    {
      orderCode: "24010537X5TU001",
      amount: 81.22,
      spec: "Com nome e número",
      size: "XXL",
      number: 1,
      imgUrl:
        "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-llxxig4odujo68_tn",
      buyerAccount: "xiangtong",
    },
  ],
  orderDataSource: [
    {
      orderCode: "24010537X5TU001",
      amount: 81.22,
      buyerAccount: "xiangtong",
      goodsList: [
        {
          textColor: "#978502",
          spec: "Com nome e número",
          size: "XXL",
          number: 1,
          imgUrl:
            "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-llxxig4odujo68_tn",
          orderCode: "24010537X5TU001",
          buyerAccount: "xiangtong",
        },
      ],
    },
    {
      orderCode: "24010676F8T1WU",
      amount: 175.23,
      buyerAccount: "danielepires7",
      goodsList: [
        {
          textColor: "#b8133a",
          spec: "Com nome e número（2）",
          size: "S",
          number: 1,
          imgUrl:
            "https://s-cf-tw.shopeesz.com/file/cn-11134207-7r98o-lm1faxqo3so41e_tn",
          orderCode: "24010676F8T1WU",
          buyerAccount: "danielepires7",
        },
        {
          textColor: "#baea8a",
          spec: "Com nome e número",
          size: "M",
          number: 1,
          imgUrl:
            "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-llxmmnxagd0kfa_tn",
          orderCode: "24010676F8T1WU",
          buyerAccount: "danielepires7",
        },
      ],
    },
    {
      orderCode: "24010676DJDJKG",
      amount: 248.95,
      buyerAccount: "castor80",
      goodsList: [
        {
          textColor: "#6db528",
          spec: "sem nome e número",
          size: "L",
          number: 1,
          imgUrl:
            "https://s-cf-tw.shopeesz.com/file/sg-11134201-7rbk9-lmu2ev9j8815b8_tn",
          orderCode: "24010676DJDJKG",
          buyerAccount: "castor80",
        },
        {
          textColor: "#55787e",
          spec: "Com nome e número",
          size: "XL",
          number: 1,
          imgUrl:
            "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-lmsx7ohi4zqc1d_tn",
          orderCode: "24010676DJDJKG",
          buyerAccount: "castor80",
        },
        {
          textColor: "#55787e",
          spec: "Com nome e número",
          size: "XL",
          number: 1,
          imgUrl:
            "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-lmsx7ohi4zqc1d_tn",
          orderCode: "24010676DJDJKG",
          buyerAccount: "castor80",
        },
      ],
    },
    {
      orderCode: "24010676MJGPC7",
      amount: 88.22,
      buyerAccount: "ryan_augusto_sg",
      goodsList: [
        {
          textColor: "#44c240",
          spec: "Com nome e número（1）",
          size: "M",
          number: 1,
          imgUrl:
            "https://s-cf-tw.shopeesz.com/file/cn-11134207-7r98o-lm1faxqo2e3ofa_tn",
          orderCode: "24010676MJGPC7",
          buyerAccount: "ryan_augusto_sg",
        },
      ],
    },
    {
      orderCode: "24010679F6P7V3",
      amount: 145.01,
      buyerAccount: "milenacampregher072",
      goodsList: [
        {
          textColor: "#db83ce",
          spec: "sem nome e número",
          size: "S",
          number: 1,
          imgUrl:
            "https://s-cf-tw.shopeesz.com/file/sg-11134201-7qvf1-lilfqdu4nthi9c_tn",
          orderCode: "24010679F6P7V3",
          buyerAccount: "milenacampregher072",
        },
        {
          textColor: "#ac0073",
          spec: "sem nome e número",
          size: "M",
          number: 1,
          imgUrl:
            "https://s-cf-tw.shopeesz.com/file/sg-11134201-7qvf1-lilfqdu4nthi9c_tn",
          orderCode: "24010679F6P7V3",
          buyerAccount: "milenacampregher072",
        },
      ],
    },
    {
      orderCode: "2401053781800B",
      amount: 159.52,
      buyerAccount: "hanielmorais",
      goodsList: [
        {
          textColor: "#279104",
          spec: "sem nome e número（2）",
          size: "M",
          number: 1,
          imgUrl:
            "https://s-cf-tw.shopeesz.com/file/cn-11134207-7r98o-lm0n5q9xkj6qbc_tn",
          orderCode: "2401053781800B",
          buyerAccount: "hanielmorais",
        },
        {
          textColor: "#ab16a3",
          spec: "Com nome e número",
          size: "M",
          number: 1,
          imgUrl:
            "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-llxmssftsobm31_tn",
          orderCode: "2401053781800B",
          buyerAccount: "hanielmorais",
        },
        {
          textColor: "#ab16a3",
          spec: "Com nome e número",
          size: "M",
          number: 1,
          imgUrl:
            "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-llxmssftsobm31_tn",
          orderCode: "2401053781800B",
          buyerAccount: "hanielmorais",
        },
        {
          textColor: "#ab16a3",
          spec: "Com nome e número",
          size: "M",
          number: 1,
          imgUrl:
            "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-llxmssftsobm31_tn",
          orderCode: "2401053781800B",
          buyerAccount: "hanielmorais",
        },
      ],
    },

    {
      orderCode: "24010537X5TUSF",
      amount: 88.22,
      buyerAccount: "joogetlio269",
      goodsList: [
        {
          textColor: "#6f6ee8",
          spec: "Com nome e número",
          size: "XXL",
          number: 1,
          imgUrl:
            "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-llxxig4odujo68_tn",
          orderCode: "24010537X5TUSF",
          buyerAccount: "joogetlio269",
        },
      ],
    },
    {
      orderCode: "24010537X5TU002",
      amount: 86.22,
      buyerAccount: "xiangtong",
      goodsList: [
        {
          textColor: "#aebffa",
          spec: "Com nome e número",
          size: "XXL",
          number: 1,
          imgUrl:
            "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-llxxig4odujo68_tn",
          orderCode: "24010537X5TU002",
          buyerAccount: "xiangtong",
        },
        {
          textColor: "#aebffa",
          spec: "Com nome e número",
          size: "XXL",
          number: 1,
          imgUrl:
            "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-llxxig4odujo68_tn",
          orderCode: "24010537X5TU002",
          buyerAccount: "xiangtong",
        },
      ],
    },
    {
      orderCode: "240105379D4MBX",
      amount: 88.22,
      buyerAccount: "ryan_augusto_sg",
      goodsList: [
        {
          textColor: "#706085",
          spec: "Com nome e número（1）",
          size: "M",
          number: 1,
          imgUrl:
            "https://s-cf-tw.shopeesz.com/file/cn-11134207-7r98o-lm1isfrikb3655_tn",
          orderCode: "240105379D4MBX",
          buyerAccount: "ryan_augusto_sg",
        },
      ],
    },
  ],
  allOrderCodes: [
    "24010676F8T1WU",
    "24010676DJDJKG",
    "24010676MJGPC7",
    "24010679F6P7V3",
    "2401053781800B",
    "240105379D4MBX",
    "24010537X5TUSF",
    "24010537X5TU002",
    "24010537X5TU001",
  ],
};

export const _EXPORT_DATAS = {
  doOrdersDataSource: {
    _sameBuyerDataSource: [
      {
        orderCode: "24010537X5TU001",
        amount: 81.22,
        buyerAccount: "xiangtong",
        goodsList: [
          {
            textColor: "#978502",
            spec: "Com nome e número",
            size: "XXL",
            number: 1,
            imgUrl:
              "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-llxxig4odujo68_tn",
            orderCode: "24010537X5TU001",
            buyerAccount: "xiangtong",
            sBuyColor: "#546cb3",
          },
        ],
      },
      {
        orderCode: "24010537X5TU002",
        amount: 86.22,
        buyerAccount: "xiangtong",
        goodsList: [
          {
            textColor: "#aebffa",
            spec: "Com nome e número",
            size: "XXL",
            number: 1,
            imgUrl:
              "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-llxxig4odujo68_tn",
            orderCode: "24010537X5TU002",
            buyerAccount: "xiangtong",
            sBuyColor: "#546cb3",
          },
          {
            textColor: "#aebffa",
            spec: "Com nome e número",
            size: "XXL",
            number: 1,
            imgUrl:
              "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-llxxig4odujo68_tn",
            orderCode: "24010537X5TU002",
            buyerAccount: "xiangtong",
            sBuyColor: "#546cb3",
          },
        ],
      },
      {
        orderCode: "24010676MJGPC7",
        amount: 88.22,
        buyerAccount: "ryan_augusto_sg",
        goodsList: [
          {
            textColor: "#44c240",
            spec: "Com nome e número（1）",
            size: "M",
            number: 1,
            imgUrl:
              "https://s-cf-tw.shopeesz.com/file/cn-11134207-7r98o-lm1faxqo2e3ofa_tn",
            orderCode: "24010676MJGPC7",
            buyerAccount: "ryan_augusto_sg",
            sBuyColor: "#b0b28f",
          },
        ],
      },
      {
        orderCode: "240105379D4MBX",
        amount: 88.22,
        buyerAccount: "ryan_augusto_sg",
        goodsList: [
          {
            textColor: "#706085",
            spec: "Com nome e número（1）",
            size: "M",
            number: 1,
            imgUrl:
              "https://s-cf-tw.shopeesz.com/file/cn-11134207-7r98o-lm1isfrikb3655_tn",
            orderCode: "240105379D4MBX",
            buyerAccount: "ryan_augusto_sg",
            sBuyColor: "#b0b28f",
          },
        ],
      },
    ],
    _more230DataSource: [
      {
        orderCode: "24010676F8T1WU",
        amount: 175.23,
        buyerAccount: "danielepires7",
        goodsList: [
          {
            textColor: "#b8133a",
            spec: "Com nome e número（2）",
            size: "S",
            number: 1,
            imgUrl:
              "https://s-cf-tw.shopeesz.com/file/cn-11134207-7r98o-lm1faxqo3so41e_tn",
            orderCode: "24010676F8T1WU",
            buyerAccount: "danielepires7",
          },
          {
            textColor: "#baea8a",
            spec: "Com nome e número",
            size: "M",
            number: 1,
            imgUrl:
              "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-llxmmnxagd0kfa_tn",
            orderCode: "24010676F8T1WU",
            buyerAccount: "danielepires7",
          },
        ],
      },
      {
        orderCode: "24010676DJDJKG",
        amount: 248.95,
        buyerAccount: "castor80",
        goodsList: [
          {
            textColor: "#6db528",
            spec: "sem nome e número",
            size: "L",
            number: 1,
            imgUrl:
              "https://s-cf-tw.shopeesz.com/file/sg-11134201-7rbk9-lmu2ev9j8815b8_tn",
            orderCode: "24010676DJDJKG",
            buyerAccount: "castor80",
          },
          {
            textColor: "#55787e",
            spec: "Com nome e número",
            size: "XL",
            number: 1,
            imgUrl:
              "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-lmsx7ohi4zqc1d_tn",
            orderCode: "24010676DJDJKG",
            buyerAccount: "castor80",
          },
          {
            textColor: "#55787e",
            spec: "Com nome e número",
            size: "XL",
            number: 1,
            imgUrl:
              "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-lmsx7ohi4zqc1d_tn",
            orderCode: "24010676DJDJKG",
            buyerAccount: "castor80",
          },
        ],
      },
    ],
    _customizedDataSource: [
      {
        orderCode: "2401053781800B",
        amount: 159.52,
        buyerAccount: "hanielmorais",
        goodsList: [
          {
            textColor: "#279104",
            spec: "sem nome e número（2）",
            size: "M",
            number: 1,
            imgUrl:
              "https://s-cf-tw.shopeesz.com/file/cn-11134207-7r98o-lm0n5q9xkj6qbc_tn",
            orderCode: "2401053781800B",
            buyerAccount: "hanielmorais",
          },
          {
            textColor: "#ab16a3",
            spec: "Com nome e número",
            size: "M",
            number: 1,
            imgUrl:
              "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-llxmssftsobm31_tn",
            orderCode: "2401053781800B",
            buyerAccount: "hanielmorais",
          },
          {
            textColor: "#ab16a3",
            spec: "Com nome e número",
            size: "M",
            number: 1,
            imgUrl:
              "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-llxmssftsobm31_tn",
            orderCode: "2401053781800B",
            buyerAccount: "hanielmorais",
          },
          {
            textColor: "#ab16a3",
            spec: "Com nome e número",
            size: "M",
            number: 1,
            imgUrl:
              "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-llxmssftsobm31_tn",
            orderCode: "2401053781800B",
            buyerAccount: "hanielmorais",
          },
        ],
      },
      {
        orderCode: "24010537X5TUSF",
        amount: 88.22,
        buyerAccount: "joogetlio269",
        goodsList: [
          {
            textColor: "#6f6ee8",
            spec: "Com nome e número",
            size: "XXL",
            number: 1,
            imgUrl:
              "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-llxxig4odujo68_tn",
            orderCode: "24010537X5TUSF",
            buyerAccount: "joogetlio269",
          },
        ],
      },
    ],
    _nocustomizedDataSource: [
      {
        orderCode: "24010679F6P7V3",
        amount: 145.01,
        buyerAccount: "milenacampregher072",
        goodsList: [
          {
            textColor: "#db83ce",
            spec: "sem nome e número",
            size: "S",
            number: 1,
            imgUrl:
              "https://s-cf-tw.shopeesz.com/file/sg-11134201-7qvf1-lilfqdu4nthi9c_tn",
            orderCode: "24010679F6P7V3",
            buyerAccount: "milenacampregher072",
          },
          {
            textColor: "#ac0073",
            spec: "sem nome e número",
            size: "M",
            number: 1,
            imgUrl:
              "https://s-cf-tw.shopeesz.com/file/sg-11134201-7qvf1-lilfqdu4nthi9c_tn",
            orderCode: "24010679F6P7V3",
            buyerAccount: "milenacampregher072",
          },
        ],
      },
    ],
    _examineDataSource: [],
  },
  flatDataSource: [
    {
      orderCode: "24010676F8T1WU",
      amount: 175.23,
      spec: "Com nome e número（2）",
      size: "S",
      number: 1,
      imgUrl:
        "https://s-cf-tw.shopeesz.com/file/cn-11134207-7r98o-lm1faxqo3so41e_tn",
      buyerAccount: "danielepires7",
    },
    {
      orderCode: "24010676F8T1WU",
      amount: 175.23,
      spec: "Com nome e número",
      size: "M",
      number: 1,
      imgUrl:
        "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-llxmmnxagd0kfa_tn",
      buyerAccount: "danielepires7",
    },
    {
      orderCode: "24010676DJDJKG",
      amount: 248.95,
      spec: "sem nome e número",
      size: "L",
      number: 1,
      imgUrl:
        "https://s-cf-tw.shopeesz.com/file/sg-11134201-7rbk9-lmu2ev9j8815b8_tn",
      buyerAccount: "castor80",
    },
    {
      orderCode: "24010676DJDJKG",
      amount: 248.95,
      spec: "Com nome e número",
      size: "XL",
      number: 2,
      imgUrl:
        "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-lmsx7ohi4zqc1d_tn",
      buyerAccount: "castor80",
    },
    {
      orderCode: "24010676MJGPC7",
      amount: 88.22,
      spec: "Com nome e número（1）",
      size: "M",
      number: 1,
      imgUrl:
        "https://s-cf-tw.shopeesz.com/file/cn-11134207-7r98o-lm1faxqo2e3ofa_tn",
      buyerAccount: "ryan_augusto_sg",
    },
    {
      orderCode: "24010679F6P7V3",
      amount: 145.01,
      spec: "sem nome e número",
      size: "S",
      number: 1,
      imgUrl:
        "https://s-cf-tw.shopeesz.com/file/sg-11134201-7qvf1-lilfqdu4nthi9c_tn",
      buyerAccount: "milenacampregher072",
    },
    {
      orderCode: "24010679F6P7V3",
      amount: 145.01,
      spec: "sem nome e número",
      size: "M",
      number: 1,
      imgUrl:
        "https://s-cf-tw.shopeesz.com/file/sg-11134201-7qvf1-lilfqdu4nthi9c_tn",
      buyerAccount: "milenacampregher072",
    },
    {
      orderCode: "2401053781800B",
      amount: 159.52,
      spec: "sem nome e número（2）",
      size: "M",
      number: 1,
      imgUrl:
        "https://s-cf-tw.shopeesz.com/file/cn-11134207-7r98o-lm0n5q9xkj6qbc_tn",
      buyerAccount: "hanielmorais",
    },
    {
      orderCode: "2401053781800B",
      amount: 159.52,
      spec: "Com nome e número",
      size: "M",
      number: 3,
      imgUrl:
        "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-llxmssftsobm31_tn",
      buyerAccount: "hanielmorais",
    },
    {
      orderCode: "240105379D4MBX",
      amount: 88.22,
      spec: "Com nome e número（1）",
      size: "M",
      number: 1,
      imgUrl:
        "https://s-cf-tw.shopeesz.com/file/cn-11134207-7r98o-lm1isfrikb3655_tn",
      buyerAccount: "henriquegmv",
    },
    {
      orderCode: "24010537X5TUSF",
      amount: 88.22,
      spec: "Com nome e número",
      size: "XXL",
      number: 1,
      imgUrl:
        "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-llxxig4odujo68_tn",
      buyerAccount: "joogetlio269",
    },
    {
      orderCode: "24010537X5TU002",
      amount: 86.22,
      spec: "Com nome e número",
      size: "XXL",
      number: 2,
      imgUrl:
        "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-llxxig4odujo68_tn",
      buyerAccount: "xiangtong",
    },
    {
      orderCode: "24010537X5TU001",
      amount: 81.22,
      spec: "Com nome e número",
      size: "XXL",
      number: 1,
      imgUrl:
        "https://s-cf-tw.shopeesz.com/file/cn-11134211-7r98o-llxxig4odujo68_tn",
      buyerAccount: "xiangtong",
    },
  ],
  allOrderCodes: [
    "24010676F8T1WU",
    "24010676DJDJKG",
    "24010676MJGPC7",
    "24010679F6P7V3",
    "2401053781800B",
    "240105379D4MBX",
    "24010537X5TUSF",
    "24010537X5TU002",
    "24010537X5TU001",
  ],
};
