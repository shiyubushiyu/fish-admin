<template>
	<div class="login relative flex-center wh-full bg-dark bg-cover bg-center">
		<n-card :bordered="false" size="large" class="z-4 !w-auto rounded-20px shadow-sm">
			<div class="w-250px sm:w-360px mb-[30px] text-[25px]">登录</div>
			<n-form ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
				<n-form-item path="userName">
					<n-input v-model:value="model.userName" placeholder="请输入用户名" />
				</n-form-item>
				<n-form-item path="password">
					<n-input v-model:value="model.password" type="password" show-password-on="click" placeholder="请输入密码" />
				</n-form-item>
				<n-space :vertical="true" :size="24">
					<div class="flex-y-center justify-between">
					</div>
					<n-button type="primary" size="large" :block="true" :round="true" @click="handleSubmit">
						确定
					</n-button>
				</n-space>
			</n-form>
		</n-card>
	</div>
</template>

<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui'
import { formRules } from '@/utils'
import { useAuthStore } from '@/store'

const autoStore = useAuthStore()
const { login } = autoStore
const formRef = ref<(HTMLElement & FormInst) | null>(null)
const model = reactive({
	userName: 'admin',
	password: '123456',
})
const rules: FormRules = {
	userName: formRules.required,
	password: formRules.required
}

/* 表达提交 */
function handleSubmit(e: MouseEvent) {
	if (!formRef.value) return
	e.preventDefault()

	formRef.value.validate((errors) => {
		if (!errors) {
			const { userName, password } = model
			login(userName, password)
		}
	})
}
</script>

<style scoped>
.login {
	background-image: url(@/assets/img/bg-login.png)
}
</style>
