<template>
  <a-modal v-model:visible="visible" :title="isEdit ? '编辑分类' : '添加分类'" :on-before-ok="handleConfirm">
    <a-form ref="formRef" :model="form" :rules="rules">
      <a-form-item field="name" label="类型名称" validate-trigger="change">
        <a-input v-model="form.name" allow-clear />
      </a-form-item>
      <a-form-item field="parentId" label="父分类">
        <a-select v-model="form.parentId" placeholder="请选择父分类，若不选择则默认为一级分类">
          <a-option v-for="category in option" :key="category.id" :value="category.id">{{ category.name }}</a-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { Message } from '@arco-design/web-vue';
import { ref, computed, onMounted } from 'vue';
import { createCategory, updateCategory } from '@/api/category'
import type { Ref, PropType } from 'vue'
import { useUserStore } from '@/store';
import type { ICategoryListItem, CategoryOption } from '@/api/category'

const userStore = useUserStore()

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  isEdit: {
    type: Boolean,
    required: true
  },
  category: {
    type: Object as PropType<ICategoryListItem>,
    required: false
  },
  option: {
    type: Object as PropType<CategoryOption[]>,
    required: false
  }
})

const formRef: Ref<any> = ref(null)

const emit = defineEmits(['update:visible', 'updateCategory'])

const visible = computed({
  get() {
    return props.visible
  },
  set(val: boolean) {
    emit('update:visible', val)
  }
})

const form: Ref<ICategoryListItem> = ref({
  parentId: -1,
  name: '',
  userId: ''
})

const rules = {
  name: [
    {
      required: true,
      message: '请输入分类名称',
    },
    {
      minLength: 0,
      maxLength: 32,
      message: '分类名称长度为0-32',
    }
  ]
}

onMounted(() => {
  if (props.isEdit) form.value = { ...props.category }!
})

const handleConfirm = (done: any) => {
  formRef.value.validate(async (err: undefined | Record<string, any>): Promise<any> => {
    if (!err) {
      if (props.isEdit) {
        const { code } = await updateCategory({...form.value})
        if (code !== 0) return false
        Message.success({
          content: '修改成功!'
        })
      } else {
        const data = { ...form.value, userId: userStore.id }
        const { code } = await createCategory(data)
        if (code !== 0) return false
        Message.success({
          content: '创建成功!'
        })
      }
      emit('updateCategory')
    }

    return done();
  })
}
</script>
