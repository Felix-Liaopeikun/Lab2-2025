// 如果找不到 tailwindcss 类型声明，可暂时用 any 或自定义接口
// import type { Config } from 'tailwindcss'
interface Config {
  content: string[];
  theme: {
    extend?: Record<string, any>;
  };
  plugins: any[];
}

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Avenir', 'Helvetica', 'Arial', 'sans-serif']
      },
      boxShadow: {
        sp: '0 3px 12px 0 rgba(0, 0, 0, 0.2)'
      },
      scale: {
        '101': '1.01'
      },
      // this is animation class
      animation: {
        fade: 'yellowFade 3s ease-in-out'
      },
      keyframes: {
        yellowFade: {
          '0%': { backgroundColor: 'yellow' },
          '100%': { backgroundColor: 'transparent' }
        }
      }
    }
  },
  plugins: []
} satisfies Config