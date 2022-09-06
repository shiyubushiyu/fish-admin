import type { FormItemRule } from 'naive-ui'

/** 表单规则 */
interface CustomFormRules {
  /* 必填 */
  required: FormItemRule[]
}

/** 表单规则 */
export const formRules: CustomFormRules = {
  required: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
}
