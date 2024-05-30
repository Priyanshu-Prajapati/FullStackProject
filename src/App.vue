<template>
    <div class="m-auto max-w-5xl min-h-screen">
      <router-view></router-view>
    </div>
</template>

<script>
export default {
  data() {
    return {
      requiresAuth: true,
    };
  },
};
</script>