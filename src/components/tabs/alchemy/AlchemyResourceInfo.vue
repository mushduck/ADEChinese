<script>
import EffectDisplay from "@/components/EffectDisplay";

export default {
  name: "AlchemyResourceInfo",
  components: {
    EffectDisplay
  },
  props: {
    resource: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      amount: 0,
      cap: 0,
      capped: false,
      flow: 0,
      isReactionActive: false,
      reactionProduction: 0,
      isUnlocked: false,
      unlockRequirement: ""
    };
  },
  computed: {
    classObject() {
      return {
        "c-alchemy-resource-info": true,
        "c-alchemy-resource-info--locked": !this.isUnlocked
      };
    },
    reaction() {
      return this.resource.reaction;
    },
    isBaseResource() {
      return this.resource.isBaseResource;
    },
    reactionText() {
      if (this.resource === AlchemyResource.reality) return this.realityReactionText;
      const reagents = this.reaction.reagents
        .map(r => `${format(r.cost)}${r.resource.symbol}`)
        .join(" + ");
      return `${reagents} ➜ ${format(this.reactionProduction, 2, 2)}${this.resource.symbol}`;
    },
    realityReactionText() {
      const reagents = this.reaction.reagents
        .map(r => r.resource.symbol)
        .join(" + ");
      return `${reagents} ➜ ${this.resource.symbol}`;
    },
    effectConfig() {
      const resource = this.resource;
      return {
        effect: () => resource.effectValue,
        formatEffect: resource.config.formatEffect
      };
    },
    resourceAmount() {
      return formatHybridFloat(this.amount, 1);
    },
    resourceCap() {
      return formatHybridFloat(this.cap, 1);
    },
    formattedFlow() {
      const sign = this.flow >= 0 ? "+" : "-";
      if (Math.abs(this.flow) < 0.01) return "无";
      const resourceText = `${sign}${format(Math.abs(this.flow), 2, 2)}/秒`;
      const color = this.flow > 0 ? "9CCC65" : "CC6666";
      return `<span style="color:#${color}">${resourceText}</span>`;
    },
    isDoomed() {
      return Pelle.isDoomed && this.resource.destroyed;
    }
  },
  methods: {
    update() {
      const resource = this.resource;
      this.amount = resource.amount;
      this.cap = resource.cap;
      this.capped = resource.capped;
      this.flow = resource.flow;
      this.isUnlocked = resource.isUnlocked;
      this.unlockRequirement = resource.lockText;
      if (!this.isBaseResource) {
        this.isReactionActive = !this.isDoomed && this.reaction.isActive;
        this.reactionProduction = this.reaction.reactionProduction;
      }
    }
  }
};
</script>

<template>
  <div
    v-if="isUnlocked"
    :class="classObject"
  >
    <span class="c-alchemy-resource-info__title">
      {{ resource.symbol }} {{ resource.name }} {{ resource.symbol }}
    </span>
    <span v-if="isDoomed">
      已被佩勒毁灭
    </span>
    <span v-else>
      {{ capped ? "已达到上限" : "当前" }}: {{ resourceAmount }}/{{ resourceCap }}
      (当前增速: <span v-html="formattedFlow" />)
    </span>
    <span v-if="isBaseResource">基础资源</span>
    <span v-else>符文炼金反应: {{ isReactionActive ? "启动" : "冷却中" }}（{{ reactionText }}）</span>
    <span :class="{ 'o-pelle-disabled': isDoomed }">
      <EffectDisplay
        label="效果"
        :config="effectConfig"
      />
    </span>
  </div>
  <div
    v-else
    :class="classObject"
  >
    解锁要求: {{ unlockRequirement }}
  </div>
</template>

<style scoped>

</style>
