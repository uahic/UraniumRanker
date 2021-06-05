export function createSearchableIndex(title: string) {
  const arr = title.toLocaleLowerCase().split('');
  const searchableIndex = {};
  let prevKey = '';

  for (const char of arr) {
    const key = prevKey + char;
    searchableIndex[key] = true;
    prevKey = key;
  }

  return searchableIndex;
}
