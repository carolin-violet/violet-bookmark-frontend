<template>
  <div class="container">
    <Breadcrumb
      :items="[
        $t('menu.navigationManagement.personal'),
        isEdit
          ? $t('menu.navigationManagement.personal.edit')
          : $t('menu.navigationManagement.personal.add'),
      ]"
    />
    <a-card
      class="general-card"
      :title="
        isEdit
          ? $t('operation.navigationManagement.personal.edit')
          : $t('operation.navigationManagement.personal.add')
      "
    >
      <a-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        class="form"
        :label-col-props="{ span: 8 }"
        :wrapper-col-props="{ span: 16 }"
      >
        <a-form-item
          field="name"
          :label="$t('navigationManagement.form.name')"
          validate-trigger="change"
        >
          <a-input
            v-model="formData.name"
            :placeholder="$t('navigationManagement.form.name.placeholder')"
            allow-clear
          />
        </a-form-item>
        <a-form-item
          field="url"
          :label="$t('navigationManagement.form.url')"
          validate-trigger="change"
        >
          <a-input
            v-model="formData.url"
            :placeholder="$t('navigationManagement.form.url.placeholder')"
            allow-clear
          />
        </a-form-item>
        <a-form-item
          field="description"
          :label="$t('navigationManagement.form.description')"
          validate-trigger="change"
        >
          <a-textarea
            v-model="formData.description"
            :auto-size="{ minRows: 2, maxRows: 5 }"
            :placeholder="
              $t('navigationManagement.form.description.placeholder')
            "
            allow-clear
          />
        </a-form-item>
        <a-form-item
          field="ladder"
          :label="$t('navigationManagement.form.ladder')"
        >
          <a-radio-group v-model="formData.ladder">
            <a-radio :value="1">是</a-radio>
            <a-radio :value="0">否</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" :loading="loading" @click="validate">
              {{ $t('operation.navigationManagement.save') }}
            </a-button>
            <a-button type="secondary" @click="reset">
              {{ $t('operation.navigationManagement.reset') }}
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
    getNavigationById,
    updateNavigation,
    createNavigation,
  } from '@/api/navigation';
  import { useRoute, useRouter } from 'vue-router';
  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';

  import type { Navigation } from '@/api/navigation';

  const { loading, setLoading } = useLoading();
  const route = useRoute();
  const router = useRouter();

  const formRef = ref<FormInstance>();
  const formData = ref<Navigation>({
    id: 0,
    categoryId: 0,
    name: '',
    url: '',
    description: '',
    ladder: 0,
  });

  const isEdit = computed<boolean>(() => !!route.query.id);

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
      },
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
      },
    ],
    description: [
      {
        minLength: 0,
        maxLength: 100,
        message: '描述长度为0-100',
      },
    ],
    ladder: [
      {
        required: true,
        message: '请选择是否需要梯子',
      },
    ],
  };

  const handleAddWebsite = () => {
    setLoading(true);
    createNavigation({
      ...formData.value,
      categoryId: Number(route.query.categoryId),
    })
      .then(() => {
        Message.success('添加成功!');
        router.back();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditWebsite = () => {
    setLoading(true);
    updateNavigation({
      ...formData.value,
      categoryId: Number(route.query.categoryId),
    })
      .then(() => {
        Message.success('修改成功!');
        router.back();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGetUserById = () => {
    getNavigationById(Number(route.query.id)).then((res) => {
      formData.value = res.data;
    });
  };

  const validate = async () => {
    const res = await formRef.value?.validate();
    if (!res) {
      if (isEdit.value) {
        handleEditWebsite();
      } else {
        handleAddWebsite();
      }
    }
  };

  const reset = async () => {
    await formRef.value?.resetFields();
  };

  onMounted(() => {
    if (isEdit.value) {
      handleGetUserById();
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
