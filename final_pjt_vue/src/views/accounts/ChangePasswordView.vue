<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Password Change Form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                id="old_password"
                label="기존 비밀번호"
                name="old_password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="changepasswordData.old_password"
                @keypress.enter="changepassword(changepasswordData)"
                :rules="passwordRules"
              ></v-text-field>

              <v-text-field
                id="new_password1"
                label="새 비밀번호"
                name="new_password1"
                prepend-icon="mdi-lock"
                type="password"
                v-model="changepasswordData.new_password1"
                @keypress.enter="changepassword(changepasswordData)"
                :rules="passwordRules"
              ></v-text-field>

              <v-text-field
                id="new_password2"
                label="새 비밀번호 확인"
                name="new_password2"
                prepend-icon="mdi-lock"
                type="password"
                v-model="changepasswordData.new_password2"
                @keypress.enter="changepassword(changepasswordData)"
                :rules="passwordRules"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="changepassword(changepasswordData)">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "changepassword",
  data() {
    return {
      changepasswordData: {
        new_password1: null,
        new_password2: null,
        old_password: null
      },
      passwordRules: [
        value => !!value || "필수 정보입니다.",
        value =>
          (value || "").length >= 8 || "비밀번호는 8글자 이상이어야 합니다."
      ]
    };
  },
  methods: {
    ...mapActions("accounts", ["changepassword"])
  }
};
</script>

<style>
</style>