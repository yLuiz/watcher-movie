export function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
) {

  let userSerialized = {...user}

  keys.forEach(key => {
    delete userSerialized[key];
  })

  return userSerialized;
}