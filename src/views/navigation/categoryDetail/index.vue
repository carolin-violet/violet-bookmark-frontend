<template>
  <div class="container">
    <Breadcrumb
      :items="[
        $t('menu.categoryManagement.personal'),
        isEdit
          ? $t('menu.categoryManagement.personal.edit')
          : $t('menu.categoryManagement.personal.add'),
      ]"
    />
    <a-card
      class="general-card"
      :title="
        isEdit
          ? $t('operation.categoryManagement.personal.edit')
          : $t('operation.categoryManagement.personal.add')
      "
    >
      <a-form
        ref="formRef"
        :model="formData"
        class="form"
        :label-col-props="{ span: 8 }"
        :wrapper-col-props="{ span: 16 }"
      >
        <a-form-item
          field="name"
          :label="$t('categoryManagement.form.name')"
          validate-trigger="change"
        >
          <a-input
            v-model="formData.name"
            :placeholder="$t('categoryManagement.form.name.placeholder')"
            allow-clear
          />
        </a-form-item>
        <a-form-item
          field="parentId"
          :label="$t('categoryManagement.form.parentId')"
        >
          <a-select
            v-model="formData.parentId"
            :placeholder="$t('categoryManagement.form.parentId.placeholder')"
            @change="handleParentChange"
          >
            <a-option
              v-for="category in options"
              :key="category.id"
              :value="category.id"
              >{{ category.name }}</a-option
            >
          </a-select>
        </a-form-item>
        <a-form-item
          field="openness"
          :label="$t('categoryManagement.form.openness')"
        >
          <a-select
            v-model="formData.openness"
            :disabled="disableOpennessSelector"
            :placeholder="$t('categoryManagement.form.openness.placeholder')"
          >
            <a-option v-if="userStore.userRole === 'admin'" :value="1"
              >公开</a-option
            >
            <a-option :value="0">私有</a-option>
          </a-select>
        </a-form-item>
        <a-form-item
          field="icon"
          :label="$t('categoryManagement.form.icon')"
          validate-trigger="change"
        >
          <a-input
            v-model="formData.icon"
            :placeholder="$t('categoryManagement.form.icon.placeholder')"
            allow-clear
          />
        </a-form-item>

        <a-form-item>
          <a-space>
            <a-button type="primary" :loading="loading" @click="validate">
              {{ $t('operation.categoryManagement.save') }}
            </a-button>
            <a-button type="secondary" @click="reset">
              {{ $t('operation.categoryManagement.reset') }}
            </a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import {
    getCategoryList,
    updateCategory,
    createCategory,
    getCategoryById,
  } from '@/api/category';
  import { useRoute, useRouter } from 'vue-router';
  import useLoading from '@/hooks/loading';
  import useUserStore from '@/store/modules/user';
  import { Message } from '@arco-design/web-vue';

  import type { Category } from '@/api/category';

  const userStore = useUserStore();
  const { loading, setLoading } = useLoading();
  const route = useRoute();
  const router = useRouter();

  const formRef = ref<FormInstance>();
  const formData = ref<Partial<Category>>({
    id: undefined,
    userId: undefined,
    name: '',
    parentId: -1,
    create_time: '',
    openness: 0,
    icon: '',
  });

  const options = ref<any[]>([]);
  const disableOpennessSelector = ref<boolean>(false);

  const isEdit = computed<boolean>(() => !!route.query.id);

  const handleAddCategory = () => {
    setLoading(true);
    const data = {
      ...formData.value,
      userId: Number(userStore.userInfo.id),
    };
    createCategory(data)
      .then(() => {
        Message.success('添加成功!');
        router.back();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditCategory = () => {
    setLoading(true);
    const data = {
      ...formData.value,
      userId: Number(userStore.userInfo.id),
    };
    updateCategory(data)
      .then(() => {
        Message.success('修改成功!');
        router.back();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getTopCategories = () => {
    const params =
      userStore.userRole === 'admin'
        ? { parentId: -1, pageSize: 1000 }
        : {
            openness: 0,
            parentId: -1,
            pageSize: 1000,
          };
    getCategoryList(params).then((res) => {
      options.value = [...res.data.records, { id: -1, name: '无父级' }];
    });
  };

  const getCategoryDetail = () => {
    getCategoryById(Number(route.query.id)).then((res) => {
      formData.value = res.data;
    });
  };

  const validate = async () => {
    const res = await formRef.value?.validate();
    if (!res) {
      if (isEdit.value) {
        handleEditCategory();
      } else {
        handleAddCategory();
      }
    }
  };
  const reset = async () => {
    await formRef.value?.resetFields();
  };

  const handleParentChange = () => {
    // 顶级分类
    if (formData.value.parentId === -1) {
      disableOpennessSelector.value = false;
    } else {
      // 二级分类
      disableOpennessSelector.value = true;
      const parentCategory = options.value.find(
        (topCategory) => topCategory.id === formData.value.parentId
      );
      formData.value.openness = parentCategory.openness;
    }
    //
  };

  onMounted(() => {
    getTopCategories();
    if (isEdit.value) {
      getCategoryDetail();
    }
  });
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
  .form {
    width: 540px;
    margin: 0 auto;
  }
</style>
