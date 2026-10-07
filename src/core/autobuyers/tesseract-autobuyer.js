import { AutobuyerState } from "./autobuyer";

export class TesseractAutobuyerState extends AutobuyerState {
  get data() {
    return player.auto.tesseracts;
  }

  get name() {
    return `超立方体`;
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
