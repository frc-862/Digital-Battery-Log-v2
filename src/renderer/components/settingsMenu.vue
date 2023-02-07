<template>
    <div class="settingsContainer">
        <div class="settingsIsland">
            <div class="setting">
                <div class="label">
                    <p>Colors</p>
                </div>
                <div class="interactable">
                    <p>do something</p>
                </div>
            </div>
            <div class="setting">
                <div class="label">
                    <p>Api</p>
                </div>
                <div class="interactable">
                    <p>do something</p>
                </div>
            </div>
            <div class="setting">
                <div class="label">
                    <p>Setting 1</p>
                </div>
                <div class="interactable">
                    <p>do something</p>
                </div>
            </div>
            <div class="setting">
                <div class="label">
                    <p>Setting 1</p>
                </div>
                <div class="interactable">
                    <p>do something</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.settingsContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.settingsIsland {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 100%;
    border: 5px solid green;
    gap: 5%;
}

.setting {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    height: 10%;
    border: 5px solid orange;
    
    
    gap: 2%;

    .label {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 50%;
        height: 100%;
        border: 5px solid blue;

        p {
            font-size: 2rem;
            color: $Secondarytextcolor;
        }
    }

    .interactable {
        background-color: $Secondarycolor;
        border-radius: 25px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 50%;
        height: 100%;
        border: 5px solid yellow;

        p {
            font-size: 2rem;
            color: $Textcolor;
        }
    }

}
</style>