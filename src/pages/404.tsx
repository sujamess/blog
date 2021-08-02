import { NextPage } from 'next'
import SEO from '../components/SEO'

const Page: NextPage = () => {
  return (
    <>
      <SEO />
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <video
            src="https://media.giphy.com/media/nR4L10XlJcSeQ/giphy.mp4"
            className="w-full h-auto"
            autoPlay
            loop
            muted
          />
          <div className="pt-4 pb-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl pt-2">ไม่มีบล็อกนี้อยู่น้า 🥺</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page