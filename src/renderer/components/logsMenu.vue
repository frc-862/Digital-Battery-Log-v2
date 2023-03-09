<template>
  <div class="container">
    <header class="log-header">logs</header>
    <div class="filter-column">
      <div class="dropdown">
        <p class="dropdown-label">Filter in/out:</p>
        <select class="dropdown-button" @change="getLogs()" v-model="inFilter">
          <option value="all">All</option>
          <option value="in">Logged In</option>
          <option value="out">Logged Out</option>
        </select>
      </div>
      <div class="dropdown">
        <p class="dropdown-label">Filter battery:</p>
        <select
          class="dropdown-button"
          @change="getLogs()"
          v-model="currentBattery">
          <option value="all">All</option>
          <option v-for="option of batteries" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
    </div>
    <div class="logs-container">
      <div class="log-column">
        <p class="log-column-label">Battery #</p>
        <div class="log-part" v-for="log in logs">
          <p class="log-text">
            {{ log.number.slice(0, 2) }}.{{ log.number.slice(2, 4) }}
          </p>
        </div>
      </div>
      <div class="log-column">
        <p class="log-column-label">SOC</p>
        <div class="log-part" v-for="log in logs">
          <p class="log-text">{{ log.soc }}%</p>
        </div>
      </div>
      <div class="log-column">
        <p class="log-column-label">RINT</p>
        <div class="log-part" v-for="log in logs">
          <p class="log-text">0.{{ log.rint }}&#937;</p>
        </div>
      </div>
      <div class="log-column">
        <p class="log-column-label">Timestamp</p>
        <div class="log-part" v-for="log in logs">
          <p class="log-text">{{ log.time }}</p>
        </div>
      </div>
      <div class="log-column">
        <p class="log-column-label">In or out?</p>
        <div class="log-part" v-for="log in logs">
          <p class="log-text">
            {{ log.out == true ? "Logged Out" : "Logged In" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { Ref } from "vue";
  import { Log } from "../render";
  let logs: Ref<Log[]> = ref([]);
  let inFilter: Ref<string> = ref("all");
  let currentBattery: Ref<string> = ref("all");
  let batteries: Ref<string[]> = ref([]);
  getLogs();
  async function getLogs() {
    console.log(inFilter.value, currentBattery.value);
    const data =
      inFilter.value != "all" || currentBattery.value != "all"
        ? await getLogsByFilter(currentBattery.value, inFilter.value)
        : await getAllLogs();
    if (
      typeof data != "undefined" &&
      typeof data != null &&
      typeof data != "boolean"
    ) {
      logs.value = data;
    } else {
      console.log("there was an error", data);
    }
    await getAllBatteries();
  }
  async function getAllBatteries() {
    for (const log of logs.value) {
      if (!batteries.value.includes(log.number)) {
        batteries.value.push(log.number);
      }
    }
  }
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
    .filter-column {
      display: flex;
      flex-direction: row;
      justify-content: right;
      align-items: center;
      width: 80%;
      height: 5%;
      .dropdown {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 20%;
        height: 100%;
        border-radius: 5px;
        .dropdown-label {
          color: var(--secondaryTextColor);
          font-size: 1em;
          margin: 1em;
        }
        .dropdown-button {
          outline: none;
          border: none;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background-color: var(--secondaryColor);
          border-radius: 5px;
          .dropdown-button-label {
            color: var(--tertiaryColor);
            font-size: 1.5em;
            font-weight: 600;
            margin: 1em;
          }
        }
      }
    }
  }

  .logs-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 80%;
    overflow-y: scroll;

    .log-column {
      display: flex;
      flex-direction: column;
      justify-items: center;
      align-items: center;
      align-content: center;
      justify-content: flex-start;
      height: auto;
      padding: 1%;
      .log-column-label {
        color: var(--secondaryTextColor);
        font-size: 1.5em;
        border-bottom: 1px solid var(--tertiaryColor);
        width: 100%;
        text-align: center;
        font-weight: 600;
      }
      .log-part {
        display: flex;
        flex-direction: row;
        justify-content: center;
        justify-items: center;
        align-items: center;
        align-items: center;
        width: 100%;
        height: 10%;
        .log-text {
          color: var(--secondaryTextColor);
          font-size: 1.5em;
        }
      }
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
    margin-top: 1em;
    height: 10%;
  }
</style>
