<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Signup Form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="아이디"
                name="signup"
                prepend-icon="mdi-account"
                type="text"
                v-model="signupData.username"
                @keypress.enter="signup(signupData)"
                :rules="requiredRules"
              ></v-text-field>

              <v-text-field
                label="별명"
                name="nickname"
                prepend-icon="mdi-account-box"
                type="text"
                v-model="signupData.nickname"
                @keypress.enter="signup(signupData)"
                :rules="requiredRules"
              ></v-text-field>

              <v-text-field
                label="이메일"
                name="email"
                prepend-icon="mdi-email"
                type="email"
                v-model="signupData.email"
                @keypress.enter="signup(signupData)"
                :rules="emailRules"
              ></v-text-field>

              <v-text-field
                id="password"
                label="비밀번호"
                name="password"
                prepend-icon="mdi-lock-outline"
                type="password"
                v-model="signupData.password1"
                @keypress.enter="signup(signupData)"
                :rules="passwordRules"
              ></v-text-field>

              <v-text-field
                id="passwordConfirmation"
                label="비밀번호 확인"
                name="passwordConfirmation"
                prepend-icon="mdi-lock"
                type="password"
                v-model="signupData.password2"
                @keypress.enter="signup(signupData)"
                :rules="passwordRules"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="signup(signupData)">signup</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SignupView",
  data() {
    return {
      signupData: {
        username: null,
        nickname: null,
        email: null,
        password1: null,
        password2: null
      },
      emailRules: [
        value => !!value || "필수 정보입니다.",
        value => (value || "").length <= 30 || "30글자 이내로 작성하십시오.",
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "올바른 이메일 형식이 아닙니다.";
        }
      ],
      passwordRules: [
        value => !!value || "필수 정보입니다.",
        value =>
          (value || "").length >= 8 || "비밀번호는 8글자 이상이어야 합니다."
      ],
      requiredRules: [value => !!value || "필수 정보입니다."],
    };
  },
  methods: {
    ...mapActions("accounts", ["signup"])
  }
};
</script>

<style>
</style>