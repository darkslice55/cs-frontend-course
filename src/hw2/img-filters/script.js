const inputFile = document.querySelector("#imageInput");
const canvas = document.querySelector("#baseImgCanvas");
const editButton = document.createElement("button");
editButton.innerText = "greyscale";

inputFile.addEventListener("input", (e) => {
  e.preventDefault();
  const file = e.target.files[0];
  const blobURL = URL.createObjectURL(file);
  const img = new Image();
  img.src = blobURL;

  img.onload = function () {
    URL.revokeObjectURL(this.src);
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
  };

  document.body.insertAdjacentElement("beforeend", editButton);
});

editButton.addEventListener("click", (e) => {
  e.preventDefault();
  let ctx = canvas.getContext("2d");
  let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

  let pixels = imgData.data;
  for (var i = 0; i < pixels.length; i += 4) {
    let lightness = parseInt((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);
    console.log(pixels[i]);

    pixels[i] = lightness;
    pixels[i + 1] = lightness;
    pixels[i + 2] = lightness;
  }
  ctx.putImageData(imgData, 0, 0);
});
