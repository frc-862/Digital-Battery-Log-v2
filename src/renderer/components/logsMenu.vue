<template>
    <div class="container">
        <p style="color:white; font-size: large;">logs</p>
    </div>
</template>
<script setup lang="ts">
console.log(await getAllLogs());
</script>
<style lang="scss">
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-top: 5px solid var(--secondaryColor);
}
</style>