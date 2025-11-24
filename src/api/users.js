export const fetchUsers = async () => {
  try {
    const res = await fetch("https://hr2.sibers.com/test/frontend/users.json");
    return await res.json();
  } catch {
    return [];
  }
};
