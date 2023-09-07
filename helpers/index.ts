import moment from "moment";

export const generateRandomString = (length = 20) => {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const getRandomFileName = (fileName: string) => {
  const randomString = generateRandomString();
  const fileExtension = fileName.split(".").pop();
  return `${randomString}.${fileExtension}`;
};

export const formateDate = (date: string, format = "DD/MM/YYYY") => {
  return moment(date).format(format);
};

export const convertToInputDate = (date: string) => {
  return moment(new Date(date)).format("YYYY-MM-DD")
  //const value = new Date(date);

  //return value.toISOString().split("T")[0];
}


export const getDateTime = (date: string) => {
  let time = moment(new Date(date)).format("hh:mm")
  return time
}