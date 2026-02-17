export function BindEditable(editable: Record<string, any>) {
  return () => {
    const target = window.event?.target as HTMLInputElement
    if (!target) { return }
    if (!target.name) {
      throw new Error('Unable to Bind property missing name attribute')
    }
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    editable[name] = value
  }
}