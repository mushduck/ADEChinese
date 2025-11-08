import { AutobuyerState } from "./autobuyer";

export class RealityAutobuyerState extends AutobuyerState {
  get data() {
    return player.auto.reality;
  }

  get name() { return `Reality`; }
  get isUnlocked() { return RealityUpgrade(25).isBought; }
  get canTick() { return super.canTick && !GlyphSelection.active; }

  get mode() { return this.data.mode; }
  set mode(value) { this.data.mode = value; }

  get rm() { return this.data.rm; }
  set rm(value) { this.data.rm = value; }


  get glyph() {
    const n = Number(this.data.glyph);
    return Number.isFinite(n) ? n : 0;
  }
  set glyph(value) {

    let n;
    if (value && typeof value === "object" && typeof value.toNumber === "function") {
      n = value.toNumber();
    } else {
      n = Number(value);
    }
    if (!Number.isFinite(n) || n < 0) n = 0;
    this.data.glyph = n;
  }

  get time() { return this.data.time; }
  set time(value) { this.data.time = value; }

  get shard() { return this.data.shard; }
  set shard(value) { this.data.shard = value.clamp(0, Number.MAX_VALUE).toNumber(); }

  toggleMode() {
    this.mode = [
      AUTO_REALITY_MODE.RM,
      AUTO_REALITY_MODE.GLYPH,
      AUTO_REALITY_MODE.EITHER,
      AUTO_REALITY_MODE.BOTH,
      AUTO_REALITY_MODE.TIME,
      AUTO_REALITY_MODE.RELIC_SHARD
    ].nextSibling(this.mode);
  }

  bumpAmount(mult) {
    if (this.isUnlocked) this.rm = this.rm.times(mult);
  }

  tick() {
   
    const dontCheckModes = [AUTO_GLYPH_SCORE.LOWEST_SACRIFICE, AUTO_GLYPH_SCORE.LOWEST_ALCHEMY, AUTO_GLYPH_SCORE.ALCHEMY_VALUE];
    const shouldCheckFilter = EffarigUnlock.glyphFilter.isUnlocked && !player.reality.hasCheckedFilter &&
      !dontCheckModes.includes(AutoGlyphProcessor.scoreMode);

    if (isRealityAvailable() && player.options.autoRealityForFilter && shouldCheckFilter) {
      const gainedLevel = gainedGlyphLevel();
      const checkModes = [AUTO_REALITY_MODE.GLYPH, AUTO_REALITY_MODE.EITHER, AUTO_REALITY_MODE.BOTH];

    
      const targetLevel = Math.min(this.glyph, Glyphs.levelCap);
      const levelToCheck = checkModes.includes(this.mode)
        ? { actualLevel: targetLevel, rawLevel: 1 }
        : gainedLevel;

      const choices = GlyphSelection.glyphList(GlyphSelection.choiceCount, levelToCheck, { isChoosingGlyph: false });
      const bestGlyph = AutoGlyphProcessor.pick(choices);
      player.reality.hasCheckedFilter = true;
      if (!AutoGlyphProcessor.wouldKeep(bestGlyph)) {
        autoReality();
        return;
      }
    }

    // --- Main triggers ---
    let proc = false;
    const ampFactor = simulatedRealityCount(false) + 1;

    const rmProc = MachineHandler.gainedRealityMachines.times(ampFactor).gte(this.rm);

    const glyphTarget = Math.min(this.glyph, Glyphs.levelCap);
    const glyphProc = gainedGlyphLevel().actualLevel >= glyphTarget;

    switch (this.mode) {
      case AUTO_REALITY_MODE.RM:          proc = rmProc; break;
      case AUTO_REALITY_MODE.GLYPH:       proc = glyphProc; break;
      case AUTO_REALITY_MODE.EITHER:      proc = rmProc || glyphProc; break;
      case AUTO_REALITY_MODE.BOTH:        proc = rmProc && glyphProc; break;
      case AUTO_REALITY_MODE.TIME:        proc = player.records.thisReality.realTime / 1000 > this.time; break;
      case AUTO_REALITY_MODE.RELIC_SHARD: proc = Effarig.shardsGained * ampFactor > this.shard; break;
    }

    if (proc) autoReality();
  }
}

