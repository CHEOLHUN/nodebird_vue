<template>
  <div>
    <v-container>
      <v-card>
        <v-container>
          <v-subheader>회원가입</v-subheader>
          <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
            <v-text-field v-model="email" label="이메일" type="email" :rules="emailRules" required />
            <v-text-field
              v-model="password"
              label="비밀번호"
              type="password"
              :rules="passwordRules"
              required
            />
            <v-text-field
              v-model="passwordCheck"
              label="비밀번호 확인"
              type="password"
              :rules="passwordCheckRules"
              required
            />
            <v-text-field
              v-model="nickname"
              label="닉네임"
              type="nickname"
              :rules="nicknameRules"
              required
            />
            <v-checkbox v-model="terms" label="회원가입에 동의합니다." :rules="termsRules" required />
            <v-btn color="green" type="submit">회원가입</v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      passwordCheck: "",
      nickname: "",
      terms: false,
      emailRules: [
        //vuetify에서 제공하는 기능
        //조건 함수 || 에러메세지 형식(조건 함수가 false가 반환 될 경우 실행)
        //!!는 결과값을 Boolean으로 변환해 주는것
        //v가 0,null,undifined인 경우 !v ===true !!v === false
        v => !!v || "이메일은 필수입니다.",
        //정규식.test의 경우 해당 값(v)에서 특정 문자가 있는 경우 true, 없는 경우 false를 반환
        v => /.+@.+/.test(v) || "이메일이 유효하지 않습니다."
      ],
      nicknameRules: [v => !!v || "닉네임은 필수입니다."],
      passwordRules: [v => !!v || "비밀번호는 필수입니다."],
      passwordCheckRules: [
        v => !!v || "비밀번호 확인은 필수입니다.",
        v => v === this.password || "비밀번호가 일치하지 않습니다."
      ],
      termsRules: [v => !!v || "약관에 동의해야 합니다."]
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    }
  },
  watch: {
    me(value, oldValue) {
      if (value) {
        this.$router.push({
          path: "/"
        });
      }
    }
  },
  methods: {
    onSubmitForm() {
      //태그에 ref속성을 주게되면 this.$refs로 접근이 가능해진다.
      //validate는 vuetify에서 제공하는 메서드로 rules가 모두 true 경우에 해당 데이터가 바인딩된 변수에 true를 반환한다.
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("users/signUp", {
            nickname: this.nickname,
            email: this.email
          })
          .then(() => {
            this.$router.push({
              path: "/"
            });
          })
          .catch(() => {
            alert("회원가입 실패");
          });
      } else {
        alert("폼이 유효하지 않습니다.");
      }
    }
  },
  head() {
    return {
      title: "회원가입"
    };
  },
  middleware: "anonymous"
};
</script>

<style scoped></style>
