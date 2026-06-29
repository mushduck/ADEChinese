import { AutobuyerState } from "./autobuyer";

export class TesseractAutobuyerState extends AutobuyerState {
  get data() {
    return player.auto.tesseracts;
  }

  get name() {
    return `Tesseract`;
  }

  get isUnlocked() {
    return ExpansionPack.enslavedPack.isBought && !player.disablePostReality;
  }

  get hasUnlimitedBulk() {
    return ExpansionPack.enslavedPack.isBought && !player.disablePostReality;
  }

  tick() {
    Tesseracts.buyMaxTesseract();
  }
}
