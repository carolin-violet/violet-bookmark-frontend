<template>
  <a-modal v-model:visible="visible" :title="isEdit ? '编辑分类' : '添加分类'" :on-before-ok="handleConfirm">
    <a-form ref="formRef" :model="form"  :rules="rules">
      <a-form-item field="name" label="导航名称" validate-trigger="change">
        <a-input v-model="form.name" allow-clear />
      </a-form-item>
      <a-form-item field="url" label="导航地址" validate-trigger="change">
        <a-input v-model="form.url" allow-clear />
      </a-form-item>
      <a-form-item field="description" label="导航描述" validate-trigger="change">
        <a-textarea  v-model="form.description" :auto-size="{ minRows: 2, maxRows: 5 }" allow-clear />
      </a-form-item>
      <a-form-item field="ladder" label="是否被墙">
        <a-radio-group v-model="form.ladder">
          <a-radio :value="1">是</a-radio>
          <a-radio :value="0">否</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { Message } from '@arco-design/web-vue';
import { ref, computed, onMounted } from 'vue';
import { createNavigation, updateNavigation } from '@/api/navigation'
import type { PropType, Ref } from 'vue'
import type { INavListItem } from '@/api/navigation'

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
  },
  categoryId: {
    type: String,
    required: true
  }
})

const rules = {
  name: [
    {
      required: true,
      message: '请输入导航名称',
    },
    {
      minLength: 0,
      maxLength: 32,
      message: '导航名称长度为0-32',
    }
  ],
  url: [
    {
      required: true,
      message: '请输入导航地址',
    },
    {
      minLength: 0,
      maxLength: 255,
      message: '导航地址长度为0-255',
    }
  ],
  description: [
    {
      minLength: 0,
      maxLength: 100,
      message: '描述长度为0-100',
    }
  ],
  ladder: [
    {
      required: true,
      message: '请选择是否需要梯子',
    },
  ],
}

const emit = defineEmits(['update:visible', 'updateNavigation'])

const visible = computed({
  get() {
    return props.visible
  },
  set(val) {
    emit('update:visible', val)
  }
})

const form: Ref<INavListItem> = ref({})
const formRef: Ref<any> = ref(null)

onMounted(() => {
  if (props.isEdit) form.value = { ...props.nav }!
})

const handleConfirm = (done: any) => {
  formRef.value.validate(async (err: undefined | Record<string, any>): Promise<any> => {
    if (!err) {
      if (props.isEdit) {
        const res = await updateNavigation(form.value as any)
        if (res.code !== 0) return false
        Message.success({
          content: '修改成功!'
        })
      } else {
        const data = { ...form.value }
        data.categoryId = props.categoryId
        const res = await createNavigation(data as any)
        if (res.code !== 0) return false
        Message.success({
          content: '创建成功!'
        })
      }
      emit('updateNavigation')
    }

    return done();
  })
}
</script>
