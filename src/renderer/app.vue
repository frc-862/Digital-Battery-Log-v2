<template>
  <div>
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
  import { Colors } from "./render";
  import { useConfigStore } from "./stores/configStore";
  const store = useConfigStore();
  await store.updateLocalConfig();
  const syncColors = () => {
    const colors: Colors = store.getColors;
    const primaryColor = colors.primary;
    const secondaryColor = colors.secondary;
    const tertiaryColor = colors.tertiary;
    const warningColor = colors.warning;
    const primaryText = colors.primaryText;
    const secondaryText = colors.secondaryText;
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
    document.documentElement.style.setProperty("--primaryText", primaryText);
    document.documentElement.style.setProperty(
      "--secondaryText",
      secondaryText,
    );
  };
  syncColors();
</script>
<style></style>
