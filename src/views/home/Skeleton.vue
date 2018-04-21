<template>
  <div class="home home-skeleton">
    <div class="home-section home-title home-skeleton-title">
      <w-skeleton></w-skeleton>
    </div>
    <div class="home-section home-count home-skeleton-count">
      <w-skeleton></w-skeleton>
    </div>
    <div class="home-section home-buttons">
      <w-skeleton height="100px"></w-skeleton>
    </div>
  </div>
</template>
<script>
</script>
<style lang="scss">
.home-skeleton {
  .home-section {
    overflow: hidden;
  }

  &-title {
    width: 200px;
  }

  &-count {
    width: 160px;
  }
}
</style>
