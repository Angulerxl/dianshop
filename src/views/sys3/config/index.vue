
<template>
  <el-dialog :append-to-body="true" :close-on-click-modal="false" :visible.sync="dialogVisible" title="配置信息" width="70%"
             height="500px" :before-close="onCancel">
    <el-tabs value="customized" @tab-click="handleClick" class="demo-dynamic">
      <!-- <el-tab-pane label="金额" name="priceLimit">
        <el-form :model="formData" ref="formData">
          <el-form-item prop="money" :rules="[{ required: true, message: '不能为空保存', trigger: 'blur' },]">
            <el-input v-model="formData.money" placeholder="设置超过多少钱拿出这个单"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="saveMoney('formData')">保存</el-button>
      </el-tab-pane> -->
      <!-- （不需要买家备注规格不填了） -->
      <el-tab-pane :label="`定制：需联系买家规格（${formData.rgSpec.length}）`" name="customized">
        <SpecTable :data="formData.rgSpec" @submit="customizedSubmit" />
      </el-tab-pane>
      <el-tab-pane :label="`不定制（${formData.ndzSpec.length}）`" name="noCustomized">
        <SpecTable :data="formData.ndzSpec" @submit="noCustomizedSubmit" />
      </el-tab-pane>

      <el-tab-pane :label="`规格`" name="btns">
        <div v-for="item in formData.btns" :key="item.value">
          <p>{{ item.label }}</p>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>
<script>
import { _SPEC_nocustomized, _SPEC_customized_rengong, _SIZE, _MONEY, _BTNS } from "../utils/enum.js";
import SpecTable from "./SpecTable.vue";
import { isEmpty as _isEmpty, findIndex as _findIndex } from "lodash";
const __win_data = JSON.parse(window.localStorage.getItem("__sys3-base")) || {};
console.log(!_isEmpty(__win_data) ? __win_data.btns : _BTNS, 44454);
export default {
  components: {
    SpecTable,
  },
  props: ["dialogVisible"],
  data() {
    return {
      formData: {
        ndzSpec: !_isEmpty(__win_data) ? __win_data.ndzSpec : _SPEC_nocustomized, //不定制
        // dzSpec: !_isEmpty(__win_data) ? __win_data.dzSpec : [], //定制
        rgSpec: !_isEmpty(__win_data) ? __win_data.rgSpec : _SPEC_customized_rengong, //定制:买家自己备注的规格
        money: !_isEmpty(__win_data) ? __win_data.money : _MONEY, //按钮
        btns: !_isEmpty(__win_data) ? __win_data.btns : _BTNS, //按钮
      },
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },

    // 弹窗
    onCancel() {
      this.$emit("onCancel");
    },
    //-------保存定制--------
    customizedSubmit(data) {
      console.log("查看定制规则======", data);
      this.formData.rgSpec = data;
      this.specLocalData();
    },
    //-------保存不定制--------
    noCustomizedSubmit(data) {
      console.log("查看不定制规则======", data);
      this.formData.ndzSpec = data;
      this.specLocalData();
    },
    //-------保存金额--------
    // saveMoney(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       const mInx = _findIndex(_BTNS, ["value", "sys3-money"]);
    //       this.formData.btns[mInx].label = `大于R$${this.formData.money}的单`;

    //       //保存
    //       window.localStorage.setItem(
    //         "__sys3-base",
    //         JSON.stringify(this.formData)
    //       );
    //       this.$message.success("配置成功");
    //     }
    //   });
    // },
    //保存数据
    specLocalData() {
      const dzInx = _findIndex(_BTNS, ["value", "sys3-examine_hasRemark"]);
      this.formData.btns[dzInx].specs = this.getKeys(this.formData.rgSpec);

      const ndzInx = _findIndex(_BTNS, ["value", "sys3-noCustomized"]);
      this.formData.btns[ndzInx].specs = this.getKeys(this.formData.ndzSpec);

      // //每次保存都属性按钮
      window.localStorage.setItem("__sys3-base", JSON.stringify(this.formData));
      this.$message.success("配置成功");
    },
    //
    getKeys(arr) {
      return arr.map((item) => item.value);
    },
  },
};
</script>
<style lang="less" scoped>
:deep(.el-dialog__body) {
  padding: 0 20px 20px;
}

.display-flex {
  display: flex;
  align-items: center;
}

.demo-dynamic {
  height: 500px;
  overflow-y: auto;
}
</style>