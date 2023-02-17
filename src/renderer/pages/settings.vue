<template>
  <div class="page-container">
    <NuxtLayout>
      <settingsMenu />
    </NuxtLayout>
  </div>
</template>
<style lang="scss">
  .page-container {
    padding: 0;
    margin: 0;
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: var(--primaryColor);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
