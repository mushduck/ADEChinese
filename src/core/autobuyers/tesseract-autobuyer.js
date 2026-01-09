import { AutobuyerState } from "./autobuyer";

export class TesseractAutobuyerState extends AutobuyerState {
  get data() {
    return player.auto.tesseracts;
  }

  get name() {
    return `Tesseract`;
  }

  get isUnlocked() {
    return ExpansionPack.enslavedPack.isBought;
  }

  get hasUnlimitedBulk() {
    return ExpansionPack.enslavedPack.isBought;
  }

  tick() {
    Tesseracts.buyTesseract();
  }
}
