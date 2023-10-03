function getBinaryTextsArray(str: string) {
  const binaryTextsRegex = /(?:[01]+\s+)+[01]+/g;
  return str.match(binaryTextsRegex);
}

function getBinaryTextArray(binaryTexts: string) {
  const binaryRegex = /\b[01]+\b/g;
  return binaryTexts.match(binaryRegex);
}

function convertBinaryText(binaryText: string) {
  return String.fromCharCode(parseInt(binaryText, 2));
}

function convertBinaryTexts(binaryTexts: string) {
  let convertedTexts = "";

  const binaryTextArray = getBinaryTextArray(binaryTexts);

  binaryTextArray?.forEach((binary) => {
    convertedTexts += convertBinaryText(binary);
  });

  return convertedTexts;
}

function setSpanElementStyle(element: HTMLSpanElement) {
  element.style.color = "#FFFFFF";
  element.style.backgroundColor = "#F75D59";
  element.style.fontWeight = "bold";
}

function updateElements(elements: NodeListOf<HTMLElement>) {
  elements.forEach((element) => {
    const elementText = element.textContent;

    if (elementText) {
      const binaryTextsArray = getBinaryTextsArray(elementText);

      if (binaryTextsArray) {
        let updatedElementText = elementText;

        const spanClassName = "converted-text";

        binaryTextsArray?.forEach((binaryTexts) => {
          const convertedText = convertBinaryTexts(binaryTexts);

          const convertedTextHTML = `<span class="${spanClassName}">${convertedText}</span>`;

          updatedElementText = updatedElementText?.replace(
            binaryTexts,
            convertedTextHTML
          );

          console.log(
            `[reddit-binary-parser]: ${binaryTexts} => ${convertedText}`
          );
        });

        element.innerHTML = updatedElementText;

        const spanELements: NodeListOf<HTMLSpanElement> =
          element.querySelectorAll(`span.${spanClassName}`);

        spanELements.forEach((spanElement) => {
          setSpanElementStyle(spanElement);
        });
      }
    }
  });
}

const observer = new MutationObserver((mutationsList, _observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "attributes" || mutation.type === "characterData") {
      const targetElements = document.querySelectorAll("p");
      updateElements(targetElements);
    }
  }
});

// The new elements will be updated when they are loaded.
observer.observe(document.body, {
  attributes: true,
  characterData: true,
  subtree: true,
});
