export function createQueryFromObject(
  tableName: string,
  keys: Array<string>,
  values: Array<String | number | undefined>
): string {
  if (keys.length != values.length) {
    throw new Error(
      "SERVER API: keys and values arrays have to be equal size!"
    );
  }

  const query_start = `INSERT INTO ${tableName} (`;
  const query_mid2 = ") VALUES(";
  const query_mid4 = ") ON CONFLICT(id) DO UPDATE SET ";

  let query_mid1 = "";
  let query_mid3 = "";
  let query_end = "";

  for (let i = 0; i < keys.length; i++) {
    if (values[i] != undefined) {
      query_mid1 += `${keys[i]}, `;
      if (typeof values[i] == "string") {
        query_mid3 += `'${values[i]}', `;
        if (keys[i] != "id") {
          query_end += `${keys[i]} = '${values[i]}', `;
        }
      } else {
        query_mid3 += `${values[i]}, `;
        if (keys[i] != "id") {
          query_end += `${keys[i]} = ${values[i]}, `;
        }
      }
    }
  }

  query_mid1 = query_mid1.substring(0, query_mid1.lastIndexOf(","));
  query_mid3 = query_mid3.substring(0, query_mid3.lastIndexOf(","));
  query_end = query_end.substring(0, query_end.lastIndexOf(","));

  const query =
    query_start + query_mid1 + query_mid2 + query_mid3 + query_mid4 + query_end;

  return query;
}
