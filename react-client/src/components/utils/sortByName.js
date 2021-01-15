const sortByName = (favorites) => {
  const sorted = favorites.sort((a, b) => {
    var nameA = a.name.toLowerCase();
    var nameB = b.name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  console.log(sorted)
  return sorted;
};

export default sortByName;
