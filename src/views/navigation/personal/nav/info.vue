<template>
  <a-modal v-model:visible="visible" :title="isEdit ? '编辑分类' : '添加分类'" @ok="handleConfirm">
    <a-form :model="form">
      <a-form-item field="name" label="导航名称">
        <a-input v-model="form.name" allow-clear />
      </a-form-item>
      <a-form-item field="url" label="导航地址">
        <a-input v-model="form.url" allow-clear />
      </a-form-item>
      <a-form-item field="description" label="导航描述">
        <a-textarea  v-model="form.description" :auto-size="{ minRows: 2, maxRows: 5 }" allow-clear />
      </a-form-item>
      <a-form-item field="ladder" label="是否被墙">
        <a-radio-group v-model="form.ladder">
          <a-radio :value="1">是</a-radio>
          <a-radio :value="0">否</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item field="cat_id" label="导航类别">
        <a-cascader v-model="form.cat_id" :options="categoryList" :style="{ width: '320px' }" placeholder="请选择二级分类" allow-clear />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import type { PropType, Ref } from 'vue'
import type { INavListItem, INodeDataItem } from '../type'

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
    required: false
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

const form: Ref<INavListItem> = ref({})

const categoryList: Ref<INodeDataItem[]> = ref([])

onMounted(() => {
  if (props.isEdit) form.value = props.nav!
})

const handleConfirm = () => { }
</script>

<style lang="less" scoped></style>
