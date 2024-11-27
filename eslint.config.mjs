import antfu from '@antfu/eslint-config'
import next from '@next/eslint-plugin-next'
import tailwind from 'eslint-plugin-tailwindcss'

export default antfu(
  {
    formatters: true,
    react: true,
    typescript: true,
    plugins: {
      next,
    },
    ignores: ['./pnpm-lock.yaml'],
  },
  ...tailwind.configs['flat/recommended'],
)
