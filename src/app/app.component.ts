import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import {io} from 'socket.io-client'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'w12lab';
  socket:any; 

  text = "";
  target = "";
  target2 = "";

  targetLanguages = ['fr', 'zh', 'hi', 'ar'];

  translated:any[] = [];




  ngOnInit(){

    this.socket=io();
    this.listen2Events();
  }

  listen2Events(){


    // this.socket.on('onFinishAuction', (data:PastAuction)=>{
    //   this.pastAuctions.push(data);
    // })

    this.socket.on('onFinishTranslate', (data:any)=> {
      this.translated.push(data)
    })

  }
  
  sendTranslate() {
    let obj = {
      text:this.text,
      target:this.target,
      target2:this.target2
    }

    console.log('IN OBJ:', obj.target)
    this.socket.emit('translate', obj)
  }


}
