<script>
import OptionsButton from "@/components/OptionsButton";
import { BgStore } from "@/utility/background-store";

export default {
  name: "BackgroundUploader",
  components: { OptionsButton },
  data() {
    return {
      hasBg: false,
      msg: "",
    };
  },
  computed: {
    label() {
      return this.msg || (this.hasBg ? "更换背景" : "选择背景");
    },
  },
  async created() {
    this.hasBg = await BgStore.has();
  },
  methods: {
    pick() {
      this.$refs.file.click();
    },
    async onPick(e) {
      const file = e.target.files[0];
      e.target.value = "";
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        this.flash("不是图片格式");
        return;
      }
      if (file.size > 8 * 1024 * 1024) {
        this.flash("图片太大了喵（限 8MB）");
        return;
      }

      try {
        await BgStore.set(file);
        this.hasBg = true;
        this.flash("已应用");
      } catch (err) {
        console.error(err);
        this.flash("保存失败");
      }
    },
    async clear() {
      await BgStore.clear();
      this.hasBg = false;
      this.flash("已清除");
    },
    flash(text) {
      this.msg = text;
      clearTimeout(this._t);
      this._t = setTimeout(() => (this.msg = ""), 1500);
    },
  },
};
</script>

<template>
  <div class="c-bg-uploader">
    <OptionsButton
      class="o-primary-btn--option"
      @click="pick"
    >
      {{ label }}
    </OptionsButton>
    <OptionsButton
      v-if="hasBg"
      class="o-primary-btn--option"
      @click="clear"
    >
      清除
    </OptionsButton>
    <input
      ref="file"
      type="file"
      accept="image/*"
      hidden
      @change="onPick"
    >
  </div>
</template>

<style scoped>
.c-bg-uploader {
  display: contents;
}
</style>