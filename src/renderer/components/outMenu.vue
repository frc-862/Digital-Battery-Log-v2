<template>
    <div class="out-menu-container">
        <div class="keyboard">
            <div class="column">
                <div class="key" @onclick="msg('1')">
                    <p>1</p>
                </div>
                <div class="key">
                    <p>4</p>
                </div>
                <div class="key">
                    <p>7</p>
                </div>
                <div class="key">
                    <p><i class="fa fa-times fa-2x"></i> </p>
                </div>
            </div>
            <div class="column">
                <div class="key">
                    <p>2</p>
                </div>
                <div class="key">
                    <p>5</p>
                </div>
                <div class="key">
                    <p>8</p>
                </div>
                <div class="key">
                    <p>0</p>
                </div>
            </div>
            <div class="column">
                <div class="key">
                    <p>3</p>
                </div>
                <div class="key">
                    <p>6</p>
                </div>
                <div class="key">
                    <p>9</p>
                </div>
                <div class="key">
                    <p><i class="fa fa-check fa-2x"></i></p>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.out-menu-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    align-content: center;
    height: 70%;
    width: 100%;
    gap: 5%;
    border: 5px solid $Tertiarycolor;
}

.keyboard {
    height: 90%;
    width: 35%;
    border: 5px solid red;
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
    border: 5px solid green;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2%;
}

.key {
    height: 100%;
    width: 100%;
    border: 5px solid blue;
    background-color: $Secondarycolor;
    border-radius: 15%;
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
<script setup lang=ts>

function msg(msg: string) {
    window.electron.sendMessage(msg);
}
</script>