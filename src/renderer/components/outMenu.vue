<template>
  <div class="container">
    <div class="instructions" v-show="progression < 3">
      <p v-show="progression == 0">Please Enter The Battery Number</p>
      <p v-show="progression == 1">Please Enter The State of Charge</p>
      <p v-show="progression == 2">
        Please Enter The Internal Resistance (RINT)
      </p>
    </div>
    <div class="out-menu-container" v-show="submitted == false">
      <div class="info">
        <div
          class="batteryNum"
          :class="{
            highlight: progression == 0,
            warn: warn == true && progression == 0,
          }">
          <p>Battery: {{ battery.slice(0, 2) }}</p>
          <p v-show="battery.length >= 2">.</p>
          <p>{{ battery.slice(2, 4) }}</p>
        </div>
        <div class="warningMessage" v-show="progression == 0 && warn == true">
          <p>
            <i class="fa-solid fa-triangle-exclamation fa-2x"></i>
            <span>{{ warnReason }} </span>
          </p>
        </div>
        <div
          class="soc"
          :class="{
            highlight: progression == 1,
            warn: warn == true && progression == 1,
          }">
          <p>State of Charge: {{ soc }}</p>
          <p v-show="soc.length >= 1">%</p>
        </div>
        <div class="warningMessage" v-show="progression == 1 && warn == true">
          <p>
            <i class="fa-solid fa-triangle-exclamation fa-2x"></i>
            <span>{{ warnReason }} </span>
          </p>
        </div>
        <div
          class="rint"
          :class="{
            highlight: progression == 2,
            warn: warn == true && progression == 2,
          }">
          <p>Internal Resistance: 0.</p>
          <p>{{ rint }}</p>
        </div>
        <div class="warningMessage" v-show="progression == 2 && warn == true">
          <p>
            <i class="fa-solid fa-triangle-exclamation fa-2x"></i>
            <span>{{ warnReason }} </span>
          </p>
        </div>
      </div>
      <div class="keyboard" v-show="progression <= 2">
        <div class="column">
          <div class="key" @click="log(1)">
            <p>1</p>
          </div>
          <div class="key" @click="log(4)">
            <p>4</p>
          </div>
          <div class="key" @click="log(7)">
            <p>7</p>
          </div>
          <div class="key" @click="log(11)">
            <p><i class="fa-solid fa-delete-left fa-3x"></i></p>
          </div>
        </div>
        <div class="column">
          <div class="key" @click="log(2)">
            <p>2</p>
          </div>
          <div class="key" @click="log(5)">
            <p>5</p>
          </div>
          <div class="key" @click="log(8)">
            <p>8</p>
          </div>
          <div class="key" @click="log(0)">
            <p>0</p>
          </div>
        </div>
        <div class="column">
          <div class="key" @click="log(3)">
            <p>3</p>
          </div>
          <div class="key" @click="log(6)">
            <p>6</p>
          </div>
          <div class="key" @click="log(9)">
            <p>9</p>
          </div>
          <div class="key" @click="log(10)">
            <p><i class="fa-solid fa-check fa-3x"></i></p>
          </div>
        </div>
      </div>
      <div class="submit" v-show="progression == 3">
        <span>Are you sure you want to submit?</span>
        <div class="submit-buttons">
          <div class="submit-button" @click="submitButton()">
            <p><i class="fa-solid fa-check fa-5x"></i></p>
          </div>
          <div class="submit-button" @click="back()">
            <p><i class="fa-solid fa-times fa-5x"></i></p>
          </div>
        </div>
      </div>
      <div class="submit-warning" v-show="submitWarn == true">
        <i class="fa-solid fa-triangle-exclamation fa-2x"></i>
        <p class="submit-warning-message">
          Warning: Battery {{ battery.slice(0, 2) }}.{{ battery.slice(2, 4) }}
          is already signed out!
        </p>
        <p class="submit-warning-message">Are you sure you want to proceed?</p>
        <div class="submit-warning-buttons">
          <div class="submit-warning-button" @click="submit()">Submit</div>
          <nuxtLink to="/" class="submit-warning-button">Revert</nuxtLink>
        </div>
      </div>
    </div>
    <div class="submitted" v-show="submitted == true">
      <p class="signed-out-message">{{ signOutMessage }}</p>
    </div>
    <div class="footer">
      <nuxtLink to="/" v-show="progression == 0"
        ><i class="fa-solid fa-left-long fa-3x"></i
      ></nuxtLink>
      <i
        v-show="progression != 0"
        @click="back()"
        class="fa-solid fa-left-long fa-3x"></i>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from "vue";
  import type { Ref } from "vue";
  const batteryNumberLength: number = 4;
  const batteryRange = {
    year: [20, 23],
    number: [1, 8],
  };
  const socRange: number[] = [0, 130];
  const rintRange: number[] = [0, 999];
  const socLength: number[] = [1, 3];
  const rintLength: number = 3;

  let str: Ref<string> = ref("");
  let progression: Ref<number> = ref(0);
  let battery: Ref<string> = ref("");
  let soc: Ref<string> = ref("");
  let rint: Ref<string> = ref("");
  let warn: Ref<boolean> = ref(false);
  let warnReason: Ref<string> = ref("");
  let submitted: Ref<boolean> = ref(false);
  let signOutMessage: Ref<string> = ref("");
  let submitWarn: Ref<boolean> = ref(false);
  let submitWarnMessage: Ref<string> = ref("");

  async function submitButton() {
    progression.value++;
    const isOut = await isSignedOut(battery.value);
    if (isOut == true) {
      submitWarn.value = true;
      submitWarnMessage.value = `Warning: Battery ${battery.value} is already signed out! Are you sure you want to proceed?`;
      return;
    } else {
      submit();
    }
  }
  async function submit() {
    submitWarn.value = false;
    submitted.value = true;
    const success: boolean = await signOut(
      battery.value,
      soc.value,
      rint.value,
    );
    if (success) {
      signOutMessage.value = "Successfully signed Out!";
    } else {
      signOutMessage.value = "Failed to sign Out!";
    }
    setTimeout(() => {
      navigateTo("/");
    }, 3000);
  }
  function log(key: number) {
    if (key == 10) {
      if (checkRange()) {
        progression.value++;
        str.value = "";
      }
    } else if (key == 11) {
      str.value = str.value.slice(0, str.value.length - 1);
      update();
    } else {
      switch (progression.value) {
        case 0:
          if (str.value.length < batteryNumberLength) {
            str.value += key.toString();
          }
          update();
          if (warn.value == true) checkRange();
          break;
        case 1:
          if (str.value.length < socLength[1]) {
            str.value += key.toString();
          }
          update();
          if (warn.value == true) checkRange();
          break;
        case 2:
          if (str.value.length < rintLength) {
            str.value += key.toString();
          }
          update();
          if (warn.value == true) checkRange();
          break;
      }
    }
  }
  function update() {
    switch (progression.value) {
      case 0:
        battery.value = str.value;
        break;
      case 1:
        soc.value = str.value;
        break;
      case 2:
        rint.value = str.value;
        break;
    }
  }
  function back() {
    if (progression.value == 0) return;
    progression.value--;
    switch (progression.value) {
      case 0:
        str.value = battery.value;
        break;
      case 1:
        str.value = soc.value;
        break;
      case 2:
        str.value = rint.value;
        break;
    }
  }
  function checkRange() {
    switch (progression.value) {
      case 0:
        if (
          parseInt(battery.value.slice(2, 4)) < batteryRange.number[0] ||
          parseInt(battery.value.slice(2, 4)) > batteryRange.number[1]
        ) {
          warn.value = true;
          warnReason.value = "Battery number is out of range";
          break;
        }
        if (
          parseInt(battery.value.slice(0, 2)) < batteryRange.year[0] ||
          parseInt(battery.value.slice(0, 2)) > batteryRange.year[1]
        ) {
          warn.value = true;
          warnReason.value = "Battery year is out of range";
          break;
        }
        if (battery.value.length < batteryNumberLength) {
          warn.value = true;
          warnReason.value = "Battery number is too short";
          break;
        }
        warn.value = false;
        warnReason.value = "";
        return true;
      case 1:
        if (
          parseInt(soc.value) < socRange[0] ||
          parseInt(soc.value) > socRange[1]
        ) {
          warn.value = true;
          warnReason.value = "SOC is out of range";
          break;
        }
        if (
          soc.value.length < socLength[0] ||
          soc.value.length > socLength[1]
        ) {
          warn.value = true;
          warnReason.value = "SOC is too short";
          break;
        }
        warn.value = false;
        warnReason.value = "";
        return true;
      case 2:
        if (
          parseInt(rint.value) < rintRange[0] ||
          parseInt(rint.value) > rintRange[1]
        ) {
          warn.value = true;
          warnReason.value = "RINT is out of range";
          break;
        }
        if (rint.value.length < rintLength) {
          warn.value = true;
          warnReason.value = "RINT is too short";
          break;
        }
        warn.value = false;
        warnReason.value = "";
        return true;
    }
  }
  async function isSignedOut(batteryNumber: string): Promise<boolean> {
    const latestLog = await getLatest(batteryNumber);
    if (typeof latestLog != "boolean") {
      if (latestLog == null) {
        return false;
      } else {
        return latestLog.out;
      }
    } else {
      return true;
    }
  }
