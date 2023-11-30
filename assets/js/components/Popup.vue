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
      <option value="db">Database</option>
    </select>
    <br />
    <div v-if="format === 'db'">
      <div>
        <h3>Date</h3>
        <p>(Input the start and end date)</p>
      </div>
      <VueDatePicker
        v-model="startDate"
        placeholder="Start Typing ..."
        text-input
      />
      <br />
      <VueDatePicker
        v-model="endDate"
        placeholder="Start Typing ..."
        text-input
      />
    </div>
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
import { ref } from "vue";
export default {
  data() {
    return {
      currentUrl: "",
      dataset: 1,
      inputList: [{ value: "", disabled: false }],
      format: "json",
      filename: "",
      startDate: ref(),
      endDate: ref(),
    };
  },
  created() {
    chrome.runtime.sendMessage({ action: "getTabUrl" }, (response) => {
      this.currentUrl = response.tabUrl;
    });

    chrome.storage.local.get(
      ["dataset", "inputList", "format", "filename", "startDate", "endDate"],
      (data) => {
        if (data.dataset) this.dataset = data.dataset;
        if (data.inputList) this.inputList = data.inputList;
        if (data.format) this.format = data.format;
        if (data.filename) this.filename = data.filename;
        if (data.startDate)
          this.format == "db" ? (this.startDate = data.startDate) : null;
        if (data.endDate)
          this.format == "db" ? (this.endDate = data.endDate) : null;
      }
    );
  },
  watch: {
    dataset: {
      handler(newVal) {
        this.saveToLocalStorage();
      },
    },
    inputList: {
      handler(newVal) {
        this.saveToLocalStorage();
      },
      deep: true,
    },
    format: {
      handler(newVal) {
        this.saveToLocalStorage();
      },
    },
    filename: {
      handler(newVal) {
        this.saveToLocalStorage();
      },
    },
    startDate: {
      handler(newVal) {
        this.saveToLocalStorage();
      },
    },
    endDate: {
      handler(newVal) {
        this.saveToLocalStorage();
      },
    },
  },
  methods: {
    addInput() {
      this.inputList.push({ value: "", disabled: false });
    },
    clearInputs() {
      this.inputList = [{ value: "", disabled: false }];
      this.dataset = 1;
      this.filename = "";

      // chrome.storage.local.remove([
      //   "dataset",
      //   "inputList",
      //   "format",
      //   "filename",
      // ]);
      chrome.runtime.sendMessage({ action: "clearData" });
    },
    downloadData() {
      const data = {
        url: this.currentUrl,
        dataset: this.dataset,
        data: this.inputList.map((input) => ({ selector: input.value })),
        format: this.format,
        filename: this.filename,
        startDate: this.format == "db" ? this.startDate : null,
        endDate: this.format == "db" ? this.endDate : null,
      };
      const filename = "data.json";
      const mimeType = "application/json";
      const blob = new Blob([JSON.stringify(data)], { type: mimeType });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    },

    saveToLocalStorage() {
      chrome.storage.local.set({
        dataset: this.dataset,
        inputList: this.inputList,
        format: this.format,
        filename: this.filename,
        startDate: this.format == "db" ? this.startDate : null,
        endDate: this.format == "db" ? this.endDate : null,
      });
    },
  },
};
</script>
