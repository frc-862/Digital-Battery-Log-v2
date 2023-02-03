<template>
    <div class="out-menu-container">
        <div class="info">
            <div class="batteryNum">
                <p>Battery: {{str.slice(0,2)}}</p>
                <p v-if="str.length >= 2">.</p>
                <p>{{ str.slice(2,4)}}</p>
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
                    <p><i class="fa fa-times fa-2x"></i> </p>
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
                    <p><i class="fa fa-check fa-2x"></i></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang=ts>
import { ref } from 'vue';
import type { Ref } from 'vue';
defineProps<{
    str: Ref<string>;
}>();
let str: Ref<string> = ref("")
function log(key: number) {
    if (key < 10 && str.value.length < 4) {
        str.value += key.toString();
    }
    if (key == 11) {
        str.value = str.value.slice(0, str.value.length - 1);
    }
   
}
</script>
<style lang="scss">
.batteryNum {
    display: flex;
    flex-direction: row;
    border: 5px solid $Tertiarycolor;
    p {
        font-size: 3rem;
        padding: 0;
        margin: 0;
        color: $Secondarytextcolor
    }
}
.info {
    height: 90%;
    width: 35%;
    border: 5px solid red;
}
.out-menu-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    align-content: center;
    height: 70%;
    width: 100%;
    gap: 2%;
    border: 5px solid $Tertiarycolor;
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

    i {
        font-size: 2rem;
        color: $Textcolor;
    }
}
</style>
