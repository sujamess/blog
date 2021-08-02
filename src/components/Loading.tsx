const Loading = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <video
          src="https://media.giphy.com/media/3jmfMCLZkU5SyNXDf6/giphy.mp4"
          className="w-full h-auto"
          autoPlay
          loop
          muted
        />
        <div className="pt-4 pb-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl pt-2">กำลังโหลด</h1>
          <div className="pt-6 prose prose-green max-w-3xl mx-auto">
            กำลังดึงข้อมูล...กรุณารอสักครู่
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading;
