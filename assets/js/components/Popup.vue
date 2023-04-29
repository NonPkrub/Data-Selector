<template>
  <form action="">
    <div style="text-align: center">
      <h1>Data Selector</h1>
    </div>
    <div>
      <h3>URL:</h3>
      <p>(Go to the desired site, it will input the address automatically.)</p>
    </div>
    <div>
      <input
        type="text"
        id="url"
        name="name"
        required
        size="25"
        v-model="currentUrl"
        disabled
      />
    </div>
    <div>
      <h3>DATASET:</h3>
      <p>(Input number of dataset)</p>
    </div>
    <div>
      <input
        type="number"
        id="number"
        name="name"
        required
        size="25"
        v-model="dataset"
        min="1"
      />
    </div>
    <br />
    <hr />
    <div>
      <h3>DATA:</h3>
      <p>(Use Ctl+Shift+I, inspect elements to add chosen data attributes)</p>
    </div>
    <div style="display: flex; justify-content: center"></div>

    <div v-for="(input, index) in inputList" :key="index">
      <br />
      <input
        type="text"
        :id="'name-' + index"
        name="name"
        required
        size="25"
        :disabled="input.disabled"
        v-model="input.value"
      />
    </div>

    <div class="add">
      <button class="button" @click="addInput">
        <i class="fa-sharp fa-solid fa-plus"></i>
      </button>
      <p class="add-text">ADD</p>
    </div>
    <hr />

    <label for="format">Format</label>
    <select name="format" id="format" class="select" v-model="format">
      <option value="json">JSON</option>
      <option value="csv">CSV</option>
    </select>
    <br />
    <div>
      <h3>File Name:</h3>
      <p>(Input file name of the scraped data.)</p>
    </div>
    <div>
      <input
        type="text"
        id="url"
        name="name"
        required
        size="25"
        v-model="filename"
      />
    </div>
    <br />
    <div class="button-form">
      <button
        class="confirm-bt"
        type="submit"
        value="Submit"
        @click="downloadData"
      >
        Confirm
      </button>
      <button class="cancel-bt" @click="clearInputs">Cancel</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      currentUrl: "",
      dataset: 1,
      inputList: [{ value: "", disabled: false }],
      format: "json",
      filename: "",
    };
  },
  created() {
    chrome.runtime.sendMessage({ action: "getTabUrl" }, (response) => {
      this.currentUrl = response.tabUrl;
    });

    // chrome.runtime.onMessage.addListener((message) => {
    //   if (message.type === "updateInputValue") {
    //     const inputId = this.inputList.findIndex((input) => !input.disabled);
    //     if (inputId >= 0) {
    //       this.inputList[inputId].value = message.value;
    //       this.inputList[inputId].disabled = true;
    //     }
    //   }
    // });
  },
  methods: {
    addInput() {
      this.inputList.push({ value: "", disabled: false });
    },
    clearInputs() {
      this.inputList = [{ value: "", disabled: false }];
      this.dataset = 1;
      this.filename = "";
    },
    downloadData() {
      const data = {
        url: this.currentUrl,
        dataset: this.dataset,
        data: this.inputList.map((input) => ({ selector: input.value })),
        format: this.format,
        filename: this.filename,
      };
      const filename = "data.json";
      const mimeType = "application/json";
      const blob = new Blob([JSON.stringify(data)], { type: mimeType });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    },
  },
};
</script>






