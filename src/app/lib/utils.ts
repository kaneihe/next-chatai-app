import User from "@/models/User";
import bcrypt from "bcryptjs";


/**
 * 根据电子邮件地址异步获取用户信息
 *
 * 本函数通过给定的电子邮件地址，在数据库中查找对应的用户信息
 * 使用async/await语法以支持异步操作，确保数据库查询完成后再返回结果
 *
 * @param email 用户的电子邮件地址，用作查询条件
 * @returns 返回找到的用户对象；如果没有找到用户，则返回null
 */
export const fetchUserByEmail = async (email: string) => {
  // 使用电子邮件地址作为条件，异步查询数据库中对应的用户信息
  return await User.findOne({ email });
};

/**
 * 异步函数用于验证输入的密码是否与存储的密码匹配
 *
 * @param inputPassword 用户输入的密码
 * @param storedPassword 数据库中存储的密码
 * @returns 返回密码匹配的结果（布尔值）
 *
 * 该函数使用bcrypt库来比较输入的密码和存储的密码是否一致
 * bcrypt.compare方法会自动处理密码的哈希和比较过程，提高了密码验证的安全性
 */
export async function verifyPassword(
  inputPassword: string,
  storedPassword: string
) {
  return await bcrypt.compare(inputPassword, storedPassword);
}

export const formatDate = (date: Date) => {
  const localDate = new Date(date); // 自动转换为本地时区
  // 获取本地小时和分钟，并确保它们是两位数格式
  const localHours = String(localDate.getHours()).padStart(2, "0"); // 获取本地小时
  const localMinutes = String(localDate.getMinutes()).padStart(2, "0"); // 获取本地分钟

  const localTime = `${localHours}:${localMinutes}`; // 格式化为 "hh:mm"
  return localTime;
};