</script>
<style lang="scss">
  .submit-warning {
    .submit-warning-message,
    i {
      color: var(--warningColor);
      font-size: 1.5em;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    justify-items: center;
    .submit-warning-buttons {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      justify-items: center;
      gap: 20%;

      .submit-warning-button {
        text-decoration: none;
        width: 100px;
        height: 100px;
        color: var(--secondaryTextColor);
        border: var(--secondaryColor) 5px solid;
        border-radius: 1em;
        padding: 0 1em;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .submitted {
    .signed-out-message {
      color: var(--secondaryTextColor);
      font-size: 1.5em;
      padding: 2em;
    }

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    justify-items: center;
  }

  .submit-buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    justify-items: center;
    gap: 20%;

    .submit-button {
      width: 100px;
      height: 100px;
      color: var(--secondaryColor);
      border: var(--secondaryColor) 5px solid;
      border-radius: 1em;
      padding: 0 1em;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .submit {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    justify-items: center;

    span {
      color: var(--secondaryTextColor);
      font-size: 1.5em;
      padding: 2em;
    }
  }

  .instructions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 10%;
    color: var(--secondaryTextColor);
    font-size: 1.5em;
    font-weight: bold;
  }

  .warningMessage {
    color: var(--warningColor);
    font-size: 1.5em;
    font-weight: bold;
  }

  .highlight {
    border: 5px solid var(--tertiaryColor);
    border-radius: 1.5em;
    padding: 0.5em;
  }

  .warn {
    border: 5px solid var(--warningColor);
  }

  .footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 20%;
    color: white;

    & > * {
      color: var(--secondaryTextColor);
    }
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-top: 5px solid var(--secondaryColor);
  }

  .batteryNum,
  .soc,
  .rint {
    display: flex;
    flex-direction: row;

    p {
      font-size: 2rem;
      padding: 0;
      margin: 0;
      color: var(--secondaryTextColor);
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: left;
    justify-items: center;
    height: 90%;
    width: 35%;
    border: 5px solid var(--secondaryColor);
    border-radius: 2em;
    padding: 0 2%;
  }

  .out-menu-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    align-content: center;
    height: 90%;
    width: 100%;
    gap: 2%;
  }

  .keyboard {
    height: 90%;
    width: 35%;
    display: grid;
    gap: 2%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    align-content: center;
    justify-items: center;
    flex-direction: row;
  }

  .column {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2%;
  }

  .key {
    height: 100%;
    width: 100%;
    background-color: var(--secondaryColor);
    border-radius: 25px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    justify-items: center;
    align-items: center;

    &:hover {
      background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
    }

    p {
      font-size: 3rem;
      padding: 0;
      margin: 0;
      color: var(--textColor);
    }

    i {
      font-size: 2rem;
      color: var(--textColor);
    }

    .back {
      color: var(--textColor);
    }
  }
</style>
