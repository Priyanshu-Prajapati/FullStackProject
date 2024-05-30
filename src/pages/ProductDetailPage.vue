<template>
  <base-dialog :show="!!message" title="Shopping Cart" @close="handleError">
    <p>{{ message }}</p>
  </base-dialog>
  <nav-bar></nav-bar>
  <div v-if="product" class="mt-4 border-t-2 border-black">
    <div class="flex justify-center items-center mt-6 text-center">
      <img class="w-1/3" :src="product.imageUrl" alt="" />
    </div>
    <div class="p-3 mt-6">
      <div class="flex flex-1 justify-between border-b-2 border-black mb-4">
        <h1 class="text-2xl font-bold">{{ product.name }}</h1>
        <h3 class="font-medium">$ {{ product.price }}</h3>
      </div>
      <button
        @click="addToCart"
        class="w-full text-center rounded-xl bg-black text-white p-3 mb-3 hover:bg-gray-800"
      >
        Add To Cart
      </button>
    </div>
  </div>

  <div v-else>
    <not-found-page></not-found-page>
  </div>

  <router-link to="/new">visit New Design</router-link>

</template>

<script>
import axios from "axios";
import NotFoundPage from "./NotFoundPage.vue";
import NavBar from "../pages/NavBar.vue";
import BaseDialog from "../UI/BaseDialog.vue";

export default {
  props: ["products"],
  data() {
    return {
      product: {},
      cartItems: [],
      message: null,
    };
  },
  components: {
    NotFoundPage,
    NavBar,
    BaseDialog,
  },
  methods: {
    async addToCart() {
      await axios.post("/api/users/12345/cart", {
        id: this.$route.params.productId,
      });
      this.message = "Successfully added item to the Cart!";
    },
    handleError() {
      this.message = null;
    },
  },
  async created() {
    const response = await axios.get(
      `/api/product/${this.$route.params.productId}`
    );
    const product = response.data;
    this.product = product;
  },
};
</script>