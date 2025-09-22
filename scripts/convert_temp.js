window.addEventListener("DOMContentLoaded", domLoaded);

// When the DOM has finished loading, add the event listeners.
function domLoaded() {
   const fInput = document.getElementById("F_in");
   const cInput = document.getElementById("C_in");
   const convertBtn = document.getElementById("convertButton");
   const msg = document.getElementById("message");

   // Convert button click -> perform conversion in the direction of the filled box
   convertBtn.addEventListener("click", function () {
      const fValRaw = fInput.value.trim();
      const cValRaw = cInput.value.trim();

      // Neither provided -> prompt & reset icon
      if (fValRaw === "" && cValRaw === "") {
         setMessage("Enter a temperature to convert,");
         setWeatherIcon(null, true);
         return;
      }

      // Prefer the one that has a value; if both, prefer the one currently focused
      let useF = false;
      if (fValRaw !== "" && cValRaw === "") {
         useF = true;
      } else if (fValRaw === "" && cValRaw !== "") {
         useF = false;
      } else {
         // both have something; choose based on focus if possible
         const active = document.activeElement && document.activeElement.id;
         if (active === "F_in") useF = true;
         else if (active === "C_in") useF = false;
         else useF = false; // default to C → F
      }

      clearMessage();

      if (useF) {
         const fNum = parseFloat(fValRaw);
         if (Number.isNaN(fNum)) {
            setMessage("Please enter a valid number for °F.");
            setWeatherIcon(null, true);
            return;
         }
         const c = convertFtoC(fNum);
         cInput.value = formatNumber(c);
         setWeatherIcon(fNum, false);
      } else {
         const cNum = parseFloat(cValRaw);
         if (Number.isNaN(cNum)) {
            setMessage("Please enter a valid number for °C.");
            setWeatherIcon(null, true);
            return;
         }
         const f = convertCtoF(cNum);
         fInput.value = formatNumber(f);
         setWeatherIcon(f, false);
      }
   });

   // Input handlers: when typing in one box, clear the other immediately
   cInput.addEventListener("input", function () {
      if (cInput.value !== "") {
         fInput.value = "";
      }
      clearMessage();
   });

   fInput.addEventListener("input", function () {
      if (fInput.value !== "") {
         cInput.value = "";
      }
      clearMessage();
   });

   function setMessage(text) {
      msg.textContent = text || "";
   }

   function clearMessage() { setMessage(""); }
}

function convertFtoC(F) {
   // °C = (°F - 32) * 5/9
   return (F - 32) * 5 / 9;
}

function convertCtoF(C) {
   // °F = (°C * 9/5) + 32
   return (C * 9 / 5) + 32;
}

// Helper: choose and update the weather icon based on Fahrenheit degrees
function setWeatherIcon(fahrenheitValue, bothBlank) {
   const icon = document.getElementById("weatherIcon");

   let src = "images/C-F.png"; // default
   if (bothBlank === true) {
      src = "images/C-F.png";
   } else if (typeof fahrenheitValue === "number" && !Number.isNaN(fahrenheitValue)) {
      if (fahrenheitValue >= 200 || fahrenheitValue <= -200) {
         src = "images/dead.png";
      } else if (fahrenheitValue <= 32 && fahrenheitValue > -200) {
         src = "images/cold.png";
      } else if (fahrenheitValue >= 90 && fahrenheitValue < 200) {
         src = "images/hot.png";
      } else {
         src = "images/cool.png";
      }
   }
   icon.setAttribute("src", src);
   // Update alt text for accessibility
   const altMap = {
      "images/C-F.png": "C and F",
      "images/dead.png": "thermometer dead zone",
      "images/cold.png": "cold thermometer",
      "images/hot.png": "hot thermometer",
      "images/cool.png": "cool thermometer"
   };
   icon.setAttribute("alt", altMap[src] || "thermometer");
}

// Format numbers nicely (trim trailing zeros)
function formatNumber(n) {
   // Keep up to 2 decimals, but strip trailing zeros
   const s = Number(n).toFixed(2);
   return s.replace(/\.?0+$/, "");
}
