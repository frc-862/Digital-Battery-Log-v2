<template>
  <div class="home-menu-container">
    <NuxtLink to="/out" class="home-menu-button">
      <p>Sign Out</p>
    </NuxtLink>
    <NuxtLink to="/in" class="home-menu-button">
      <p>Sign In</p>
    </NuxtLink>
    <NuxtLink to="/logs" class="home-menu-button">
      <p>Logs</p>
    </NuxtLink>
  </div>
</template>
<style lang="scss">
  .home-menu-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-content: center;
    height: 100%;
    width: 100%;
    gap: 5%;
  }

  .home-menu-button {
    background-color: var(--secondaryColor);
    position: relative;
    width: 25%;
    height: 75%;
    border-radius: 50px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    justify-items: center;
    border: 5px solid var(--tertiaryColor);
    text-decoration: none;
    color: var(--textColor);

    p {
      font-size: 4rem;
      font-weight: 600;
    }

    &:hover {
      background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
    }
  }
</style>
