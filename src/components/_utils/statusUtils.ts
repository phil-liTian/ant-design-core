const InputStatuses = ['error', 'warning', ''] as const
export type InputStatus = (typeof InputStatuses)[number]
