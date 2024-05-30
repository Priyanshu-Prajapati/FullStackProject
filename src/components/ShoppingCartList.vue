<template >
  <base-dialog :show="!!error" title="Login Error" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <h1
    class="flex justify-center text-2xl font-bold mb-2 border-b-2 border-black p-2"
  >
    Shopping Cart
  </h1>
  <div
    class="flex flex-col items-center justify-center"
    v-if="products.length === 0"
  >
    <img
      class="w-1/2"
      src="https://static.vecteezy.com/system/resources/previews/005/006/007/non_2x/no-item-in-the-shopping-cart-click-to-go-shopping-now-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
      alt=""
    />
    <router-link
      to="/product"
      class="rounded-xl bg-black w-full text-white p-3 text-center mt-4 hover:bg-gray-800"
      >Keep Shopping</router-link
    >
  </div>
  <div v-else>
    <div class=""></div>
    <div
      class="product-container border-t-2"
      v-for="product in products"
      :key="product.id"
    >
      <img class="product-image" :src="product.imageUrl" alt="" />
      <div class="details-wrap">
        <h3 class="font-bold">{{ product.name }}</h3>
        <p class="font-medium">$ {{ product.price }}</p>
        <div class="flex gap-3">
          <p class="font-medium">Qty: {{ product.qty }}</p>
          <div class="flex items-start max-w-11 gap-1">
            <button
              v-if="product.qty >= 2"
              @click="
                delQty(product);
                delPrice(product);
              "
              class="rounded-lg border-2 border-black text-black px-1 text-center m-auto md:text-xs"
            >
              -
            </button>
            <button
              @click="
                addQty(product);
                addPrice(product);
              "
              class="rounded-lg border-2 border-black text-black px-1 text-center m-auto md:text-xs"
            >
              +
            </button>
          </div>
        </div>
        <p>Price for {{ product.qty }} item: ${{ product.totalPrice }}</p>
      </div>

      <button
        @click="$emit('remove-from-cart', product.id)"
        class="flex-1 rounded-xl bg-black text-white p-3 text-center m-auto md:text-xs"
      >
        Remove from Cart
      </button>
    </div>

    <div class="bg-gray-50">
      <div class="mt-8 border-t border-b py-2 p-3">
        <div class="flex items-center justify-between">
          <p class="text-sm font-medium text-gray-900">Subtotal</p>
          <p class="font-semibold text-gray-900">${{ totalCartPrice }}</p>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-sm font-medium text-gray-900">Shipping</p>
          <p class="font-semibold text-gray-900">$8.00</p>
        </div>
      </div>
      <div class="mt-6 flex items-center justify-between p-2">
        <p class="text-sm font-medium text-gray-900">Total</p>
        <p class="text-2xl font-semibold text-gray-900">
          ${{ totalCartPrice + 8 }}
        </p>
      </div>

      <!-- <div class="p-3">
        <router-link to="/checkout">
          <button
            class="mt-4 mb-5 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
          >
            Place Order
          </button>
        </router-link>
      </div> -->
    </div>

    <div
      class="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32"
    ></div>
    <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
      <div class="px-4 pt-8">
        <p class="text-xl font-medium">Order Summary</p>
        <p class="text-gray-400">
          Check your items. And select a suitable shipping method.
        </p>
        <div
          class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6"
        >
          <div class="rounded-lg bg-white sm:flex-row">
            <div
              class="flex flex-row product-container"
              v-for="product in products"
              :key="product.id"
            >
              <img class="product-image" :src="product.imageUrl" alt="" />
              <div class="details-wrap">
                <h3 class="font-bold">{{ product.name }}</h3>
                <p class="font-medium">$ {{ product.price }}</p>
                <div class="flex gap-3">
                  <p class="font-medium">Qty: {{ product.qty }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
        <p class="text-xl font-medium">Payment Details</p>
        <p class="text-gray-400">
          Complete your order by providing your payment details.
        </p>
        <form @submit.prevent="submitData" class="">
          <label for="email" class="mt-4 mb-2 block text-sm font-medium"
            >Email</label
          >
          <div class="relative">
            <input
              ref="email"
              type="text"
              id="email"
              name="email"
              class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="your.email@gmail.com"
            />
            <div
              class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
          </div>
          <label for="card-holder" class="mt-4 mb-2 block text-sm font-medium"
            >Card Holder</label
          >
          <div class="relative">
            <input
              ref="cardHolder"
              type="text"
              id="card-holder"
              name="card-holder"
              class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Your full name here"
            />
            <div
              class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                />
              </svg>
            </div>
          </div>
          <label for="card-no" class="mt-4 mb-2 block text-sm font-medium"
            >Card Details</label
          >
          <div class="flex">
            <div class="relative w-7/12 flex-shrink-0">
              <input
                ref="cardDetails"
                type="text"
                id="card-no"
                name="card-no"
                class="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="xxxx-xxxx-xxxx-xxxx"
              />
              <div
                class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3"
              >
                <svg
                  class="h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z"
                  />
                  <path
                    d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z"
                  />
                </svg>
              </div>
            </div>
            <input
              ref="cardExp"
              type="text"
              name="credit-expiry"
              class="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="MM/YY"
            />
            <input
              ref="cardcvc"
              type="text"
              name="credit-cvc"
              class="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="CVC"
            />
          </div>
          <label
            for="billing-address"
            class="mt-4 mb-2 block text-sm font-medium"
            >Billing Address</label
          >
          <div class="flex flex-col sm:flex-row">
            <div class="relative flex-shrink-0 sm:w-7/12">
              <input
                ref="billingAdd"
                type="text"
                id="billing-address"
                name="billing-address"
                class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Street Address"
              />
              <div
                class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3"
              >
                <img
                  class="h-4 w-4 object-contain"
                  src="../assets/location-2950.svg"
                  alt=""
                />
              </div>
            </div>

            <input
              ref="billingZip"
              type="text"
              name="billing-zip"
              class="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="ZIP"
            />
          </div>
          <button
            v-if="valid"
            type="submit"
            class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
          >
            Place Order
          </button>
          <router-link v-else to="/success">
            <button
              type="submit"
              class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
            >
              Proceed
            </button>
          </router-link>
        </form>

        <p>{{ totalPrice }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BaseDialog from "../UI/BaseDialog.vue";

export default {
  props: ["products"],
  components: {
    BaseDialog,
  },
  data() {
    return {
      error: null,
      valid: true,
    };
  },
  computed: {
    totalCartPrice() {
      return this.products.reduce(
        (total, product) => parseFloat(total) + parseFloat(product.totalPrice),
        0
      );
    },
  },
  methods: {
    addQty(product) {
      return (product = product.qty++);
    },
    delQty(product) {
      return (product = product.qty--);
    },
    addPrice(product) {
      product.totalPrice = product.price * product.qty;
    },
    delPrice(product) {
      product.totalPrice = product.totalPrice - product.price;
    },
    async submitData() {
      if (
        this.$refs.email.value === "" ||
        this.$refs.cardHolder.value === "" ||
        this.$refs.cardDetails.value === "" ||
        this.$refs.cardExp.value === "" ||
        this.$refs.cardcvc.value === ""
      ) {
        this.error = "Please enter the details!";
        return;
      }
      await axios.post("/api/orderDetails", {
        email: this.$refs.email.value,
        cardHolder: this.$refs.cardHolder.value,
        cardDetails: this.$refs.cardDetails.value,
        cardExp: this.$refs.cardExp.value,
        cardcvc: this.$refs.cardcvc.value,
        billingAdd: this.$refs.billingAdd.value,
        billingZip: this.$refs.billingZip.value,
        totalPrice: this.totalCartPrice.toString(),
      });
      this.valid = false;
      this.error = "Order Placed!!!";
      this.$emit('clear-cart');
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
.product-container {
  align-content: "center";
  border-bottom: 1px solid #ddd;
  display: flex;
  padding: 16px;
  width: 100%;
}

.product-image {
  flex: 1;
  height: 100px;
  max-width: 100px;
}

.details-wrap {
  padding: 0 16px;
  flex: 3;
}
</style>