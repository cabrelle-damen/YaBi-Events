class utility {
    constructor() {
    }

    function autoTab(field1, len, field2) {
        if (document.getElementById(field1).value.length == len) {
          document.getElementById(field2).focus();
        }
  
      }

      function resetUnLockForm() {
        document.getElementById("unLockForm").reset();
      }
  }
  