<template>
  <div class="login-container">
    <b-container>
      <b-row class="justify-content-center align-items-center">
        <b-col md="6">
          
          <b-card class="shadow-lg p-4">
            <h3 class="text-center mb-4">Login</h3>
            <b-form @submit.prevent="login">
              <b-form-floating-label label="Email address" label-for="floatingEmail" class="my-2">
                <b-form-input id="floatingEmail" type="email" placeholder="Email address" v-model="loginFormData.email"
                  autocomplete="email" />
              </b-form-floating-label>
              <b-form-floating-label label="Password" label-for="floatingPassword" class="my-2">
                <b-form-input id="floatingPassword" type="password" placeholder="Password"
                  v-model="loginFormData.password" autocomplete="current-password" />
              </b-form-floating-label>
              <b-button type="submit" variant="primary" class="mt-3 mx-auto d-block">
                Login
              </b-button>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import type {loginResponse} from '../types/zooTypes'
import {useCustomToast} from "~/composables/useCustomToast"

const router = useRouter()
const {showToast}= useCustomToast()

const loginFormData = ref({
  email: '',
  password: '',
});

const login = async () => {
  const url = 'http://localhost:3000/api/auth/login';

  const { status, data: loginData } = await useLazyFetch<loginResponse>(url, {
    method: 'POST',
    body: JSON.stringify(loginFormData.value)
  });
  if (status.value === "success") {
    showToast("Login Successfully", "success")
    router.push('/zoo/zoo')
  }
  else {
    showToast("Login Failed!!", "danger")
  }

};

</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>