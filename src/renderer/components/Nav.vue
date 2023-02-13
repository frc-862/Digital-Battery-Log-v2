<template>
    <div class="nav-container">
        <NuxtLink to="/settings"><i class="fa-solid fa-gears fa-2x"></i></NuxtLink>
        <p>Battery Logger</p>
        <NuxtLink to="/"><i class="fa-solid fa-house-chimney fa-2x"></i></NuxtLink>
    </div>
</template>
<style lang="scss">
img {
    color: var(--secondaryColor);
    fill: var(--secondaryColor);
}

.nav-container {
    width: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    justify-items: space-between;
    align-items: center;
    align-content: center;
    padding: 0;

    p {
        font-size: 1.5rem;
        font-weight: 600;
    }

    & > * {
        color: var(--secondaryColor);
    }

    padding: 2rem 10rem;
}
</style>
