const Skeleton = () => {
  return (
    <div className="w-[250px] bg-white rounded-xl shadow p-4 animate-pulse flex flex-col">
      <div className="h-48 bg-gray-300 rounded-t-xl mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-4 flex-1"></div>
      <div className="h-10 bg-gray-300 rounded"></div>
    </div>
  );
}

export default Skeleton;
