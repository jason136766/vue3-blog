<template>
  <el-card class="login">
    <h1 align="center">登录</h1>
    <el-form ref="form" :model="form" label-width="120px">
      <div>
        <el-input type="text" placeholder="username"></el-input>
      </div>
      <div>
        <el-input type="password" placeholder="password"></el-input>
      </div>

      <div>
        <el-button type="primary" @click="onSubmit">Login</el-button>
      </div>
    </el-form>
  </el-card>

</template>

<script lang="ts">
export default {
  name: 'Login',
}
</script>

<style scoped lang="scss">
.login {
  padding: 1em 2em 0 2em;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 400px;
  height: 330px;
  margin: auto;

  h1, div {
    margin-bottom: 1em;
  }

  button {
    width: 100%;
  }
}
</style>
