<template>
  <form @submit.prevent="submit">
    <base-dialog :show="!!error" title="Login Error" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <!-- Global Container  -->
    <div class="flex items-center justify-center min-h-screen bg-rose-50">
      <!-- Card container  -->
      <div
        class="relative flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 m-0"
      >
        <!-- left side  -->
        <div class="p-6 md:p-20">
          <!-- Top content  -->
          <h2 class="font-mono mb-5 text-4xl font-bold">Register</h2>
          <p class="max-w-sm mb-12 font-sans font-light text-gray-600">
            Register in to your account to Buy stuffs from the E-shop.
          </p>
          <input
            v-model="email"
            type="text"
            class="w-full p-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
            placeholder="Enter your email address"
          />

          <input
            v-model="password"
            type="password"
            class="w-full p-6 border mt-3 border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
            placeholder="Enter your Password"
          />

          <!-- Middle content  -->
          <div
            class="flex flex-col items-center justify-between mt-6 space-y-6 md:flex-row md:space-y-0"
          >
            <div class="font-thin text-cyan-700">Forgot password</div>

            <button
              v-if="valid"
              class="w-full md:w-auto flex justify-center items-center p-6 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
            >
              <span>Submit Data</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-7"
                viewBox="0 0 24 24"
                stroke-width="'1.5"
                stroke="#ffffff"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="5" y1="12" x2="19" y2="12" />
                <line x1="13" y1="18" x2="19" y2="12" />
                <line x1="13" y1="6" x2="19" y2="12" />
              </svg>
            </button>
            <router-link v-else to="/login">
              <button
                class="w-full md:w-auto mt-4 flex justify-center items-center p-6 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
              >
                <span>Login, After Submitting the details</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-7"
                  viewBox="0 0 24 24"
                  stroke-width="'1.5"
                  stroke="#ffffff"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <line x1="13" y1="18" x2="19" y2="12" />
                  <line x1="13" y1="6" x2="19" y2="12" />
                </svg>
              </button>
            </router-link>
          </div>

          <!-- Border  -->
          <div class="mt-12 border-b border-b-gray-300"></div>

          <!-- Bottom Content  -->
          <p class="py-6 text-sm font-thin text-center text-gray-400">
            or log in with
          </p>

          <!-- Bottom buttons Container  -->
          <div
            class="flex flex-col space-x-0 space-y-6 md:flex-row md:space-x-4 md:space-y-0"
          >
            <button
              class="flex items-center justify-center py-2 space-x-3 border border-gray-300 rounded shadow-sm hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5 transition duration-150 md:w-1/2"
            >
              <img
                src="https://cdn.iconscout.com/icon/free/png-512/free-facebook-293-916915.png?f=webp&w=256"
                alt=""
                class="w-9"
              />
              <span class="font-thin">Facebook</span>
            </button>
            <button
              class="flex items-center justify-center py-2 space-x-3 border border-gray-300 rounded shadow-sm hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5 transition duration-150 md:w-1/2"
            >
              <img
                src="https://assets-global.website-files.com/64f7711eb780b1a9e4b52ff1/6570773e05eeeba196279b27_Logo-Ribbon-G.webp"
                alt=""
                class="w-9"
              />
              <span class="font-thin">Google</span>
            </button>
          </div>
          <div class="flex items-center justify-center mt-4">
            <router-link to="/login"
              >Already Registered?
              <button
                class="w-full md:w-auto flex justify-center items-center p-3 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
              >
                Login now
              </button></router-link
            >
          </div>
        </div>

        <!-- right side  -->
        <img
          src="https://images.pexels.com/photos/2533089/pexels-photo-2533089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          class="w-[430px] hidden md:block"
        />

        <!-- Close button  -->
        <div
          class="group absolute -top-5 right-4 flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full md:bg-white md:top-4 hover:cursor-pointer hover:-translate-y-0.5 transition duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-black group-hover-gray-600"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24vH0z" fill="none" />
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import BaseDialog from '../UI/BaseDialog.vue';
// import { reactive } from "vue";
// import { useRouter } from "vue-router";

//   const router = useRouter();

export default {
    components: {
        BaseDialog
    },
  data() {
    return {
      email: "",
      password: "",
      valid: true,
      error: null,
    };
  },
  methods: {
    async submit() {
      try {
        await axios.post("/api/register", {
          email: this.email,
          password: this.password,
        });

        this.valid = false;
      } catch (e) {
        // alert("Please enter the details!");
        this.error = "Please enter the details!";
      }
    },
    handleError() {
      this.error = null;
    }
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>