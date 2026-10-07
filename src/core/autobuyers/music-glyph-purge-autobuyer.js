import { AutobuyerState } from "./autobuyer";

export class MusicGlyphPurgeAutobuyerState extends AutobuyerState {
  get data() {
    return player.auto.musicGlyphPurge;
  }

  get name() {
    return `创造和献祭音乐符文`;
  }

  get isUnlocked() {
    return PerkShopUpgrade.musicGlyph.isCharged;
  }

  get hasUnlimitedBulk() {
    return PerkShopUpgrade.musicGlyph.isCharged;
  }

  tick() {
    PerkShopUpgrade.fillMusicGlyph.purchase();
    Glyphs.autoClean();
  }
}
