<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login Form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="아이디"
                name="login"
                prepend-icon="mdi-account"
                type="text"
                v-model="loginData.username"
                @keypress.enter="login(loginData)"
                :rules="requiredRules"
              ></v-text-field>

              <v-text-field
                id="password"
                label="비밀번호"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="loginData.password"
                @keypress.enter="login(loginData)"
                :rules="passwordRules"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login(loginData)">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LoginView",
  data() {
    return {
      loginData: {
        username: null,
        password: null
      },
      requiredRules: [value => !!value || "필수 정보입니다."],
      passwordRules: [
        value => !!value || "필수 정보입니다.",
        value =>
          (value || "").length >= 8 || "비밀번호는 8글자 이상이어야 합니다."
      ]
    };
  },
  methods: {
    ...mapActions("accounts", ["login"])
  }
};
</script>

<style>
</style>