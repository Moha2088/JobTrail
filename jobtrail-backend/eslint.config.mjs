import { defineConfig, globalIgnores } from "eslint/config"
import tseslint from "typescript-eslint"

export default defineConfig([
    ...tseslint.configs.recommended,
    globalIgnores([
        "node_modules/**",
        "dist/**",
    ]),
    {
        rules: {
            "indent": ["error", 4, { "SwitchCase": 1 }],
            "semi": ["error", "never"],
            "object-curly-spacing": ["error", "always"],
            "@typescript-eslint/no-empty-object-type": "off",
        },
    },
])
