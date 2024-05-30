<template>
  <base-dialog :show="!!message" title="Shopping Cart" @close="handleError">
    <p>{{ message }}</p>
  </base-dialog>
  <nav-bar></nav-bar>
  <products-list
    @add-to-cart="addToCart($event)"
    @clear-cart="clearCart"
    :products="products"
  ></products-list>
</template>

<script>
import ProductsList from "../components/ProductsList.vue";
import NavBar from "../pages/NavBar.vue";
import axios from "axios";
import BaseDialog from "../UI/BaseDialog.vue";

export default {
  components: {
    ProductsList,
    NavBar,
    BaseDialog,
  },
  data() {
    return {
      products: [],
      message: null,
    };
  },
  methods: {
    async addToCart(productId) {
      await axios.post("/api/users/12345/cart", { id: productId });
      // alert("Successfully added item to the Cart!");
      this.message = "Successfully added item to the Cart!";
    },
    async clearCart() {
      await axios.post('/api/clearCart');
    },
    handleError() {
      this.message = null;
    },
  },
  async created() {
    const response = await axios.get("/api/product");
    const products = response.data;
    this.products = products;
  },

  async onMounted() {
    try {
      await axios.get("api/user", {
        email: this.email,
        password: this.password,
      });

      this.validUser = true;
    } catch (e) {
      alert("Please enter the details! Or Check Your Credentials");
    }
  },
};
</script>