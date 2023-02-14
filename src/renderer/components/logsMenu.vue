<template>
    <div class="container">
        <header class="log-header">logs</header>
        <div class="log-label">
            <p style="color:white; font-size: large;">---Battery #---</p>
            <p style="color:white; font-size: large;">-------SOC-------</p>
            <p style="color:white; font-size: large;">------RINT------</p>
            <p style="color:white; font-size: large;">
                --------------------------------------Timestamp-----------------------------------</p>
            <p style="color:white; font-size: large;">------In or out?------</p>
        </div>
        <div class="logs-container">
            <div class="log" v-for="log in logs">
                <p style="color:white; font-size: large;">{{ log.battery.slice(0, 2) }}.{{ log.battery.slice(2, 4) }}
                </p>
                <p style="color:white; font-size: large;">{{ log.soc }}%</p>
                <p style="color:white; font-size: large;">0.{{ log.rint }}&#937;</p>
                <p style="color:white; font-size: large;">{{ log.time }}</p>
                <p style="color:white; font-size: large;">{{ log.out == true ? "Logged Out" : "Logged In" }}</p>

            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Ref } from 'vue';
import { Log } from '../render';
let logs: Ref<Log[]> = ref([]);
const data = await getAllLogs();
if (typeof data != "undefined" && typeof data != null && typeof data != "boolean") {
    logs.value = data;
} else {
    console.log("there was an error", data);
}
console.log(logs.value)
</script>
<style lang="scss">
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-top: 5px solid var(--secondaryColor);
    gap: 0;
}

.logs-container {
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 80%;
    overflow-y: scroll;
    gap: 1em;

    .log {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        gap: 2em;
        width: 100%;
    }

    &::-webkit-scrollbar {
        width: 0.8em;
    }

    &::-webkit-scrollbar-track {
        background-color: var(--tertiaryColor);
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
    background: var(--secondaryColor);
    border-radius: 25px;
  }
}

.log-label {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap: 2em;
    width: 100%;
    height: 10%;
}

.log-header {
    color: var(--secondaryTextColor);
    font-size: 2em;
    font-weight: 600;
    margin: 1em;
    height: 10%;
}
</style>