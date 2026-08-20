<script>
import InformationModalButton from "@/components/modals/InformationModalButton";
import ModalCloseButton from "@/components/modals/ModalCloseButton";

export default {
  name: "InformationModal",
  components: {
    ModalCloseButton,
    InformationModalButton
  },
};
</script>

<template>
  <div class="l-information-modal c-information-modal">
    <ModalCloseButton @click="emitClose" />
    <div class="l-h2p-header">
      <div class="c-h2p-title">
        关于游戏
      </div>
    </div>
    <div class="c-info-body">
      《反物质维度》是由芬兰开发者 Hevipelle 创作的放置增量游戏，最初是 2016 年的个人项目，后由大型开发测试团队共同完善。
      <br>
      <br>
      游戏采用渐进式分层玩法，包含多重声望系统。“游戏帮助”按钮提供进度攻略指南。
      <br>
      <br>
      《反物质维度：终局》的首个公开版本由Supersonic Seven于2025年发布，至今仍持续更新。
      本模组的英文原版是<a href="https://supersonic-seven.github.io/AntimatterDimensionsEndgameUpdate/">Antimatter Dimensions : Endgame Update</a>。
      这个汉化版的原版部分大部分采用了安卓版翻译，此后模组内容全部由松茸不吃柯尔鸭(qq:3151643233)汉化。作者将持续更新。
      <br>
      <br>
      特别感谢安卓版翻译者对反物质维度中文社区做出的贡献。
    </div>
    <div class="l-socials">
      <InformationModalButton
        name="GitHub 仓库"
        icon="fa-brands fa-github"
        link="https://github.com/IvarK/AntimatterDimensionsSourceCode"
      />
      <InformationModalButton
        name="模组 GitHub 仓库"
        icon="fa-brands fa-github"
        link="https://github.com/Supersonic-Seven/AntimatterDimensionsEndgameUpdate"
      />
      <InformationModalButton
        name="Reddit 社区"
        icon="fa-brands fa-reddit-alien"
        link="https://www.reddit.com/r/AntimatterDimensions/"
      />
      <InformationModalButton
        name="模组 Reddit 社区"
        icon="fa-brands fa-reddit-alien"
        link="https://www.reddit.com/r/EndgameAntimatterDims/"
      />
      <InformationModalButton
        name="Discord 服务器"
        icon="fa-brands fa-discord"
        link="https://discord.gg/ST9NaXa"
      />
      <InformationModalButton
        name="模组 Discord 服务器"
        icon="fa-brands fa-discord"
        link="https://discord.gg/yuxrGFcJXc"
      />
      <InformationModalButton
        name="Google Play 商店"
        icon="fa-brands fa-google-play"
        link="https://play.google.com/store/apps/details?id=kajfosz.antimatterdimensions"
      />
      <InformationModalButton
        name="Steam 平台"
        icon="fa-brands fa-steam"
        link="https://store.steampowered.com/app/1399720/Antimatter_Dimensions/"
      />
      <InformationModalButton
        name="开发团队"
        icon="fa-solid fa-users"
        show-modal="credits"
      />
      <InformationModalButton
        name="更新日志"
        icon="fa-solid fa-file-lines"
        show-modal="changelog"
      />
    </div>
  </div>
</template>

<style scoped>
.l-information-modal {
  display: flex;
  flex-direction: column;
  /* stylelint-disable-next-line unit-allowed-list */
  width: calc(100vw - 50vh);
  justify-content: space-around;
}

.c-information-modal {
  margin: 0.5rem;
}

.c-info-body {
  text-align: left;
  font-size: 2rem;
  margin: 1rem;
  padding: 0.5rem;
}

.t-s12 .c-info-body {
  font-size: 1.3rem;
  margin: 0;
}

.l-socials {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 7.5rem;
}

.t-s12 .l-socials {
  width: 100%;
  align-self: center;
}
</style>
