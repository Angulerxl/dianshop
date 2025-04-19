
import { findIndex as _findIndex } from "lodash";

const __win_data = JSON.parse(window.localStorage.getItem("__sys4-base"));
const _patchOpts =  __win_data?.patch;

//去掉号码的等号啊括号啊那些多余的东西
export const _removeSizeSymbol = (str) => {
  if (!str) return "";
  let arr = [];
  const o = str.indexOf(":");
  const o1 = str.indexOf("：");
  const i = str.indexOf("=");
  const j = str.indexOf("（");
  const k = str.indexOf("(");

  if (o !== -1) {
    arr = str.split(":");
  }else if (o1 !== -1) {
    arr = str.split("：");
  }else if (i !== -1) {
    arr = str.split("=");
  } else if (j !== -1) {
    arr = str.split("（");
  } else if (k !== -1) {
    arr = str.split("(");
  } else {
    arr = str.split();
  }
  return arr[1];
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


// 分切产品规格的数据
//Size-尺寸， Specification-套装， CUSTOM PATCH-补丁， MODEL-袜子(值就是尺寸)，Custom Items-定制，Instruction-备注
export const _splitChangPingGuiGe = (str)=> {
    str = str.replaceAll('Other(Add In The Instruction)','With name and number')
    str = str.replaceAll('Custom ltems','Custom Items')
    const keywords = ['Size', 'Specification', 'CUSTOM PATCH', 'Custom Patch', 'MODEL', 'Custom Items', 'Instruction'];
    const positions = [];
    const resultObj = {};
    // 把关键字转换为驼峰命名
    const camelCaseKeywords = keywords.map(keyword => {
        return keyword
           .toLowerCase()
           .split(' ')
           .map((word, index) => {
                return index === 0? word : word.charAt(0).toUpperCase() + word.slice(1);
            })
           .join('');
    });

    // 初始化结果对象，将所有驼峰命名的关键字作为属性添加，值初始化为空字符串
    camelCaseKeywords.forEach(keyword => {
        resultObj[keyword] = '';
    });

    // 记录各个关键字的位置
    keywords.forEach((keyword, index) => {
        const keywordIndex = str.indexOf(keyword);
        if (keywordIndex!== -1) {
            positions.push({ keyword: camelCaseKeywords[index], index: keywordIndex });
        }
    });

    // 按位置排序
    positions.sort((a, b) => a.index - b.index);

    for (let i = 0; i < positions.length; i++) {
        const current = positions[i];
        const nextIndex = (i + 1 < positions.length)? positions[i + 1].index : str.length;
        let value = str.slice(current.index + keywords[camelCaseKeywords.indexOf(current.keyword)].length, nextIndex).trim();
        // 去掉冒号
        value = value.replace(':', '');
        resultObj[current.keyword] = value;
    }
    
    return resultObj;

}


// 配置中文的补丁
export const _setCnPatch = (str)=>{
  if(!str || str ==='NO' || str ==='No' || str ==='no') return ''
  if(__win_data.isPathUseEN){
    let res = ''
    const inx = _findIndex(_patchOpts,['value',str])
    if(inx === -1){
      res = str
    }else{
      res = _patchOpts[inx].label
    }
    return res
  }
  return str
}

// 配置中文的套装
export const _setCnSpecification = (str)=>{
  if(str === 'Suit' || str === 'suit'){
    return '套装'
  }
  if(str === 'Jacket' || str === 'jacket'){
    return '上衣'
  }
  if(str === 'Shorts' || str === 'shorts'){
    return '裤子'
  }
  return str
}

// 配置中文的袜子
export const _setCnModel = (str)=>{
  if(str === 'Adult' || str === 'adult'){
    return '大人'
  }
  if(str === 'Kids' || str === 'kids'){
    return '小孩'
  }
  return str
}

// 图片转成base64
export const _fileToBase64 = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
  });
};
async function getImageBase64(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}