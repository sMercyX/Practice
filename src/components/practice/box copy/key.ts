import type { InjectionKey, Ref } from "vue"

interface Count {
  count: Ref<number>
  addCount: () => void
}

export const key: InjectionKey<Count> = Symbol("key")
