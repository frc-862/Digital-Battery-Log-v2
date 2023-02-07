<template>
    <div class="container">
        <div class="instructions">akj</div>
        <div class="out-menu-container">
            <div class="info">
                <div class="batteryNum" :class="{highlight: progression == 0}">
                    <p>Battery: {{ battery.slice(0, 2) }}</p>
                    <p v-if="battery.length >= 2">.</p>
                    <p>{{ battery.slice(2, 4) }}</p>
                </div>
                <div class="soc" :class="{highlight: progression == 1}">
                    <p>State of Charge: {{ soc }}</p>
                    <p v-if="soc.length >= 1">%</p>
                </div>
                <div class="rint" :class="{highlight: progression == 2}">
                    <p>Internal Resistance:</p>
                    <p v-if="rint.length >= 1">0.</p>
                    <p>{{ rint }}</p>
                </div>
            </div>
            <div class="keyboard">
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
        </div>
        <div class="footer">
            <nuxtLink to="/" v-show="progression == 0"><i class="fa-solid fa-left-long fa-3x"></i></nuxtLink>
            <i v-show="progression != 0" @click="back()" class="fa-solid fa-left-long fa-3x"></i>
        </div>
    </div>
</template>
<script setup lang=ts>
import { ref } from 'vue';
import type { Ref } from 'vue';
defineProps<{
    str: Ref<string>;
    battery: Ref<string>;
    soc: Ref<string>;
    rint: Ref<string>;
    progression: Ref<number>;
}>();

let str: Ref<string> = ref("");
let progression: Ref<number> = ref(0);
let battery: Ref<string> = ref("");
let soc: Ref<string> = ref("");
let rint: Ref<string> = ref("");

function log(key: number) {
    if (key < 10 && str.value.length < 4) {
        str.value += key.toString();
    }
    if (key == 11) {
        str.value = str.value.slice(0, str.value.length - 1);
    }
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
    if (key == 10) {
        progression.value++;
        str.value = "";
    }
}
function back() {
    if (progression.value == 0) return;
    progression.value--;
}
</script>
<style lang="scss">
.highlight {
    border: 5px solid $Tertiarycolor;
    border-radius: 1.5em;
    padding: 0.5em;
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
        color: $Secondarytextcolor;
    }
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-top: 5px solid $Secondarycolor;
}

.batteryNum, .soc, .rint {
    display: flex;
    flex-direction: row;

    p {
        font-size: 2rem;
        padding: 0;
        margin: 0;
        color: $Secondarytextcolor
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
    border: 5px solid $Secondarycolor;
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
    background-color: $Secondarycolor;
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
        color: $Textcolor;
    }

    i{
        font-size: 2rem;
        color: $Textcolor;
    }
    .back {
        color: $Textcolor;
    }
}
</style>
