<template>
  <div v-if="current">
    <div>{{ current.label }}</div>
    <el-form
      label-width="120px"
      :model="styles"
    >
      <el-form-item
        v-for="formItem in form"
        :key="formItem.key"
        :label="formItem.label"
      >
        <component
          v-model="styles[formItem.key]"
          :is="formItem.component"
        />
      </el-form-item>
      <el-button @click="$emit('change', current.id, styles)">保存</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: Object,
      default () {
        return null;
      },
    },
    form: {
      type: Array,
      default () {
        return [];
      },
    },
  },
  watch: {
    current (newVal) {
      if (newVal) {
        this.styles = newVal.styles;
      }
    },
  },
  data() {
    return {
      styles: {},
    };
  },
}
</script>

<style lang="less" scoped>

</style>