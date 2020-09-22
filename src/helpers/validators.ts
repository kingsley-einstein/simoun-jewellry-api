export class Validators {
 static keysPresent(body: any, keys: Array<string>): boolean {
  for (const key of keys)
   if (!Object.keys(body).includes(key) || !body[key] || (body[key].toString().trim()).length === 0)
    return false;
  
  return true;
 }

 static errorMessages(body: any, keys: Array<string>): Array<string> {
  let messages: Array<string> = [];
  for (const key of keys)
   if (!Object.keys(body).includes(key) || !body[key])
    messages = [...messages, key + " is required"]

  return messages;
 }
}
