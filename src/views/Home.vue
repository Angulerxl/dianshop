<template>
  <div>
    <Lock @login="login" v-if="!islock" />
    <el-tabs v-else v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="店小秘" name="first">
        <Sys4Home />
      </el-tab-pane>
      <!-- <el-tab-pane label="独立站店小秘" name="first">
        <Sys3Home />
      </el-tab-pane> -->
      <!-- <el-tab-pane label="虾皮店小秘" name="second">
        <Sys2Home />
      </el-tab-pane>
      <el-tab-pane label="旧系统" name="third">
        <Main />
      </el-tab-pane> -->
    </el-tabs>

  </div>
</template>

<script>
import Main from "./Main.vue";
import Lock from "./Lock.vue";
import Sys2Home from "./sys2/home.vue";
import Sys3Home from "./sys3/home.vue";
import Sys4Home from "./sys4/home.vue";

export default {
  name: "Home",
  components: {
    // Main,
    Lock,
    // Sys2Home,
    // Sys3Home,
    Sys4Home
  },
  mounted() {},
  data: () => {
    return {
      islock: sessionStorage.getItem("isShopLock"),
      activeName: "first",
    };
  },
  methods: {
    login(bol) {
      this.islock = bol;
    },
    handleClick() {},
  },
};
</script>
<style lang="less" scoped>
:deep(.el-tabs__content) {
  height: calc(100vh - 60px);
  overflow-y: auto;
}
</style>
