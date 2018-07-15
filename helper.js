export const isValidtwitterUrl = url => /(^|[^'"])(https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+))/.test(url)

export const extractingTweetIdFromURL = url => {
  if (!isValidtwitterUrl(url)) {
    throw new Error('not valid')
  }
  const arr = url.split('/');
  return arr[arr.length - 1]
};
