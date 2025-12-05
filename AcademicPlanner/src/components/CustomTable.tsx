
function CustomTable() {
  const data = [
    { id: 1, name: "John", age: 21, major: "Computer Science", type: "meow" },
    { id: 2, name: "Sarah", age: 22, major: "Biology", type: "meow" },
    { id: 3, name: "Mike", age: 20, major: "Economics", type: "meow" },
  ];

  return (
    <div className="p-4">
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-700">ID</th>
              <th className="px-4 py-3 font-medium text-gray-700">Name</th>
              <th className="px-4 py-3 font-medium text-gray-700">Age</th>
              <th className="px-4 py-3 font-medium text-gray-700">Major</th>
              <th className="px-4 py-3 font-medium text-gray-700">Alert Type</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2">{row.id}</td>
                <td className="px-4 py-2">{row.name}</td>
                <td className="px-4 py-2">{row.age}</td>
                <td className="px-4 py-2">{row.major}</td>
                <td className="px-4 py-2">{row.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomTable