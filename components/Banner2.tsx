import Image from 'next/image';

interface BannerProps {
  title: string,
  description: string,
  cta: string,
  image: string,
  background: string
  backgroundIndex: number
  onEdit: () => void;
  editButton: string
}

const Banner2 = ({ title, description, cta, image, background, onEdit,editButton }: BannerProps
) => {

  return (
    <div className='relative w-full overflow-hidden opacity-100'>
      <Image
        className='relative top-10px w-[556px] h-[356px] flex items-center justify-center object-cover'
        src={background}
        width={500}
        height={500}
        alt="Picture of the author"
      />
      <div className='absolute top-[160px] left-[35px]'>
        <div className="w-[250px] h-[250px] rounded-full overflow-hidden">
          <Image
            className='absolute top-0 left-0 rounded-full '
            src={image}
            fill
            objectFit='cover'
            quality={100}
            alt="Picture of the author"
          />
        </div>
      </div>
      <div className={`${editButton} absolute top-1 right-1 cursor-pointer`} onClick={onEdit}>
        <svg xmlns="http://www.w3.org/2000/svg" fill='black' width="24" height="24" viewBox="0 0 24 24"><path d="M19.769 9.923l-12.642 12.639-7.127 1.438 1.438-7.128 12.641-12.64 5.69 5.691zm1.414-1.414l2.817-2.82-5.691-5.689-2.816 2.817 5.69 5.692z" /></svg>
      </div>
      
      <div className='absolute inset-0 top-10 left-5'>
            <div className='text-black text-3xl font-bold w-full text-center -mt-4 '>
                {title}
            </div>
        
        <div className='absolute top-20 text-lg text-black text-center w-full'>
          {description}
        </div>
        <div className='absolute top-64 border p-3 ml-80 bg-blue-400 text-white font-semibold h-12 flex justify-center items-center'>
          {cta}
        </div>
      </div>
    </div>
  );
};

export default Banner2;