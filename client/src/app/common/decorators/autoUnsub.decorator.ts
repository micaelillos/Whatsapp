import { Subscription } from "rxjs"

export function AutoUnsubscribe(func: Function) {
  func.prototype.ngOnDestroy = function () {
    const subs : [Subscription[]] = <[Subscription[]]> Object.values(this)
      .filter((el: any) =>
       typeof el[0]?.unsubscribe === typeof Function)
       subs[0].forEach((sub : Subscription) => {
        sub.unsubscribe()
       })
  }
}