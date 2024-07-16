import BasicButton from '@/components/Buttons/BasicButton';

export const runtime = "edge";

const NotFound: React.FC = () => {
  return (
    <div className='relative min-h-screen w-full no-scrollbars'>
  
      <div className="absolute inset-0 z-10 flex items-center justify-center pt-7">
        <div className="flex flex-col items-center justify-between py-36 min-h-screen">
          <div>
            <div className='space-y-3 justify-center flex flex-col items-center'>
              <p className='text-crred font-semibold text-lg italic'>404</p>
              <h1 className='text-crred-title lg:text-8xl md:text-3xl text-xl italic' style={{ letterSpacing: '20%', fontWeight: '400' }}>
                This page could not be found.
              </h1>
            </div>
            <div>
              <p className='text-crred text-center cormorant-garamond-regular-italic text-lg'>
                Please check the URL or return to the homepage.
              </p>
            </div>
          </div>
          <BasicButton variant="bg-back" sizex='xlarge' className='border-crred border border-solid'>
            Go to Homepage
          </BasicButton>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
