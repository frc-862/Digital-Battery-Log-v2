<template>
  <div>
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
  import { Colors } from "./render";
  import { useConfigStore } from "./stores/configStore";

  //data store setup. The data store is used as an intermediate layer between the renderer and the main process.
  const store = useConfigStore();
  await store.updateLocalConfig();
  const syncColors = () => {
    //sync colors from the store to the css variables
    const colors: Colors = store.getColors;
    const primaryColor = colors.primary;
    const secondaryColor = colors.secondary;
    const tertiaryColor = colors.tertiary;
    const warningColor = colors.warning;
    const primaryText = colors.primaryText;
    const secondaryText = colors.secondaryText;
    //set the css variables
    document.documentElement.style.setProperty("--primaryColor", primaryColor);
    document.documentElement.style.setProperty(
      "--secondaryColor",
      secondaryColor,
    );
    document.documentElement.style.setProperty(
      "--tertiaryColor",
      tertiaryColor,
    );
    document.documentElement.style.setProperty("--warningColor", warningColor);
    document.documentElement.style.setProperty("--textColor", primaryText);
    document.documentElement.style.setProperty(
      "--secondaryTextColor",
      secondaryText,
    );
  };
  syncColors();
</script>
<style></style>
