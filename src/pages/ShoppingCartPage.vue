<template>
  <nav-bar></nav-bar>
  <shopping-cart-list @remove-from-cart="removefromCart($event)" :products="cartItems"></shopping-cart-list>
  
</template>

<script>
// import { cartItems } from "../temp-data";
import axios from "axios";
import ShoppingCartList from "../components/ShoppingCartList.vue";
import NavBar from "../pages/NavBar.vue";

export default {
  components: {
    ShoppingCartList,
    NavBar
  },
  data() {
    return {
      cartItems: [],
    };
  },
  methods: {
    async removefromCart(productId) {
      const response = await axios.delete(`/api/users/12345/cart/${productId}`);
      const updatedCart = response.data;
      this.cartItems = updatedCart;
    }
  },
  async created() {
    const response = await axios.get("/api/users/12345/cart");
    const cartItems = response.data;
    this.cartItems = cartItems;
  },
};
</script>

