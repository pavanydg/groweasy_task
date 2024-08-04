// components/EditBanner.tsx
import React, { useRef, useState } from 'react';
import Banner from './Banner1';
import Image from 'next/image';
import html2canvas from 'html2canvas';
import Banner2 from './Banner2';
import Banner3 from './Banner3';

const imageList = ["https://images.unsplash.com/photo-1675306408031-a9aad9f23308?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1524686788093-aa1f9c0f7c4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8fA%3D%3D"]

interface EditBannerProps {
  banner: {
    title: string;
    description: string;
    cta: string;
    image: string;
    background: string;
    backgroundIndex: number
  };
  onClose: () => void;
  onUpdate: (updatedBanner:EditBannerProps['banner']) => void;
  selectedBanner: number | null
}

const EditBanner: React.FC<EditBannerProps> = ({ banner, onClose,onUpdate,selectedBanner }) => {
  const [title, setTitle] = useState(banner.title)
  const [description, setDescription] = useState(banner.description)
  const [cta, setCta] = useState(banner.cta);
  const [image, setImage] = useState(banner.image);
  const [background, setBackground] = useState(banner.background);
  const [backgroundIndex,setBackgroundIndex] = useState(banner.backgroundIndex);
  const bannerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageListState, setImageListState] = useState(imageList);

  const handleSave = () => {
    const updatedBanner = {
      title,
      description,
      cta,
      image,
      background,
      backgroundIndex
    }
    onUpdate(updatedBanner);

    const updatedBanners = JSON.parse(localStorage.getItem('banners') || '[]');
    if(selectedBanner !== null){
      updatedBanners[selectedBanner] = updatedBanner;
      localStorage.setItem('banners',JSON.stringify(updatedBanners))
    }
  }

  const handleDownload = () => {
    if (bannerRef.current) {
      html2canvas(bannerRef.current, {
        scale: 4 
      }).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png'); 
        link.download = 'banner.png'; 
        link.click();
      });
    }
  };

  const renderBanner = () => {
    switch (backgroundIndex) {
      case 1:
        return (
          <Banner
            title={title}
            description={description}
            cta={cta}
            image={image}
            background={background}
            backgroundIndex={backgroundIndex}
            onEdit={() => {}}
            editButton="hidden"
          />
        );
      case 2:
        return (
          <Banner2
            title={title}
            description={description}
            cta={cta}
            image={image}
            background={background}
            backgroundIndex={backgroundIndex}
            onEdit={() => {}}
            editButton="hidden"
          />
        );
      case 3:
        return (
          <Banner3
            title={title}
            description={description}
            cta={cta}
            image={image}
            background={background}
            backgroundIndex={backgroundIndex}
            onEdit={() => {}}
            editButton="hidden"
          />
        );
      default:
        return null;
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageListState([...imageListState, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg text-black">
      
      <div className='flex justify-between'>
        <div>Edit Banner</div>
        {/* Close Button */}
        <div className='cursor-pointer' onClick={onClose}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        </div>
      </div>
      <div className=''>
        <div ref={bannerRef} className='transform scale-y-50 scale-x-50 -my-24 -mx-12 object-fit'>
          {renderBanner()}
        </div>
      </div>
      <div>
        <div className='py-2'>Images</div>
        <div className='flex gap-3 pb-2'>
          {/* Upload section */}
          <div className='w-[65px] h-[65px] flex items-center justify-center object-cover rounded-full bg-gray-300 cursor-pointer' >
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6"
            onClick={() => {
              fileInputRef.current?.click()
            }}
            >            
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
          </div>
          {imageListState.map((url) => {
            return <div className='cursor-pointer' onClick={(e) => { setImage(url) }}>
              <ImagesList imageurl={url} />
            </div>
          })}
        </div>
      </div>
      <div className='flex flex-col'>
        <div>Title</div>
        <div className='py-2'>
          <input className='border w-full px-1 py-1.5' type="text" value={title}
            onChange={(e) => { setTitle(e.target.value) }}
            placeholder='Title'
          />
        </div>
      </div>
      <div className='flex flex-col'>
        <div>Description</div>
        <div className='py-2'>
          <input className='border w-full px-1 py-1.5' type="text" value={description}
            onChange={(e) => { setDescription(e.target.value) }}
            placeholder='Description'
          />
        </div>
      </div>
      <div className='flex flex-col'>
        <div>Button Text</div>
        <div className='py-2'>
          <input className='border w-full px-1 py-1.5' type="text" value={cta}
            onChange={(e) => { setCta(e.target.value) }}
            placeholder='Button Text'
          />
        </div>
      </div>
      <div style={{ backgroundColor: 'rgb(41 71 68/var(--tw-bg-opacity))' }} className='text-center text-white p-3 rounded-lg font-bold text-lg cursor-pointer'
      onClick={handleSave}
      >
        Done
      </div>
      <div style={{ color: 'rgb(0 112 204/var(--tw-text-opacity))' }} className='text-center cursor-pointer hover:underline mt-2' onClick={handleDownload}>
        Download
      </div>
    </div>
  );
};

interface ImagesList {
  imageurl: string
}

const ImagesList = ({ imageurl }: ImagesList) => {
  return <div>
    <Image
      className='relative top-10px w-[65px] h-[65px] flex items-center justify-center object-cover rounded-full'
      src={imageurl}
      width={500}
      height={500}
      alt="image"
    />
  </div>
}

export default EditBanner;
