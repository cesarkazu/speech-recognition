import { Component } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { ChangeDetectorRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Http2ServerRequest } from 'http2';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private speechRecognition: SpeechRecognition,
    private plt: Platform,
    private cd: ChangeDetectorRef
  ) {}

  matches: String[];
  isRecording = false;

  isIos() {
    return this.plt.is('ios');
  }
 
  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    });
  }
 
  getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      });
  }
 
  startListening(linguagem) {
    let options = {
      language: linguagem,
      showPopup: false,
      matches: 15
    }
    this.speechRecognition.startListening(options).subscribe(matches => {
      this.matches = matches;
      for(let i=0; matches.length<i; i++){
        if(matches[i].toUpperCase().includes('exibir temperatura')){
          this.funcao_chamar_api()
          //abre o calendario
        }
      }
      this.cd.detectChanges();
    });
    this.isRecording = true;
  }

  funcao_chamar_api(){
  }
}