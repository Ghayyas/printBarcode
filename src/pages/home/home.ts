import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


declare var JsBarcode:any;
declare var window:any;

export interface printImageOptions{
  dataURL:string,
  width: number,
  height: number,
  num:number
}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  //Library to show Barcode
  showBarcode(){
    JsBarcode("#barcode", "193 1889");
  }


  //Displaying Devices
  displayAvalibleDevices(){
    window.DatecsPrinter.listBluetoothDevices((devices:any)=>{
      //displaying avalible devices
      this.connectToTheDevice(devices);
    },err=>{
      console.log('error',err);
      alert('Something Went wrong device not displaying...');
    });
  }

  //connect to the devices
  connectToTheDevice(deviceAddr){
    var deviceAdd = deviceAddr[0].address;
    window.DatecsPrinter.connect((deviceAdd:any)=>{
      console.log('connection successFull');
      alert('Connection Success');
    },err=>{
      console.log('err',err);
      alert('device not connected');
    }) 
  }
  //checking the status if no barcode there
  barcodePrintStatus(){
    window.broadcaster.addEventListener("DatecsPrinter.connectionStatus", function(e) {
      if (e.isConnected) {
        //do something
        this.printBarcode()
      }
      if (!e.hasPaper) {
        //do something
        alert('Please Put Some Papers!');
      }
      if (e.lowBattery) {
        //do something
        alert('Warning, Battery is low!');
      }
      else{
        console.log('else chala');
        this.displayAvalibleDevices(); 
      }
    });
  }


  //Print Barcode
  printBarcode(){
    // console.log('print barcode chala');
    //first we need to convert our canvas to base64
    // Lets do it
    const canvas:any = document.getElementById('barcode');
    const dataURL =canvas.toDataURL();
    console.log(dataURL); //this converts the image into Base64
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
  

  }
}
