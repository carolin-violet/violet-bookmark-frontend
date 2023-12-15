<template>
  <a-modal v-model:visible="visible" title="Modal Form">
    <a-form :model="form">
      <a-form-item field="name" label="Name">
        <!-- <a-input v-model="form.name" /> -->
      </a-form-item>
      <a-form-item field="post" label="Post">
        <!-- <a-select v-model="form.post">
          <a-option value="post1">Post1</a-option>
          <a-option value="post2">Post2</a-option>
          <a-option value="post3">Post3</a-option>
          <a-option value="post4">Post4</a-option>
        </a-select> -->
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import type { PropType } from 'vue'
import type { INavListItem } from './type'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  isEdit: {
    type: Boolean,
    required: true
  },
  nav: {
    type: Object as PropType<INavListItem>,
    required: true
  }
})

const emit = defineEmits(['update:visible'])

const visible = computed({
  get() {
    return props.visible
  },
  set(val) {
    emit('update:visible', val)
  }
})

const form = ref({

})

</script>

<style lang="less" scoped></style>
