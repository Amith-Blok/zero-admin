export const transform = (ret: any) => {
  ret.id = ret._id.toString()
  delete ret._id
  delete ret.__v
  return ret
}
