


export function GetRandomSet(list: Array<any>, count: number) {
  const randomSorted = list.toSorted(() => Math.random() - .5)
  return randomSorted.slice(0, count)
}