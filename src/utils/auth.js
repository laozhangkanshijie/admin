import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
import { getItem, setItem } from '@/utils/storage'

export function getTimeStamp() {
  return getItem(TIME_STAMP)
}

export function setTimeStamp() {
  setItem(TIME_STAMP, Date.now())
}

/*
 * 检测是否登录超时
 * */
export function isCheckTimeout() {
  const currentTime = Date.now()
  const timeStamp = getTimeStamp()
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
