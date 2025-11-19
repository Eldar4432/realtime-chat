export async function fetchUsers(params) {
  const response = await fetch(
    "https://hr2.sibers.com/test/frontend/users.json"
  );
  const data = await response.json();
  return data;
}
