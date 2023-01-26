<template>
    <div class="nav-container">
        <NuxtLink to="/settings"><i class="fa fa-cogs fa-4x"></i></NuxtLink>
        <p>Battery Logger</p>
        <NuxtLink to="/"><i class="fa fa-home fa-4x"></i></NuxtLink>
    </div>
</template>
<style lang="scss">
.nav-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    justify-items: space-between;
    align-items: center;
    align-content: center;

    p {
        font-size: 1.5rem;
        font-weight: 600;
    }

    & > * {
        color: $Secondarycolor;
    }

    padding: 2rem 10rem;
}
</style>
