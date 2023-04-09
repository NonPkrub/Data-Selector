<template>
  <form action="">
    <div style="text-align: center">
      <h1>Data Selector</h1>
    </div>
    <div>
      <p>URL:</p>
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
    <br />
    <hr />
    <div>
      <p>DATA:</p>
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
    <select name="format" id="format" class="select">
      <option value="json">JSON</option>
      <option value="csv">CSV</option>
    </select>
    <br /><br />
    <div class="button-form">
      <button class="confirm-bt" type="submit" value="Submit">Confirm</button>
      <button class="cancel-bt">Cancel</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      currentUrl: "",
      inputList: [{ value: "", disabled: false }],
    };
  },
  created() {
    chrome.runtime.sendMessage({ action: "getTabUrl" }, (response) => {
      this.currentUrl = response.tabUrl;
    });

    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === "updateInputValue") {
        const inputId = this.inputList.findIndex((input) => !input.disabled);
        if (inputId >= 0) {
          this.inputList[inputId].value = message.value;
          this.inputList[inputId].disabled = true;
        }
      }
    });
  },
  methods: {
    addInput() {
      this.inputList.push({ value: "", disabled: false });
    },
  },
};
</script>






