export interface RefObject extends Function {
  current?: any
}

function createRef() {
  const func: RefObject = (node: any) => {
    func.current = node
  }

  return func
}

export default createRef
