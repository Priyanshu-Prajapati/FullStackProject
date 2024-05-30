<template>
  <div class="nav-bar flex justify-between p-3 mb-8">
    <router-link to="/product">
      <div class="logo-wrap">
        <img class="w-3/4 md:w-full" :src="logo" alt="Notfuond" />
      </div>
    </router-link>
    <div class="flex gap-5">
      <router-link to="/product">
        <button class="rounded-lg bg-black text-white p-3 text-xs md:text-base hover:bg-white hover:text-black hover:border-2 hover:border-black">
          Home 
        </button> 
      </router-link>
      <router-link to="/cart">
        <button class="rounded-lg bg-black text-white p-3 text-xs md:text-base hover:bg-white hover:text-black hover:border-2 hover:border-black">
          Shopping Cart
        </button> 
      </router-link>
      <router-link to="/login" @click="logout"
        class="rounded-lg bg-red-500 text-white p-3 text-xs md:text-base"
      >
        Logout
      </router-link>
    </div>
  </div>
</template>

<script>
import logo from "../assets/logo-hexagon.svg";


export default {
  data() {
    return {
      logo,
    };
  },
};
</script>

<style scoped>
.nav-bar {
  border-bottom: 1px solid #ddd;
  height: 75px;
  width: 100%;
}
.logo-wrap {
  width: 120px;
  height: 120px;
}
</style>