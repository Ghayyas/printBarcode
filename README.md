# printBarcode

1) Add JSbarcode Link to you index.html

    `<script src="https://cdn.jsdelivr.net/npm/  jsbarcode@3.8.0/dist/barcodes/JsBarcode.code128.min.js"></script>  
    `

2) call the JsBarcode function in typescript

        `JsBarcode("#barcode", "193 1889");`

3) Add canvas to your HTML file with id  `barcode`

    ` <canvas id="barcode"></canvas>`
4) Convert the Canvas into Base64

    `const canvas:any = document.getElementById('barcode';
      const dataURL =canvas.toDataURL();`

5) Call DateCSPrinter PrintImage() function

        let options:printImageOptions={
         dataURL: dataURL, //base64
         width: canvas.width,
         height: canvas.height,
         num:1
       }
        window.DatecsPrinter.printImage((options)=>{
        alert('Printing works!');
        let jsonString = JSON.stringify(options);
        console.log('options',options);
        alert('JSON Data '+ jsonString);
       },err=>{
        console.log('error occured',err);
        alert('something went wrong!');
       })

6) And Thats it..!!