<template>
  <div class="settingsContainer">
    <div class="title" v-show="page != 'picker'">Settings</div>
    <div class="settingsIsland" v-show="page == 'home'">
      <div class="setting">
        <div class="label">
          <p>Colors</p>
        </div>
        <div class="interactable" @click="page = 'colors'">
          <p>Open Color Config</p>
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
          <p>Misc</p>
        </div>
        <div class="interactable">
          <p>do something</p>
        </div>
      </div>
      <div class="setting">
        <div class="label">
          <p>Setting 4</p>
        </div>
        <div class="interactable">
          <p>do something</p>
        </div>
      </div>
    </div>
    <div class="settingsIsland color-island" v-show="page == 'colors'">
      <div class="setting">
        <div class="label">
          <p>Primary Color</p>
        </div>
        <div class="color-interactable">
          <div class="color-box c1" @click="openColorPicker(0)"></div>
        </div>
      </div>
      <div class="setting">
        <div class="label">
          <p>Secondary Color</p>
        </div>
        <div class="color-interactable">
          <div class="color-box c2" @click="openColorPicker(1)"></div>
        </div>
      </div>
      <div class="setting">
        <div class="label">
          <p>Tertiary Color</p>
        </div>
        <div class="color-interactable">
          <div class="color-box c3" @click="openColorPicker(2)"></div>
        </div>
      </div>
      <div class="setting">
        <div class="label">
          <p>Warning Color</p>
        </div>
        <div class="color-interactable">
          <div class="color-box c4" @click="openColorPicker(3)"></div>
        </div>
      </div>
      <div class="setting">
        <div class="label">
          <p>Primary Text Color</p>
        </div>
        <div class="color-interactable">
          <div class="color-box c5" @click="openColorPicker(4)"></div>
        </div>
      </div>
      <div class="setting">
        <div class="label">
          <p>Secondary Text Color</p>
        </div>
        <div class="color-interactable">
          <div class="color-box c6" @click="openColorPicker(5)"></div>
        </div>
      </div>
      <div class="footer">
        <i
          v-show="page != 'home'"
          @click="back()"
          class="fa-solid fa-left-long fa-3x"></i>
      </div>
    </div>
    <div class="color-picker" v-show="page == 'picker'">
      <p class="color-text">Color: {{ colorName }}</p>
      <div class="color-frame">
        <div class="canvas-container">
          <canvas
            width="300"
            height="300"
            id="color_canvas"
            style="position: relative"></canvas>
          <div id="marker" class="marker"></div>
        </div>
        <div class="color-config">
          <div class="sliders">
            <canvas
              width="50"
              height="300"
              id="hue_canvas"
              style="position: relative">
            </canvas>
            <div class="slider" id="slider"></div>
          </div>
          <div class="current-color-container">
            <div class="current-color" :style="{ backgroundColor: hex }"></div>
            <div class="current-color-label">{{ hex }}</div>
          </div>
          <div class="buttons">
            <div class="button" @click="submit()">Save</div>
            <div class="button" @click="revert()">Revert</div>
          </div>
        </div>
      </div>
      <div class="footer">
        <i
          v-show="page != 'home'"
          @click="back()"
          class="fa-solid fa-left-long fa-3x"></i>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useConfigStore } from "../stores/configStore";
  import { Colors } from "../render";
  let colors: Colors = useConfigStore().getColors;
  let page = ref("home");
  let color = ref(0);
  let colorName = ref("");
  let hex = ref("#000000");
  const back = () => {
    if (page.value == "colors") {
      page.value = "home";
    } else if (page.value == "picker") {
      page.value = "colors";
    }
  };
  const submit = () => {
    switch (color.value) {
      case 0:
        colors.primary = hex.value;
        break;
      case 1:
        colors.secondary = hex.value;
        break;
      case 2:
        colors.tertiary = hex.value;
        break;
      case 3:
        colors.warning = hex.value;
        break;
      case 4:
        colors.primaryText = hex.value;
        break;
      case 5:
        colors.secondaryText = hex.value;
        break;
    }
    useConfigStore().updateConfig();
    syncColors();
  };
  const revert = () => {
    switch (color.value) {
      case 0:
        hex.value = colors.primary;
        break;
      case 1:
        hex.value = colors.secondary;
        break;
      case 2:
        hex.value = colors.tertiary;
        break;
      case 3:
        hex.value = colors.warning;
        break;
      case 4:
        hex.value = colors.primaryText;
        break;
      case 5:
        hex.value = colors.secondaryText;
        break;
    }
  };

  const openColorPicker = (colorBox: number) => {
    page.value = "picker";
    color.value = colorBox;
    switch (colorBox) {
      case 0:
        colorName.value = "primaryColor";
        hex.value = colors.primary;
        break;
      case 1:
        colorName.value = "secondaryColor";
        hex.value = colors.secondary;
        break;
      case 2:
        colorName.value = "tertiaryColor";
        hex.value = colors.tertiary;
        break;
      case 3:
        colorName.value = "warningColor";
        hex.value = colors.warning;
        break;
      case 4:
        colorName.value = "textColor";
        hex.value = colors.primaryText;
        break;
      case 5:
        colorName.value = "secondaryTextColor";
        hex.value = colors.secondaryText;
        break;
    }
    let canvas = document.getElementById("color_canvas") as HTMLCanvasElement;
    let colorCtx = canvas.getContext("2d") as CanvasRenderingContext2D;
    let hueCanvas = document.getElementById("hue_canvas") as HTMLCanvasElement;
    let hueCtx = hueCanvas.getContext("2d") as CanvasRenderingContext2D;
    let marker = document.getElementById("marker") as HTMLDivElement;
    let slider = document.getElementById("slider") as HTMLDivElement;

    let gradient = hueCtx.createLinearGradient(0, 0, 0, hueCanvas.height);

    gradient.addColorStop(0, "rgb(255, 0, 0)");
    gradient.addColorStop(1 / 6, "rgb(255, 255, 0)");
    gradient.addColorStop(1 / 3, "rgb(0, 255, 0)");
    gradient.addColorStop(1 / 2, "rgb(0, 255, 255)");
    gradient.addColorStop(2 / 3, "rgb(0, 0, 255)");
    gradient.addColorStop(5 / 6, "rgb(255, 0, 255)");
    gradient.addColorStop(1, "rgb(255, 0, 0)");
    hueCtx.fillStyle = gradient;
    hueCtx.fillRect(0, 0, hueCanvas.width, hueCanvas.height);

    //get the current color of hue canvas at the y value of slider
    let pixel3 = hueCtx.getImageData(10, 0, 1, 1)["data"];
    let Tcolor = rgbToHex(pixel3[0], pixel3[1], pixel3[2]);
    let gradientH = colorCtx.createLinearGradient(0, 0, canvas.width, 0);
    gradientH.addColorStop(0, "#fff");
    gradientH.addColorStop(1, Tcolor);
    colorCtx.fillStyle = gradientH;
    colorCtx.fillRect(0, 0, canvas.width, canvas.height);

    let gradientV = colorCtx.createLinearGradient(0, 0, 0, 300);
    gradientV.addColorStop(0, "rgba(0,0,0,0)");
    gradientV.addColorStop(1, "#000");
    colorCtx.fillStyle = gradientV;
    colorCtx.fillRect(0, 0, canvas.width, canvas.height);

    canvas.addEventListener("click", function (event) {
      let x = event.offsetX; // Get X coordinate
      let y = event.offsetY; // Get Y coordinatex
      let pixel = colorCtx.getImageData(x, y, 1, 1)["data"]; // Read pixel Color

      marker.style.left = x.toString() + "px";
      marker.style.top = y.toString() + "px";
      //let val = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
      hex.value = rgbToHex(pixel[0], pixel[1], pixel[2]); // Set this color to body of the document
    });

    hueCanvas.addEventListener("click", function (event) {
      let x = event.offsetX; // Get X coordinate
      let y = event.offsetY; // Get Y coordinatex
      let pixel = hueCtx.getImageData(x, y, 1, 1)["data"]; // Read pixel Color
      //let val = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
      Tcolor = rgbToHex(pixel[0], pixel[1], pixel[2]); // Set this color to body of the document
      let gradientH = colorCtx.createLinearGradient(0, 0, canvas.width, 0);
      gradientH.addColorStop(0, "#fff");
      gradientH.addColorStop(1, Tcolor);
      colorCtx.fillStyle = gradientH;
      colorCtx.fillRect(0, 0, canvas.width, canvas.height);
      let gradientV = colorCtx.createLinearGradient(0, 0, 0, 300);
      gradientV.addColorStop(0, "rgba(0,0,0,0)");
      gradientV.addColorStop(1, "#000");
      colorCtx.fillStyle = gradientV;
      colorCtx.fillRect(0, 0, canvas.width, canvas.height);
      slider.style.top = `${y.toString()}px`;
      let markerX = parseInt(marker.style.left);
      let markerY = parseInt(marker.style.top);
      let pixel2 = colorCtx.getImageData(markerX, markerY, 1, 1)["data"];
      hex.value = rgbToHex(pixel2[0], pixel2[1], pixel2[2]);
    });
  };
  function componentToHex(c: { toString: (arg0: number) => string }) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHex(r: number, g: number, b: number) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  const syncColors = () => {
    const store = useConfigStore();
    const colors = store.getColors;
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
</script>
<style lang="scss">
  .color-picker {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    justify-items: center;
    align-content: center;
    width: 100%;
    height: 100%;
    margin-bottom: 5%;

    .color-text {
      color: var(--secondaryTextColor);
      font-size: 2.5rem;
    }

    .color-frame {
      z-index: 1;
      border: 5px solid var(--secondaryColor);
      border-radius: 25px;
      padding: 5%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      justify-items: center;
      align-content: center;
      gap: 2%;
      width: 60%;
      height: 45%;

      .canvas-container {
        width: 300px;
        height: 300px;
        position: relative;

        .marker {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 3px;
          border: 3px solid lightgrey;
          z-index: 2;
          top: 0px;
          left: 0px;
        }
      }

      .color-config {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        justify-items: center;
        align-content: center;
        height: 100%;
        width: 50%;

        .sliders {
          position: relative;
          width: 50px;
          height: 300px;

          .slider {
            width: 60px;
            height: 10px;
            border-radius: 5px;
            background-color: lightblue;
            position: absolute;
            top: 0px;
            left: -5px;
          }
        }

        .current-color-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          justify-items: center;
          align-content: center;
          height: 100%;
          width: 50%;

          .current-color {
            height: 100px;
            width: 100px;
            border: 5px solid var(--secondaryColor);
            border-radius: 25px;
          }

          .current-color-label {
            color: var(--secondaryTextColor);
            font-size: 1.5rem;
          }
        }

        .buttons {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          justify-items: center;
          align-content: center;
          height: 100%;
          width: 50%;

          .button {
            width: 100px;
            height: 50px;
            border: 5px solid var(--secondaryColor);
            border-radius: 25px;
            background-color: var(--primaryColor);
            color: var(--secondaryTextColor);
            font-size: 1.5rem;
            margin: 5%;
            display: flex;
            justify-content: center;
            align-content: center;
          }
        }
      }
    }
  }

  .c1 {
    background-color: var(--primaryColor);
  }

  .c2 {
    background-color: var(--secondaryColor);
  }

  .c3 {
    background-color: var(--tertiaryColor);
  }

  .c4 {
    background-color: var(--warningColor);
  }

  .c5 {
    background-color: var(--textColor);
  }

  .c6 {
    background-color: var(--secondaryTextColor);
  }

  .footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 10%;
    color: white;

    & > * {
      color: var(--secondaryTextColor);
    }
  }

  .settingsContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    .title {
      font-size: 2rem;
      color: var(--secondaryTextColor);
      padding-bottom: 1%;
    }
  }

  .settingsIsland {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 100%;
    border: 5px solid var(--secondaryColor);
    border-radius: 25px;
    gap: 5%;
    margin-bottom: 5%;
  }

  .color-island {
    gap: 2%;
  }

  .setting {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    height: 10%;
    //border: 5px solid orange;
    padding: 0.5%;
    gap: 2%;

    .label {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 50%;
      height: 100%;

      p {
        font-size: 2rem;
        color: var(--secondaryTextColor);
      }
    }

    .interactable {
      background-color: var(--secondaryColor);
      border-radius: 25px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 50%;
      height: 100%;
      border: 5px solid var(--tertiaryColor);

      p {
        font-size: 2rem;
        color: var(--textColor);
      }
    }

    .color-interactable {
      border-radius: 25px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 50%;
      height: 100%;

      .color-box {
        position: relative;
        border-radius: 5px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 20%;
        height: 100%;
        border: 5px solid rgb(227, 212, 212);
      }
    }
  }
</style>
