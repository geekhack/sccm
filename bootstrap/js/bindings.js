
var packer = new Packer;

new base2.JSB.RuleList({
  "#form": {
    ondocumentready: function() {
      this.removeClass("disabled");
      output.value = "";
      this.ready();
    },
    
    ready: function() {
      message.write("ready");
      input.focus();
    }
  },
  "#input,#output": {
    disabled: false,
    spellcheck: false // for mozilla
  },
  "#clear-all": {
    disabled: false,
    
    onclick: function() {
      form.filetype.value = "";
      form.filename.value = "";
      input.value = "";
      output.value = "";
      uploadScript.style.display = "";
      loadScript.style.display = "";
      uploadScript.disabled = true;
      saveScript.disabled = false;
      form.ready();
    }
  },
  "#pack-script": {
    disabled: false,
    
    onclick: function() {
      try {
        output.value = "";
        if (input.value) {
          var value = packer.pack(input.value, base62.checked, shrink.checked);
          output.value = value;
          message.update();
        }
      } catch (error) {
        message.error("error packing script", error);
      } finally {
       // saveScript.disabled = !output.value;
        decodeScript.disabled = !output.value || !base62.checked;
      }
    }
  },
  "#load-script": {
    disabled: false,
    
    onclick: function() {
      uploadScript.style.display = "inline";
      uploadScript.disabled = false;
      this.style.display = "none";
    }
  },
  "#save-script": {
    onclick: function() {
      form.command.value = "save";
    }
  },
  "#decode-script": {    
    onclick: function() {
      try {
        if (output.value) {
          var start = new Date;
          eval("var value=String" + output.value.slice(4));
          var stop = new Date;
          output.value = value;
          message.update("unpacked in " + (stop - start) + " milliseconds");
        }
      } catch (error) {
        message.error("error decoding script", error);
      } finally {
        decodeScript.blur();
        decodeScript.disabled = true;
      }
    }
  },
  "#upload-script": {
    onchange: function() {
      form.encoding = "multipart/form-data";
      form.command.value = "load";
      form.submit();
    }
  },
  "#base62,#shrink": {
    disabled: false
  },
  "#message": {
    error: function(text, error) {
      this.write(text + ": " + error.message, "error");
    },
    
    update: function(message) {
      var length = input.value.length;
      if (!/\r/.test(input.value)) { // mozilla trims carriage returns
        length += match(input.value, /\n/g).length;
      }
      var calc = output.value.length + "/" + length;
      var ratio = (output.value.length / length).toFixed(3);
      this.write((message ? message + ", " : "") + format("compression ratio: %1=%2", calc, ratio));
    },
    
    write: function(text, className) {
      this.innerHTML = text;
      this.className = className || "";
    } 
  }
});
