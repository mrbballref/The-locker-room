export class QualityController {
  private quality = 'auto';
  private supported = ['240p','360p','480p','720p60','1080p60','1440p60','auto'];

  setQuality(value:string){
    if(this.supported.includes(value)) this.quality = value;
  }

  getQuality(){
    return this.quality;
  }

  getSupported(){
    return this.supported;
  }
}
