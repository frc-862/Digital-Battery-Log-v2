<template>
    <div class="page-container">
        <nav class="nav">
            <Nav />
        </nav>
        <div class="page">
            <slot />
        </div>
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
    display: flex;
    flex-direction: column;
    justify-items: center;
    justify-content: center;
    align-items: center;
}

.nav {
    width: 100%;
    height: 20%;
}

.page {
    width: 100%;
    height: 80%;
}

</style>