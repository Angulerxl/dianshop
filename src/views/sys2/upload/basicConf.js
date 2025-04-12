//去掉号码的等号啊括号啊那些多余的东西
export const _removeSizeSymbol = (str) => {
  if (!str) return "没码数";
  let arr = [];
  const i = str.indexOf("=");
  const j = str.indexOf("（");
  const k = str.indexOf("(");

  if (i !== -1) {
    arr = str.split("=");
  } else if (j !== -1) {
    arr = str.split("（");
  } else if (k !== -1) {
    arr = str.split("(");
  } else {
    arr = str.split();
  }
  return arr[0];
};

//设置随机颜色值
export const _setColor = () => {
  const res =
    "#" +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padEnd(6, "0");
  return res;
};
