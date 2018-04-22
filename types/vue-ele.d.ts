/**
 * 扩展 element ui tools
 */
import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    dispatch?: any;
  }
}
